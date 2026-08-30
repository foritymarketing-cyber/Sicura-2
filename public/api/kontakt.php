<?php
declare(strict_types=1);

// Konfiguration (SMTP-Zugangsdaten) liegt ausserhalb des Web-Root, niemals im Repo.
// Vorlage: mail-config.example.php im Projekt-Root.
$configPath = getenv('MAIL_CONFIG_PATH') ?: ($_SERVER['DOCUMENT_ROOT'] . '/../mail-config.php');
if (!is_file($configPath)) {
    http_response_code(500);
    exit;
}
/** @var array $config */
$config = require $configPath;

session_start();

$rateDir = getenv('RATE_LIMIT_DIR') ?: ($_SERVER['DOCUMENT_ROOT'] . '/../kontakt-ratelimit');
if (!is_dir($rateDir)) {
    @mkdir($rateDir, 0700, true);
}

function json_out(array $data, int $code = 200): never
{
    http_response_code($code);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

$isAjax = (($_SERVER['HTTP_X_REQUESTED_WITH'] ?? '') === 'fetch');

function fail(string $code, bool $isAjax): never
{
    if ($isAjax) {
        json_out(['error' => $code], 400);
    }
    header('Location: /kontakt/?error=' . $code);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['csrf'])) {
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(24));
    }
    json_out(['token' => $_SESSION['csrf']]);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit;
}

// Honeypot: fuer Menschen unsichtbares Feld, Bots fuellen es haeufig aus.
if (!empty($_POST['website'])) {
    fail('validation', $isAjax);
}

// Zeitfalle: schneller als 3 Sekunden ausgefuellt deutet auf ein Skript hin.
$ts = (int) ($_POST['ts'] ?? 0);
if ($ts <= 0 || (microtime(true) * 1000 - $ts) < 3000) {
    fail('validation', $isAjax);
}

if (!empty($_SESSION['csrf']) && !empty($_POST['csrf'])) {
    if (!hash_equals($_SESSION['csrf'], (string) $_POST['csrf'])) {
        fail('validation', $isAjax);
    }
    unset($_SESSION['csrf']);
}

$stripHeaderChars = static fn (string $v): string => trim(preg_replace('/[\r\n]+/', ' ', $v));

$name = $stripHeaderChars((string) ($_POST['name'] ?? ''));
$email = $stripHeaderChars((string) ($_POST['email'] ?? ''));
$phone = $stripHeaderChars((string) ($_POST['phone'] ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));
$consent = !empty($_POST['consent']);

if (mb_strlen($name) < 2 || mb_strlen($name) > 120) {
    fail('validation', $isAjax);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 180) {
    fail('validation', $isAjax);
}
if (mb_strlen($phone) > 40) {
    fail('validation', $isAjax);
}
if (mb_strlen($message) < 10 || mb_strlen($message) > 4000) {
    fail('validation', $isAjax);
}
if (!$consent) {
    fail('validation', $isAjax);
}

function rate_check(string $dir, string $key, int $limit, int $windowSeconds): bool
{
    $file = $dir . '/' . preg_replace('/[^a-f0-9-]/', '', $key) . '.json';
    $now = time();
    $entries = is_file($file) ? (json_decode((string) file_get_contents($file), true) ?: []) : [];
    $entries = array_values(array_filter($entries, static fn ($t) => $t > $now - $windowSeconds));
    if (count($entries) >= $limit) {
        return false;
    }
    $entries[] = $now;
    file_put_contents($file, json_encode($entries), LOCK_EX);
    return true;
}

$ipHash = hash('sha256', $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0');
if (!rate_check($rateDir, 'ip-' . $ipHash . '-10m', 3, 600)) {
    fail('ratelimit', $isAjax);
}
if (!rate_check($rateDir, 'ip-' . $ipHash . '-day', 10, 86400)) {
    fail('ratelimit', $isAjax);
}
if (!rate_check($rateDir, 'global-day', 200, 86400)) {
    fail('ratelimit', $isAjax);
}

function smtp_expect($sock, int $code): bool
{
    do {
        $line = fgets($sock, 512);
        if ($line === false) {
            return false;
        }
    } while (strlen($line) > 3 && $line[3] === '-');
    return str_starts_with($line, (string) $code);
}

function smtp_send(array $cfg, string $replyName, string $replyEmail, string $body): bool
{
    $secure = $cfg['smtp_secure'] ?? 'ssl';
    $target = ($secure === 'ssl' ? 'ssl://' : '') . $cfg['smtp_host'] . ':' . $cfg['smtp_port'];
    $sock = @stream_socket_client($target, $errno, $errstr, 10);
    if (!$sock) {
        return false;
    }
    $send = static function (string $c) use ($sock): void {
        fwrite($sock, $c . "\r\n");
    };

    if (!smtp_expect($sock, 220)) {
        fclose($sock);
        return false;
    }
    $send('EHLO ' . $cfg['smtp_host']);
    if (!smtp_expect($sock, 250)) {
        fclose($sock);
        return false;
    }
    if ($secure === 'tls') {
        $send('STARTTLS');
        if (!smtp_expect($sock, 220) || !stream_socket_enable_crypto($sock, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            fclose($sock);
            return false;
        }
        $send('EHLO ' . $cfg['smtp_host']);
        if (!smtp_expect($sock, 250)) {
            fclose($sock);
            return false;
        }
    }
    $send('AUTH LOGIN');
    if (!smtp_expect($sock, 334)) {
        fclose($sock);
        return false;
    }
    $send(base64_encode($cfg['smtp_user']));
    if (!smtp_expect($sock, 334)) {
        fclose($sock);
        return false;
    }
    $send(base64_encode($cfg['smtp_pass']));
    if (!smtp_expect($sock, 235)) {
        fclose($sock);
        return false;
    }
    $send('MAIL FROM:<' . $cfg['from_email'] . '>');
    if (!smtp_expect($sock, 250)) {
        fclose($sock);
        return false;
    }
    $send('RCPT TO:<' . $cfg['to_email'] . '>');
    if (!smtp_expect($sock, 250)) {
        fclose($sock);
        return false;
    }
    $send('DATA');
    if (!smtp_expect($sock, 354)) {
        fclose($sock);
        return false;
    }
    $subject = '=?UTF-8?B?' . base64_encode('Neue Anfrage über die Website') . '?=';
    $headers = "From: {$cfg['from_email']}\r\n"
        . "Reply-To: {$replyName} <{$replyEmail}>\r\n"
        . "To: {$cfg['to_email']}\r\n"
        . "Subject: {$subject}\r\n"
        . "MIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8\r\n\r\n";
    $send($headers . str_replace("\n.", "\n..", $body) . "\r\n.");
    $ok = smtp_expect($sock, 250);
    $send('QUIT');
    fclose($sock);
    return $ok;
}

$body = "Neue Anfrage über das Kontaktformular\n\n"
    . "Name: {$name}\nE-Mail: {$email}\nTelefon: " . ($phone !== '' ? $phone : '-') . "\n\nNachricht:\n{$message}\n";

if (!smtp_send($config, $name, $email, $body)) {
    fail('server', $isAjax);
}

if ($isAjax) {
    json_out(['ok' => true]);
}
header('Location: /danke/');

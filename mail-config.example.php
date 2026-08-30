<?php
// Vorlage für die SMTP-Zugangsdaten des Kontaktformulars.
//
// Diese Datei NICHT unter diesem Namen verwenden. Stattdessen als
// "mail-config.php" außerhalb des Web-Root ablegen (z. B. eine Ebene
// über htdocs/), niemals ins Repository committen (siehe .gitignore).
//
// public/api/kontakt.php sucht die Datei standardmäßig unter
// $_SERVER['DOCUMENT_ROOT'] . '/../mail-config.php', überschreibbar
// per Umgebungsvariable MAIL_CONFIG_PATH.

return [
    'smtp_host' => 'smtp.strato.de',
    'smtp_port' => 465,
    'smtp_secure' => 'ssl', // 'ssl' (Port 465) oder 'tls' (Port 587, STARTTLS)
    'smtp_user' => 'formular@sicura-sicherheitstechnik.de',
    'smtp_pass' => 'HIER-ECHTES-PASSWORT-EINTRAGEN',
    'from_email' => 'formular@sicura-sicherheitstechnik.de',
    'to_email' => 'info@sicura-sicherheitstechnik.de',
];

# Sicura Sicherheitstechnik - Website

Relaunch der Website eines inhabergefuehrten Sicherheitstechnik-Betriebs in
Dalheim (Rheinhessen). Statische Astro-Seite, gehostet bei Strato.
Das vollstaendige Projektgedaechtnis liegt in Notion; diese Datei ist die
Kurzfassung, die auch ohne Notion-Zugriff gilt.

## Nicht verhandelbar

1. Keine erfundenen Fakten. Firmendaten nur aus Notion-Seite 17.
   Fehlt eine Angabe, ist sie unbekannt: als offenen Punkt notieren, nicht raten.
2. Keine Preise. Nirgends, in keiner Form.
3. Keine Zertifizierungsbehauptungen. Erlaubt ist ausschliesslich:
   "Wir planen und installieren Systeme von Ajax, Hikvision, Axis, Lupus und Jablotron."
   Verboten: "zertifizierter Partner", "autorisierter Fachpartner", Partner-Siegel.
4. Keine Rechtstexte final formulieren. Entwuerfe ja, Freigabe nur durch Menschen.
5. Keine externen Ressourcen zur Laufzeit: keine CDN, keine Google Fonts,
   kein Analytics, kein Maps-Embed, kein Bewertungs-Widget, kein Captcha.
   Folge: kein Cookie-Banner noetig. Diese Eigenschaft ist ein Projektziel.
6. Keine kostenpflichtigen APIs im Produktivbetrieb.
7. Keine Datenbank, kein CMS, kein Login. Genau ein dynamischer Endpunkt:
   public/api/kontakt.php

## Themen, die auf der Website nicht vorkommen

Alarmaufschaltung, Monitoring, Leitstelle, Securitas, verdeckte Videoueberwachung,
Miet- und Leihtechnik, Wartung fremdinstallierter Anlagen, markenunabhaengiger
Service, Anlagenuebernahme, Zutrittskontrolle, Brandmelde- und Rauchwarntechnik,
GPS-Ortung, Peilsender, Wanzendetektoren, Personennotruf, Alleinarbeiterschutz,
Bewachung oder Sicherheitspersonal, Newsletter, Mitarbeiterzahl, Personenfotos,
Kundennamen, Oeffnungszeiten (bis zur Freigabe), Notfallnummer, Bankdaten.

## Harte Fakten

    Firma           Sicura Sicherheitstechnik
    Inhaberin       Angela Foggia (auch verantwortlich nach Paragraf 18 MStV)
    Rechtsform      Einzelunternehmen, kein Handelsregistereintrag
    Anschrift       Am Steinberg 4, 55278 Dalheim
    Telefon         06249 937 9999
    E-Mail          info@sicura-sicherheitstechnik.de
    USt-IdNr        DE313241112
    Domain          sicura-sicherheitstechnik.de
    Gegruendet      2010
    Einsatzgebiet   Rheinhessen und Rhein-Main, rund 100 km um Dalheim
    Bewertungen     Google 5,0/5 bei 14 - Infobel 5,0/5 bei 8 (Stand 08/2026)

Schreibweisen, die haeufig falsch sind: Sicura (nicht Secura),
Dalheim (nicht Dahlheim), Kavotec (nicht Carbotec).
Die NAP-Angaben muessen auf Website, Impressum und Footer zeichengenau
identisch sein. Einzige Quelle im Code: src/lib/site.ts.

## Stack

    Framework    Astro, statischer Build, keine SSR-Adapter
    Styling      Tailwind v4 (CSS-first) mit ersetzter Palette aus src/styles/tokens.css
    JavaScript   Vanilla, punktuell. Kein React, keine UI-Bibliothek.
    Inhalte      Direkt in den .astro-Seiten bzw. src/lib/site.ts, keine Datenbank
    Formular     public/api/kontakt.php, ohne Abhaengigkeiten
    Hosting      Strato Hosting Starter, PHP 8.x, kein Node auf dem Server
    Deployment   Build lokal (npm run build), Upload des dist/-Ordners per SFTP nach /htdocs

## Ordner

    src/pages          eine Datei je Seite aus der Sitemap
    src/components      Komponenten laut Notion-Seite 18
    src/layouts         BaseLayout, ProseLayout
    src/lib/site.ts     einzige Quelle der Stammdaten (NAP) und Navigation
    src/styles          tokens.css, fonts.css, global.css
    public/fonts        selbst gehostete woff2-Dateien (Archivo)
    public/img
    public/api          kontakt.php
    docs                Spiegel der wichtigsten Notion-Seiten
    .htaccess (public/) Security-Header, Redirects, HTTPS

## Design in einem Satz

Helle, warme Flaeche, dunkle Tinte, ein einziger Signalton, Radius 2px,
keine Schatten auf Karten, keine Icon-Kreise, keine drei gleichen Kacheln.
Alle Werte in src/styles/tokens.css, keine Hex-Werte in Komponenten.

## Sitemap, 11 Seiten plus Utility-Seiten

    /
    /leistungen/
    /leistungen/videoueberwachung/
    /leistungen/einbruchmeldeanlagen/
    /leistungen/service-wartung/
    /ueber-uns/
    /referenzen/
    /partner/
    /kontakt/
    /danke/            noindex
    /impressum/        Anker #bildnachweise
    /datenschutz/
    /404/

Alle gestrichenen Alt-URLs gehen per 301 auf /leistungen/ oder ein passenderes
Ziel. Vollstaendige Liste in public/.htaccess und docs/03-content-url-inventar.md.

## Formular

Fuenf Felder: Name, E-Mail, Telefon (optional), Nachricht, Einwilligung.
Schutz: Honeypot, Zeitfalle unter 3 Sekunden, CSRF-Token (Session), Rate Limit
3 pro IP je 10 Minuten und 10 pro Tag, globale Grenze 200 Mails pro Tag,
Feldvalidierung, Zeilenumbrueche aus allen Kopfzeilenfeldern entfernen,
keine Anhaenge, nichts speichern. Versand per SMTP ueber das Strato-Postfach,
Zugangsdaten in mail-config.php ausserhalb des Web-Root (Vorlage:
mail-config.example.php), niemals im Repo (siehe .gitignore).

## Offene Platzhalter — nicht von einem Agenten ausfuellen

Diese Stellen sind im Code als TODO-Kommentar markiert und warten auf
Freigabe der Kundin (siehe Notion 17, Abschnitt F):

- Drei Fallbeispiele (/referenzen/): Ausgangslage, Loesung, Ergebnis
- /kontakt/: Erreichbarkeitssatz, Rueckmeldesatz
- Link zum Google-Unternehmensprofil (ReviewBlock)
- Herstellerlogos als Dateien (aktuell Text-Wortmarken in LogoStrip.astro)
- Open-Graph-Bilder je Hauptseite (aktuell nicht gesetzt)
- AVV mit Strato (Datenschutzerklaerung, Abschnitt Hosting)

## Definition of Done je Seite

- Genau eine H1, lueckenlose Ueberschriftenhierarchie
- Title und Description gesetzt, Canonical
- Alle Bilder mit width, height, alt und Eintrag in einer Bildliste
- Tastaturbedienung vollstaendig, Fokus sichtbar
- Lighthouse mobil mindestens 95 in allen vier Kategorien
- Kein Netzwerkaufruf zu fremden Domains
- Keine Platzhaltermarken mehr im Text

## Arbeitsweise

- Nach jedem Arbeitspaket: Status in der Notion-Datenbank 10 pflegen.
- Neue Erkenntnisse gehoeren in die zustaendige Notion-Seite, nicht nur in den Chat.
- Bei Unsicherheit fragen. Diese Seite geht live fuer ein echtes Unternehmen.
- Vor jedem Deployment ein Stand von /htdocs sichern. Rollback unter fuenf Minuten.

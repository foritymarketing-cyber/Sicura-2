# Sicura Sicherheitstechnik — Website

Statische Astro-Website für Sicura Sicherheitstechnik (Dalheim, Rheinhessen).
Projektregeln, Fakten und Bauvorgaben stehen in [`CLAUDE.md`](./CLAUDE.md)
und im gespiegelten Notion-Wissen unter [`docs/`](./docs/README.md).

## Befehle

| Befehl | Wirkung |
| --- | --- |
| `npm install` | Abhängigkeiten installieren |
| `npm run dev` | Lokaler Dev-Server auf `localhost:4321` |
| `npm run build` | Produktions-Build nach `./dist/` |
| `npm run preview` | Gebauten Stand lokal ansehen |

## Deployment

Build lokal ausführen, dann den Inhalt von `dist/` per SFTP nach `/htdocs`
bei Strato hochladen. Kein Node.js auf dem Server nötig.

Das Kontaktformular (`public/api/kontakt.php`) braucht zusätzlich eine
`mail-config.php` **außerhalb** des Web-Root (Vorlage:
`mail-config.example.php`). Diese Datei niemals ins Repository committen.

## Offene Punkte vor Go-Live

Siehe `CLAUDE.md`, Abschnitt „Offene Platzhalter“, sowie Notion „08 – Recht &
Compliance“ (Go-Live-Sperre) und „17 – Kundenbriefing kompakt“, Abschnitt F.

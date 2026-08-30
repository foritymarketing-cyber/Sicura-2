# 14 – Sitemap & Seitenarchitektur

11 Seiten. Keine mehr.

```
/                                    Startseite
/leistungen/                         Übersicht
  /leistungen/videoueberwachung/
  /leistungen/einbruchmeldeanlagen/
  /leistungen/service-wartung/
/ueber-uns/
/referenzen/
/partner/
/kontakt/
/danke/                              noindex, nach Formularversand
/impressum/                          inkl. #bildnachweise
/datenschutz/
/404/
```

Gestrichen: `/leistungen/verdeckte-videoueberwachung/` (nicht beworben) und
`/leistungen/miete/` (soll verschwinden).

## Navigation

Hauptmenü — vier Punkte: Leistungen (Aufklappmenü) · Über uns · Referenzen ·
Kontakt. Telefonnummer rechts, klickbar, auf Mobil dauerhaft sichtbar
(Sticky-Call-Leiste).

Footer: Leistungen (Liste) · Unternehmen (Über uns, Referenzen, Partner) ·
Kontakt (Adresse, Telefon, E-Mail) · Rechtliches (Impressum, Datenschutz).
Facebook als Textlink. `/partner/` nur im Footer + Link von `/ueber-uns/`.

## Conversion-Pfade

Anruf (wichtigster Weg) · Formular · E-Mail. Kein Chat, kein Rückrufservice,
kein Terminbuchungstool.

## Local SEO

Keine Städteseiten, keine Keyword-Ketten. Einsatzgebiet wird einmal auf
`/kontakt/` und `/ueber-uns/` genannt.

## Redirect-Map (Auszug, Änderungen ggü. Notion 03)

| Alt-URL | Jetzt |
|---|---|
| `/alarm-monitoring/` | 301 → `/leistungen/` |
| `/alarmaufschaltung/` | 301 → `/leistungen/` |
| `/monitoring-preisliste/` | 301 → `/leistungen/` |
| `/lone-worker-schutz-…/` | 301 → `/leistungen/` |
| `/gps-ortung/` | 301 → `/leistungen/` |
| `/sorglos-sicherheit-paket/` | 301 → `/leistungen/` (endgültig gestrichen) |
| `/verdeckte-videoueberwachung/` | 301 → `/leistungen/` |
| `/technik-auf-mietbasis-verleih/` | 301 → `/leistungen/` |
| `/nuetzliche-links/` | 301 → `/leistungen/` |
| `/dienstleitungen-und-service/` | 301 → `/leistungen/` |

Vollständige Liste (inkl. rund 40 Boilerplate-Alt-URLs aus Notion 03) siehe
`public/.htaccess`.

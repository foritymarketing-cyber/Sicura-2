# 18 – Designsystem (Kurzfassung)

Vollständige Tokens: `src/styles/tokens.css` (kanonische Quelle, nicht diese Datei).
Tailwind-Anbindung: `src/styles/global.css` (`@theme`-Block).

## Prinzipien

- Drei Farbfamilien: Tinte (ink), Papier (paper), Primär (primary) — plus **ein** Signalton (accent). Reines Schwarz/Weiß kommt nirgends vor.
- Akzentton höchstens zweimal pro Bildschirmseite.
- Eine Schrift (Archivo, selbst gehostet), drei Schnitte: 400/500/700.
- Radius überall 2px. Ein Schatten-Level, nur für Sticky-Leiste und offene Menüs.
- Abstandsskala: 4·8·12·16·24·32·48·64·96·128 px — entspricht Tailwinds
  Standard-Spacing bei den Multiplikatoren 1,2,3,4,6,8,12,16,24,32.
- Keine zwei aufeinanderfolgenden Sektionen mit demselben Flächenton.
- Layout-Rhythmus gegen den Baukasten-Look: asymmetrischer Hero, Leistungsblöcke
  im Bild-links/Bild-rechts/textbreit-Wechsel, Nummerierung statt Icon-Kreise.

## Komponenten (Ist-Zustand in `src/components/`)

Header, MobileNav (im Header integriert), StickyCallBar, Hero (Varianten
`home`/`sub`), TrustBar, ServiceBlock, StepList, CaseCard, ReviewBlock,
LogoStrip, Faq, CtaBand, ContactForm, Footer, Figure.

## Bekannte Abweichungen vom Notion-Vorschlag

- **Hero-Bild:** Notion sieht ein fotografisches Bild vor. Da kein
  lizenziertes Bildmaterial vorliegt (Negativliste Punkt 17), wurde
  stattdessen eine abstrakte, lizenzfreie Linien-Grafik aus den Design-Tokens
  gebaut. Bei Lieferung echter Fotografie ersetzen.
- **Herstellerlogos:** Als Text-Wortmarken umgesetzt (`LogoStrip.astro`),
  bis echte Logo-Dateien mit Freigabe vorliegen (Notion 17, Punkt F4).
- **Markenfarbe:** vorläufig, siehe Vorbehalt in Notion 18 — Logofarben noch
  nicht extrahiert.

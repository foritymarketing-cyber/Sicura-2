// Zentrale Stammdaten (NAP) — Quelle: Notion "17 – Kundenbriefing kompakt".
// Diese Datei ist die einzige Stelle, an der Firmendaten hart codiert werden.
// Website, Impressum und Footer beziehen sich hierauf, damit die Angaben
// zeichengenau identisch bleiben.

export const site = {
  name: 'Sicura Sicherheitstechnik',
  owner: 'Angela Foggia',
  legalForm: 'Einzelunternehmen',
  street: 'Am Steinberg 4',
  postalCode: '55278',
  city: 'Dalheim',
  region: 'Rheinhessen',
  phoneDisplay: '06249 937 9999',
  phoneHref: 'tel:+4962499379999',
  email: 'info@sicura-sicherheitstechnik.de',
  vatId: 'DE313241112',
  domain: 'sicura-sicherheitstechnik.de',
  url: 'https://sicura-sicherheitstechnik.de',
  foundedYear: 2010,
  serviceArea:
    'Wir arbeiten in Rheinhessen und im Rhein-Main-Gebiet – im Umkreis von rund 100 Kilometern um unseren Sitz in Dalheim.',
  facebook: 'https://facebook.com/Sicura.Sicherheitstechnik',
  reviews: {
    google: { rating: 5.0, count: 14, source: 'Google', asOf: '08/2026' },
    infobel: { rating: 5.0, count: 8, source: 'Infobel', asOf: '08/2026' },
  },
  manufacturers: ['Ajax', 'Hikvision', 'Axis', 'Lupus', 'Jablotron'],
  localPartners: [
    { name: 'Vodafone-Shops', detail: 'Dreieich, Darmstadt, Wittlich, Hofheim, Bad Vilbel, Obertshausen, Groß-Gerau' },
    { name: 'Gym7', detail: 'Mainz-Hechtsheim und Mommenheim' },
    { name: 'Kavotec', detail: '' },
    { name: 'Phönix Carwash', detail: '' },
  ],
} as const;

export const mainNav = [
  {
    label: 'Leistungen',
    href: '/leistungen/',
    children: [
      { label: 'Videoüberwachung', href: '/leistungen/videoueberwachung/' },
      { label: 'Einbruchmeldeanlagen', href: '/leistungen/einbruchmeldeanlagen/' },
      { label: 'Service und Wartung', href: '/leistungen/service-wartung/' },
    ],
  },
  { label: 'Über uns', href: '/ueber-uns/' },
  { label: 'Referenzen', href: '/referenzen/' },
  { label: 'Kontakt', href: '/kontakt/' },
] as const;

export const footerNav = {
  leistungen: [
    { label: 'Videoüberwachung', href: '/leistungen/videoueberwachung/' },
    { label: 'Einbruchmeldeanlagen', href: '/leistungen/einbruchmeldeanlagen/' },
    { label: 'Service und Wartung', href: '/leistungen/service-wartung/' },
  ],
  unternehmen: [
    { label: 'Über uns', href: '/ueber-uns/' },
    { label: 'Referenzen', href: '/referenzen/' },
    { label: 'Partner', href: '/partner/' },
  ],
  rechtliches: [
    { label: 'Impressum', href: '/impressum/' },
    { label: 'Datenschutz', href: '/datenschutz/' },
  ],
} as const;

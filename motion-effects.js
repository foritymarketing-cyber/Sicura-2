// ==========================================================================
// Sicura Sicherheitstechnik — Motion-Effekte (motion.dev, vendored)
// Ergänzt das bestehende Scroll-Reveal in script.js um Effekte, die eine
// binäre IntersectionObserver-Umschaltung nicht leisten kann: eine
// kontinuierliche, scroll-gekoppelte Fortschrittslinie sowie die Einblendung
// des Hero-/Seitenkopf-Inhalts beim Laden. Läuft rein progressiv: ohne JS
// oder bei deaktiviertem Motion bleibt der Inhalt regulär sichtbar, da
// nichts per CSS vorab ausgeblendet wird.
// ==========================================================================

(function () {
  'use strict';

  if (!window.Motion) return;

  var animate = window.Motion.animate;
  var scroll = window.Motion.scroll;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduce) return;

  /* ---- Kopfzeile: Fortschrittslinie über die gesamte Seitenhöhe ---- */
  var bar = document.querySelector('.nav-progress');
  if (bar) {
    scroll(animate(bar, { scaleX: [0, 1] }, { ease: 'linear' }));
  }

  /* ---- Hero / Seitenkopf: Einblendung beim Laden ---- */
  var intro = document.querySelector('.hero-content') || document.querySelector('.page-hero .container');
  if (intro) {
    animate(
      intro,
      { opacity: [0, 1], y: [24, 0] },
      { duration: 0.7, delay: 0.1, easing: [0.22, 1, 0.36, 1] }
    );
  }
})();

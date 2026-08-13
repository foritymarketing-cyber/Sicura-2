// ==========================================================================
// Sicura Sicherheitstechnik — Interaktionen
// Mobile Navigation, Scroll-Reveal, Kontaktformular-Validierung
// ==========================================================================

(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Mobile Navigation ---- */
  var navToggle = document.querySelector('.nav-toggle');
  var navDesktop = document.querySelector('.nav-desktop');

  if (navToggle && navDesktop) {
    navToggle.addEventListener('click', function () {
      var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navDesktop.classList.toggle('is-open', !isOpen);
      document.body.style.overflow = !isOpen ? 'hidden' : '';
    });

    navDesktop.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        navDesktop.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) {
        navToggle.setAttribute('aria-expanded', 'false');
        navDesktop.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---- Transparenter Header über dem Video-Hero (nur Startseite) ---- */
  var header = document.querySelector('.site-header');

  if (header && document.body.classList.contains('has-video-hero')) {
    var scrollThreshold = 40;
    var headerTicking = false;

    var updateHeaderState = function () {
      header.classList.toggle('is-scrolled', window.scrollY > scrollThreshold);
      headerTicking = false;
    };

    window.addEventListener(
      'scroll',
      function () {
        if (!headerTicking) {
          window.requestAnimationFrame(updateHeaderState);
          headerTicking = true;
        }
      },
      { passive: true }
    );

    updateHeaderState();
  }

  /* ---- Hero-Video: bei reduzierter Bewegung auf erstem Frame anhalten ---- */
  var heroVideo = document.querySelector('.hero-video');

  if (heroVideo && prefersReducedMotion) {
    heroVideo.addEventListener(
      'loadeddata',
      function () {
        heroVideo.pause();
      },
      { once: true }
    );
  }

  /* ---- Scroll-Reveal ---- */
  var revealEls = document.querySelectorAll('[data-reveal]');

  if (revealEls.length) {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) {
        el.classList.add('is-visible');
      });
    } else {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry, index) {
            if (entry.isIntersecting) {
              var el = entry.target;
              var group = el.closest('[data-reveal-group]');
              var delay = 0;

              if (group) {
                var siblings = Array.prototype.slice.call(group.querySelectorAll('[data-reveal]'));
                delay = siblings.indexOf(el) * 60;
              }

              el.style.animationDelay = delay + 'ms';
              el.classList.add('is-visible');
              observer.unobserve(el);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      );

      revealEls.forEach(function (el) {
        observer.observe(el);
      });
    }
  }

  /* ---- Kontaktformular: Client-seitige Validierung ---- */
  var form = document.querySelector('#contact-form');

  if (form) {
    var statusBox = form.querySelector('.form-status');

    var validators = {
      name: function (value) {
        return value.trim().length >= 2 ? '' : 'Bitte geben Sie Ihren Namen ein.';
      },
      email: function (value) {
        var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(value.trim()) ? '' : 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
      },
      message: function (value) {
        return value.trim().length >= 10 ? '' : 'Bitte beschreiben Sie kurz Ihr Anliegen (mind. 10 Zeichen).';
      },
      consent: function (checked) {
        return checked ? '' : 'Bitte stimmen Sie der Datenschutzerklärung zu.';
      }
    };

    function setFieldError(field, message) {
      var row = field.closest('.form-row');
      if (!row) return;
      var errorEl = row.querySelector('.field-error');
      if (message) {
        row.classList.add('has-error');
        if (errorEl) errorEl.textContent = message;
        field.setAttribute('aria-invalid', 'true');
      } else {
        row.classList.remove('has-error');
        if (errorEl) errorEl.textContent = '';
        field.removeAttribute('aria-invalid');
      }
    }

    function validateField(field) {
      var validator = validators[field.name];
      if (!validator) return true;

      var value = field.type === 'checkbox' ? field.checked : field.value;
      var message = validator(value);
      setFieldError(field, message);
      return !message;
    }

    ['name', 'email', 'message', 'consent'].forEach(function (fieldName) {
      var field = form.elements[fieldName];
      if (!field) return;
      var eventName = field.type === 'checkbox' ? 'change' : 'blur';
      field.addEventListener(eventName, function () {
        validateField(field);
      });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var fieldsToValidate = ['name', 'email', 'message', 'consent'];
      var isValid = true;
      var firstInvalid = null;

      fieldsToValidate.forEach(function (fieldName) {
        var field = form.elements[fieldName];
        if (!field) return;
        var fieldIsValid = validateField(field);
        if (!fieldIsValid) {
          isValid = false;
          if (!firstInvalid) firstInvalid = field;
        }
      });

      if (!isValid) {
        if (firstInvalid) firstInvalid.focus();
        if (statusBox) {
          statusBox.className = 'form-status is-visible error';
          statusBox.innerHTML =
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><line x1="12" y1="8" x2="12" y2="13"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg><span>Bitte prüfen Sie Ihre Angaben und füllen Sie die markierten Felder aus.</span>';
        }
        return;
      }

      // Hinweis: Dieses Formular ist aktuell nicht an ein Backend/E-Mail-Postfach angebunden.
      // Für den produktiven Einsatz muss hier eine Übermittlung (z. B. per Formularservice
      // oder eigenem Endpunkt) ergänzt werden.
      form.reset();

      if (statusBox) {
        statusBox.className = 'form-status is-visible success';
        statusBox.innerHTML =
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg><span>Vielen Dank! Ihre Anfrage wurde erfasst. Wir melden uns zeitnah bei Ihnen.</span>';
        statusBox.setAttribute('role', 'status');
        statusBox.setAttribute('aria-live', 'polite');
      }
    });
  }

  /* ---- Aktuelles Jahr im Footer ---- */
  var yearEls = document.querySelectorAll('[data-current-year]');
  yearEls.forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();

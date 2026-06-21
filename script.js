(function () {
  'use strict';

  var PHONE = '919518547622';

  var header = document.getElementById('header');
  var navToggle = document.getElementById('nav-toggle');
  var navMenu = document.getElementById('nav-menu');
  var navOverlay = document.getElementById('nav-overlay');
  var navLinks = document.querySelectorAll('.nav__link');
  var contactForm = document.getElementById('contact-form');
  var yearEl = document.getElementById('year');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  function closeMenu() {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    navOverlay.classList.remove('active');
    header.classList.remove('menu-open');
    document.body.classList.remove('menu-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
    navOverlay.setAttribute('aria-hidden', 'true');
  }

  function openMenu() {
    navMenu.classList.add('active');
    navToggle.classList.add('active');
    navOverlay.classList.add('active');
    header.classList.add('menu-open');
    document.body.classList.add('menu-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close menu');
    navOverlay.setAttribute('aria-hidden', 'false');
  }

  window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  navToggle.addEventListener('click', function () {
    if (navMenu.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navOverlay.addEventListener('click', closeMenu);

  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  var reviewsTrack = document.getElementById('reviews-track');
  if (reviewsTrack) {
    var reviewsGroup = reviewsTrack.querySelector('.reviews__group');
    if (reviewsGroup) {
      var reviewsClone = reviewsGroup.cloneNode(true);
      reviewsClone.setAttribute('aria-hidden', 'true');
      reviewsTrack.appendChild(reviewsClone);
    }
  }

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var name = document.getElementById('name').value.trim();
    var society = document.getElementById('society').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var message = document.getElementById('message').value.trim();

    var text = 'Hello Satish Pawar,\n\n';
    text += 'Name: ' + name + '\n';
    if (society) text += 'Society: ' + society + '\n';
    text += 'Phone: ' + phone + '\n\n';
    text += 'Message:\n' + message;

    var whatsappUrl = 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(text);
    window.open(whatsappUrl, '_blank');
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    });

    document.querySelectorAll(
      '.service-card, .trust-item, .org__feature, .about__highlights li'
    ).forEach(function (el) {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }
})();

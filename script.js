(function () {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------
     Header state
     --------------------------------------------------------- */
  const header = document.getElementById('site-header');
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 30);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------------------------------------------------------
     Mobile menu
     --------------------------------------------------------- */
  const menu = document.getElementById('mobile-menu');
  const menuToggle = document.querySelector('.menu-toggle');
  const menuLinks = menu.querySelectorAll('a');
  let menuOpen = false;

  const setMenu = (open) => {
    menuOpen = open;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    menu.inert = !open;
    header.classList.toggle('menu-active', open);
    document.body.classList.toggle('menu-open', open);
    if (open) {
      window.setTimeout(() => menuLinks[0] && menuLinks[0].focus(), 120);
    } else {
      menuToggle.focus({ preventScroll: true });
    }
  };

  menu.inert = true;
  menu.setAttribute('aria-hidden', 'true');
  menuToggle.addEventListener('click', () => setMenu(!menuOpen));
  menuLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));
  document.querySelectorAll('.site-header a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => { if (menuOpen) setMenu(false); });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuOpen) setMenu(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 980 && menuOpen) {
      menuOpen = false;
      menuToggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
      menu.setAttribute('aria-hidden', 'true');
      menu.inert = true;
  menu.setAttribute('aria-hidden', 'true');
      header.classList.remove('menu-active');
      document.body.classList.remove('menu-open');
    }
  });

  /* ---------------------------------------------------------
     Active nav link
     --------------------------------------------------------- */
  const navLinks = document.querySelectorAll('.nav__link');
  const sections = ['home', 'about', 'explore', 'gallery', 'contact']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle('is-active', link.dataset.nav === entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach((section) => navObserver.observe(section));
  }

  /* ---------------------------------------------------------
     Scroll reveal
     --------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  if (!reducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------------------------------------------------------
     Gallery lightbox
     --------------------------------------------------------- */
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbCaption = document.getElementById('lightbox-caption');
  const items = Array.from(document.querySelectorAll('.gitem'));
  let activeIndex = 0;
  let lastTrigger = null;

  const renderLightbox = (index) => {
    activeIndex = (index + items.length) % items.length;
    const trigger = items[activeIndex];
    const img = trigger.querySelector('img');
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt;
    lbCaption.textContent = trigger.querySelector('.gitem__label').textContent;
    lbImg.width = img.naturalWidth || img.width;
    lbImg.height = img.naturalHeight || img.height;
  };

  const openLightbox = (index, trigger) => {
    lastTrigger = trigger;
    renderLightbox(index);
    if (typeof lightbox.showModal === 'function') {
      lightbox.showModal();
    } else {
      lightbox.setAttribute('open', '');
    }
    document.body.classList.add('menu-open');
  };

  const closeLightbox = () => {
    lightbox.close ? lightbox.close() : lightbox.removeAttribute('open');
    document.body.classList.remove('menu-open');
    if (lastTrigger) lastTrigger.focus({ preventScroll: true });
  };

  items.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index, item));
  });

  lightbox.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox__nav--prev').addEventListener('click', () => renderLightbox(activeIndex - 1));
  lightbox.querySelector('.lightbox__nav--next').addEventListener('click', () => renderLightbox(activeIndex + 1));

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  lightbox.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') renderLightbox(activeIndex - 1);
    if (event.key === 'ArrowRight') renderLightbox(activeIndex + 1);
  });
  lightbox.addEventListener('close', () => {
    document.body.classList.remove('menu-open');
    if (lastTrigger) lastTrigger.focus({ preventScroll: true });
  });

  /* ---------------------------------------------------------
     Enquiry form
     --------------------------------------------------------- */
  const form = document.getElementById('enquiry-form');
  const statusEl = document.getElementById('form-status');
  const emailFallback = document.getElementById('send-email');

  const BUSINESS_PHONE = '919100076101';
  const BUSINESS_EMAIL = 'joyesslifestyle@gmail.com';

  const fields = {
    name: document.getElementById('name'),
    phone: document.getElementById('phone'),
    email: document.getElementById('email'),
    message: document.getElementById('message')
  };

  const setError = (key, message) => {
    const input = fields[key];
    const wrap = input.closest('.field');
    const error = document.getElementById(key + '-error');
    error.textContent = message || '';
    wrap.classList.toggle('is-invalid', Boolean(message));
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
  };

  const validators = {
    name(value) {
      if (!value.trim()) return 'Please tell us your name.';
      if (value.trim().length < 2) return 'Your name should be at least 2 characters.';
      return '';
    },
    phone(value) {
      if (!value.trim()) return 'Please add a phone number we can reach you on.';
      const digits = value.replace(/\D/g, '');
      if (digits.length < 10) return 'Please enter a full phone number (at least 10 digits).';
      if (digits.length > 15) return 'That phone number looks too long.';
      if (!/^[+()\d\s-]+$/.test(value)) return 'Please use digits, spaces, or + ( ) - only.';
      return '';
    },
    email(value) {
      if (!value.trim()) return '';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())) return 'Please check your email address.';
      return '';
    },
    message(value) {
      if (!value.trim()) return 'Please share a few words about your enquiry.';
      if (value.trim().length < 10) return 'A little more detail helps — at least 10 characters.';
      return '';
    }
  };

  const validateField = (key) => {
    const message = validators[key](fields[key].value);
    setError(key, message);
    return !message;
  };

  Object.keys(fields).forEach((key) => {
    fields[key].addEventListener('blur', () => {
      if (fields[key].value.trim()) validateField(key);
    });
    fields[key].addEventListener('input', () => {
      if (fields[key].closest('.field').classList.contains('is-invalid')) validateField(key);
    });
  });

  const buildMessage = () => {
    return [
      'Hello Joyess Lifestyle,',
      '',
      fields.message.value.trim(),
      '',
      'Name: ' + fields.name.value.trim(),
      'Phone: ' + fields.phone.value.trim(),
      fields.email.value.trim() ? 'Email: ' + fields.email.value.trim() : '',
      '',
      '(Sent from the Joyess Lifestyle concept website.)'
    ].filter((line) => line !== null).join('\n').replace(/\n{3,}/g, '\n\n');
  };

  const showStatus = (message, type) => {
    statusEl.textContent = message;
    statusEl.className = 'enquiry-form__status' + (type ? ' is-' + type : '');
  };

  const runValidation = () => {
    const results = Object.keys(fields).map((key) => validateField(key));
    const firstInvalid = Object.keys(fields).find((key) =>
      fields[key].closest('.field').classList.contains('is-invalid')
    );
    if (firstInvalid) {
      fields[firstInvalid].focus();
      showStatus('Please check the highlighted fields and try again.', 'error');
      return false;
    }
    return results.every(Boolean);
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!runValidation()) return;

    const text = buildMessage();
    const waUrl = 'https://wa.me/' + BUSINESS_PHONE + '?text=' + encodeURIComponent(text);

    showStatus('Opening WhatsApp with your enquiry — press Send there to reach the team.', 'success');
    const link = document.createElement('a');
    link.href = waUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  emailFallback.addEventListener('click', () => {
    if (!runValidation()) return;
    const subject = 'Enquiry via Joyess Lifestyle concept website';
    const mailUrl = 'mailto:' + BUSINESS_EMAIL + '?subject=' +
      encodeURIComponent(subject) + '&body=' + encodeURIComponent(buildMessage());
    showStatus('Opening your email app with the enquiry ready to send.', 'success');
    window.location.href = mailUrl;
  });

  /* ---------------------------------------------------------
     Year
     --------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();

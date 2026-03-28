/* rachelsuffian.com — main.js */
(function () {
  'use strict';

  const nav        = document.getElementById('nav');
  const hamburger  = document.getElementById('hamburger');
  const overlay    = document.getElementById('nav-overlay');
  const lightbox   = document.getElementById('lightbox');
  const lbImg      = document.getElementById('lightbox-img');
  const lbCredit   = document.getElementById('lightbox-credit');
  const lbClose    = document.getElementById('lightbox-close');
  const heroScroll = document.querySelector('.hero-scroll');

  // ── Nav: hide hero scroll indicator after first scroll ───
  let scrollIndicatorHidden = false;
  window.addEventListener('scroll', function () {
    if (!scrollIndicatorHidden && window.scrollY > 60 && heroScroll) {
      heroScroll.style.opacity = '0';
      heroScroll.style.transition = 'opacity 0.6s ease';
      scrollIndicatorHidden = true;
    }
  }, { passive: true });

  // ── Nav: active link tracking ────────────────────────────
  const sections   = document.querySelectorAll('section[id]');
  const navLinks   = document.querySelectorAll('.nav-links a[href^="#"]');
  const navHeight  = 80;

  function updateActiveLink() {
    let current = '';
    sections.forEach(function (section) {
      if (window.scrollY >= section.offsetTop - navHeight - 20) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(function (link) {
      const href = link.getAttribute('href').slice(1);
      link.classList.toggle('active', href === current);
    });
  }
  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  // ── Mobile nav overlay ───────────────────────────────────
  function openMenu() {
    overlay.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    overlay.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    overlay.classList.contains('open') ? closeMenu() : openMenu();
  });

  // Close on overlay link click
  overlay.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (overlay.classList.contains('open')) closeMenu();
      if (lightbox.classList.contains('open')) closeLightbox();
    }
  });

  // ── Scroll reveal ────────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(function (el) {
    revealObserver.observe(el);
  });

  // ── Photo slider — infinite loop ─────────────────────────
  var photoGrid  = document.getElementById('photo-grid');
  var sliderPrev = document.getElementById('slider-prev');
  var sliderNext = document.getElementById('slider-next');

  // Clone all items before & after for infinite feel
  var originals = Array.from(photoGrid.querySelectorAll('.photo-item'));
  var n = originals.length;

  originals.forEach(function (item) {
    var c = item.cloneNode(true);
    c.setAttribute('aria-hidden', 'true');
    photoGrid.appendChild(c);
  });
  originals.slice().reverse().forEach(function (item) {
    var c = item.cloneNode(true);
    c.setAttribute('aria-hidden', 'true');
    photoGrid.insertBefore(c, photoGrid.firstChild);
  });

  function itemWidth() {
    return photoGrid.querySelector('.photo-item').offsetWidth + 3;
  }

  function visibleCount() {
    return window.innerWidth >= 768 ? 3 : 1;
  }

  function setScroll(val) {
    photoGrid.style.scrollBehavior = 'auto';
    photoGrid.scrollLeft = val;
    requestAnimationFrame(function () {
      photoGrid.style.scrollBehavior = '';
    });
  }

  function initScroll() {
    setScroll(itemWidth() * n);
  }
  initScroll();
  window.addEventListener('resize', initScroll, { passive: true });

  var sliding = false;

  function slide(dir) {
    if (sliding) return;
    sliding = true;
    var w = itemWidth();
    photoGrid.scrollBy({ left: dir * w, behavior: 'smooth' });

    setTimeout(function () {
      var sl = photoGrid.scrollLeft;
      var setW = itemWidth() * n;
      if (sl >= setW * 2) {
        setScroll(sl - setW);
      } else if (sl < setW) {
        setScroll(sl + setW);
      }
      sliding = false;
    }, 450);
  }

  sliderPrev.addEventListener('click', function () { slide(-1); });
  sliderNext.addEventListener('click', function () { slide(1); });

  // ── Lightbox — delegated so clones work ──────────────────
  function openLightbox(src, credit) {
    lbImg.src = src;
    lbImg.alt = credit || '';
    lbCredit.textContent = credit || '';
    lbCredit.style.display = credit ? 'block' : 'none';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(function () { lbImg.src = ''; }, 300);
  }

  photoGrid.addEventListener('click', function (e) {
    var item = e.target.closest('.photo-item');
    if (item && item.dataset.full) {
      openLightbox(item.dataset.full, item.dataset.credit);
    }
  });

  lbClose.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

}());

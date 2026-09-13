/* Prime Control — vanilla JS. Progressive enhancement only; every page works without this file. */
(function () {
  'use strict';

  var doc = document;
  var heroVideo = null;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var desktop = window.matchMedia('(min-width: 64rem)');

  /* ---------- Mobile menu ---------- */
  var toggle = doc.querySelector('[data-menu-toggle]');
  var nav = doc.getElementById('site-nav');
  if (toggle && nav) {
    var focusables = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';
    var lastFocus = null;

    function openMenu() {
      lastFocus = doc.activeElement;
      nav.classList.add('is-open');
      doc.body.classList.add('menu-open');
      toggle.setAttribute('aria-expanded', 'true');
      var first = nav.querySelector(focusables);
      if (first) first.focus();
      doc.addEventListener('keydown', onKey);
    }
    function closeMenu() {
      nav.classList.remove('is-open');
      doc.body.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
      doc.removeEventListener('keydown', onKey);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    function onKey(e) {
      if (e.key === 'Escape') { closeMenu(); return; }
      if (e.key !== 'Tab') return;
      var items = [toggle].concat(Array.prototype.slice.call(nav.querySelectorAll(focusables)));
      var first = items[0], last = items[items.length - 1];
      if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    toggle.addEventListener('click', function () {
      if (toggle.getAttribute('aria-expanded') === 'true') closeMenu(); else openMenu();
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a') && nav.classList.contains('is-open')) closeMenu();
    });
    desktop.addEventListener('change', function (e) { if (e.matches && nav.classList.contains('is-open')) closeMenu(); });
  }

  /* ---------- Hero diagram: pin the finished state so nothing can replay the sequence ---------- */
  var dg = doc.getElementById('hero-diagram');
  if (dg) {
    var node = dg.querySelector('.dg__node');
    var done = function () { dg.classList.add('is-done'); };
    if (dg.classList.contains('is-anim') && node) {
      node.addEventListener('animationend', done, { once: true });
      setTimeout(done, 3500); // safety net if the animation never ran (e.g. tab in background)
    } else { done(); }
  }

  /* ---------- Home header: white after the user scrolls; hero video pauses once covered ---------- */
  var header = doc.querySelector('.home .site-header');
  var hero = doc.querySelector('.hero');
  if (header) {
    var ticking = false;
    function update() {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
      if (hero && heroVideo && heroVideo.classList.contains('is-playing')) {
        if (window.scrollY > hero.offsetHeight) heroVideo.pause(); else heroVideo.play().catch(function () {});
      }
      ticking = false;
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ---------- Hero video: desktop, motion allowed, no data-saver ---------- */
  var video = doc.querySelector('[data-hero-video]');
  heroVideo = video;
  if (video) {
    var conn = navigator.connection || {};
    var allow = desktop.matches && !reduceMotion.matches && !conn.saveData;
    if (allow && video.canPlayType('video/webm')) {
      video.poster = video.getAttribute('data-poster');
      var src = doc.createElement('source');
      src.src = video.getAttribute('data-src');
      src.type = 'video/webm';
      video.appendChild(src);
      video.load();
      var p = video.play();
      if (p && p.then) p.then(function () { video.classList.add('is-playing'); }).catch(function () { /* poster stays */ });
      video.addEventListener('playing', function () { video.classList.add('is-playing'); }, { once: true });
    }
  }

  /* ---------- Consultation form (Web3Forms) ---------- */
  var form = doc.querySelector('[data-consult-form]');
  if (form) {
    var status = form.querySelector('[data-form-status]');
    var button = form.querySelector('button[type="submit"]');
    var phone = (doc.querySelector('.site-nav__phone .ph') || {}).textContent || '';

    function setStatus(kind, text) {
      status.textContent = text;
      status.classList.remove('is-ok', 'is-error');
      status.classList.add(kind === 'ok' ? 'is-ok' : 'is-error');
      status.hidden = false;
    }
    function fieldError(input, msg) {
      var wrap = input.closest('.field');
      var err = wrap.querySelector('.field__error');
      if (!msg) { wrap.classList.remove('is-invalid'); if (err) err.remove(); input.removeAttribute('aria-invalid'); return; }
      wrap.classList.add('is-invalid');
      input.setAttribute('aria-invalid', 'true');
      if (!err) { err = doc.createElement('p'); err.className = 'field__error'; err.id = input.id + '-error'; wrap.appendChild(err); }
      err.textContent = msg;
      input.setAttribute('aria-describedby', err.id);
    }
    function validate() {
      var ok = true, firstBad = null;
      Array.prototype.forEach.call(form.querySelectorAll('[required]'), function (input) {
        var v = input.value.trim(), msg = '';
        if (!v) msg = 'Please fill in your ' + (input.previousElementSibling ? input.previousElementSibling.textContent.toLowerCase() : 'answer') + '.';
        else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) msg = 'That email address does not look complete.';
        else if (input.type === 'tel' && v.replace(/\D/g, '').length < 7) msg = 'Please enter a phone number we can call.';
        fieldError(input, msg);
        if (msg) { ok = false; if (!firstBad) firstBad = input; }
      });
      if (firstBad) firstBad.focus();
      return ok;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.hidden = true;
      if (!validate()) return;
      if (form.querySelector('[name="botcheck"]').checked) return; // honeypot
      button.disabled = true;
      var data = new FormData(form);
      var body = {};
      data.forEach(function (v, k) { body[k] = v; });
      fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(body)
      }).then(function (r) { return r.json().then(function (j) { return { ok: r.ok && j.success, json: j }; }); })
        .then(function (res) {
          if (res.ok) {
            setStatus('ok', 'Request sent. We call back within one business day.');
            form.reset();
          } else {
            setStatus('error', 'We could not send that. Call ' + phone + ' or email us directly, and we will pick it up.');
          }
        })
        .catch(function () {
          setStatus('error', 'We could not send that. Check your connection and try again, or call ' + phone + '.');
        })
        .finally(function () { button.disabled = false; });
    });
  }
})();

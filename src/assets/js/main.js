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
    // plays on phones too (client request); only reduced-motion and data-saver keep the still
    var allow = !reduceMotion.matches && !conn.saveData;
    if (allow) {
      video.poster = video.getAttribute('data-poster');
      var src = doc.createElement('source');
      src.src = video.getAttribute('data-src');
      src.type = 'video/webm';
      video.appendChild(src);
      var hmp4 = video.getAttribute('data-src-mp4');
      if (hmp4) { var hs4 = doc.createElement('source'); hs4.src = hmp4; hs4.type = 'video/mp4'; video.appendChild(hs4); }
      video.load();
      var p = video.play();
      if (p && p.then) p.then(function () { video.classList.add('is-playing'); }).catch(function () { /* poster stays */ });
      video.addEventListener('playing', function () { video.classList.add('is-playing'); }, { once: true });
    }
  }

  /* ---------- Media bands: lazy video on desktop, poster elsewhere ---------- */
  var bands = doc.querySelectorAll('[data-band-video]');
  if (bands.length && !reduceMotion.matches && !(navigator.connection || {}).saveData && 'IntersectionObserver' in window) {
    var loadBand = function (v) {
      if (v.dataset.loaded) return; v.dataset.loaded = '1';
      var mp4 = v.getAttribute('data-src-mp4');
      var s = doc.createElement('source'); s.src = v.getAttribute('data-src'); s.type = 'video/webm';
      var s4 = null;
      if (mp4) { s4 = doc.createElement('source'); s4.src = mp4; s4.type = 'video/mp4'; }
      // desktop: the higher-quality MP4 first; phones: the smaller WebM first, MP4 only as a fallback
      if (s4 && desktop.matches) { v.appendChild(s4); v.appendChild(s); } else { v.appendChild(s); if (s4) v.appendChild(s4); }
      v.load();
      v.addEventListener('playing', function () { v.classList.add('is-playing'); }, { once: true });
    };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var v = en.target;
        if (en.isIntersecting) { loadBand(v); v.play().catch(function () {}); } else { v.pause(); }
      });
    }, { rootMargin: '600px 0px' });
    bands.forEach(function (v) { io.observe(v); });
  }

  /* ---------- Image tabs (Markets) ---------- */
  Array.prototype.forEach.call(doc.querySelectorAll('[data-tabs]'), function (root) {
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
    var panels = Array.prototype.slice.call(root.querySelectorAll('[role="tabpanel"]'));
    function select(i, focus) {
      tabs.forEach(function (t, n) { var on = n === i; t.setAttribute('aria-selected', on ? 'true' : 'false'); t.tabIndex = on ? 0 : -1; panels[n].hidden = !on; });
      if (focus) tabs[i].focus();
    }
    function fromHash() { return panels.findIndex(function (p) { return '#' + p.id === location.hash; }); }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(i); if (history.replaceState) history.replaceState(null, '', '#' + panels[i].id); });
      t.addEventListener('keydown', function (e) {
        var n = i;
        if (e.key === 'ArrowRight') n = (i + 1) % tabs.length; else if (e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === 'Home') n = 0; else if (e.key === 'End') n = tabs.length - 1; else return;
        e.preventDefault(); select(n, true);
      });
    });
    var start = fromHash(); select(start >= 0 ? start : 0);
    window.addEventListener('hashchange', function () { var n = fromHash(); if (n >= 0) { select(n); root.scrollIntoView({ block: 'start' }); } });
  });

  /* ---------- YouTube facade ---------- */
  Array.prototype.forEach.call(doc.querySelectorAll('[data-yt]'), function (box) {
    var btn = box.querySelector('button');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var f = doc.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + box.getAttribute('data-yt') + '?autoplay=1&rel=0';
      f.title = btn.getAttribute('data-title') || 'Video';
      f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      f.setAttribute('allowfullscreen', '');
      box.replaceChild(f, btn);
    });
  });

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

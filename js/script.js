/* ============================================================
   BHAVYA JAIN — AI Builder × Web Developer
   Interactions: render config, nav, cursor, island, modal,
   reveal, github (cached), contact, 3D (lazy, with fallback)
   ============================================================ */
(() => {
  'use strict';

  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const touchDevice = window.matchMedia('(hover: none)').matches;

  /* ---------- render personal data ---------- */
  const escapeHtml = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  // status + intro
  const statusPillEl = $('.status-pill');
  statusPillEl.innerHTML =
    '<span class="status-dot" aria-hidden="true"></span>' + escapeHtml(portfolio.status);
  $('#heroIntro').textContent = portfolio.intro;

  // about
  $('#aboutBio').innerHTML = portfolio.bio
    .map((p) => '<p>' + escapeHtml(p) + '</p>').join('');
  const tl = portfolio.experience;
  $('#aboutTimeline').innerHTML =
    '<p class="tl-period">' + escapeHtml(tl.period) + '</p>' +
    '<p class="tl-role">' + escapeHtml(tl.role) + '</p>' +
    '<p class="tl-detail">' + escapeHtml(tl.detail) + '</p>';

  // exploring chips
  $('#exploringChips').innerHTML = portfolio.exploring
    .map((c) => '<li>' + escapeHtml(c) + '</li>').join('');

  /* ---------- work list ---------- */
  const arrowSvg =
    '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7m0 0H8m9 0v9"/></svg>';
  $('#workList').innerHTML = portfolio.projects.map((p, i) => {
    const chips = p.technologies
      .map((t) => '<span>' + escapeHtml(t) + '</span>').join('');
    return (
      '<li class="work-item reveal" data-delay="' + (i % 3) + '">' +
        '<article class="work-card">' +
          '<span class="work-light" aria-hidden="true"></span>' +
          '<span class="work-idx" aria-hidden="true">' + String(i + 1).padStart(2, '0') + '</span>' +
          '<div class="work-main">' +
            '<h3 class="work-title">' + escapeHtml(p.title) + '</h3>' +
            '<p class="work-cat">' + escapeHtml(p.category) + '</p>' +
            '<p class="work-desc">' + escapeHtml(p.description) + '</p>' +
          '</div>' +
          '<ul class="work-chips" aria-label="Technologies for ' + escapeHtml(p.title) + '">' + chips + '</ul>' +
          '<span class="work-arrow" aria-hidden="true">' + arrowSvg + '</span>' +
          '<button class="work-row" type="button" data-open="' + i + '" data-cursor aria-haspopup="dialog" aria-label="Open case study for ' + escapeHtml(p.title) + '"></button>' +
        '</article>' +
      '</li>'
    );
  }).join('');

  // cursor-following light on rows (desktop only)
  if (finePointer && !reduced) {
    $$('.work-row').forEach((row) => {
      row.addEventListener('pointermove', (e) => {
        const r = row.getBoundingClientRect();
        row.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        row.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  /* ---------- project modal ---------- */
  const modal = $('#projectModal');
  let lastFocus = null;
  const modalBody = $('#modalBody');

  function buildCase(p) {
    const tech = p.technologies
      .map((t) => '<span>' + escapeHtml(t) + '</span>').join('');
    const link = (label, url, icon) =>
      url
        ? '<a class="btn btn-primary" href="' + escapeHtml(url) + '" target="_blank" rel="noopener" data-cursor>' + label + ' ' + icon + '</a>'
        : '<span class="link-na">' + label + ' \u00b7 Coming soon</span>';
    return (
      '<p class="modal-eyebrow">Case Study \u00b7 ' + escapeHtml(p.status || '') + '</p>' +
      '<h2 class="modal-title">' + escapeHtml(p.title) + '</h2>' +
      '<p class="modal-cat">' + escapeHtml(p.category) + '</p>' +
      '<div class="modal-preview" role="img" aria-label="Abstract preview placeholder for ' + escapeHtml(p.title) + '">Project Preview</div>' +
      '<p class="modal-desc">' + escapeHtml(p.description) + '</p>' +
      '<ol class="case-list">' +
        '<li class="case-item"><h4><em>01</em> Problem</h4><p>Case study details are being prepared and will be added here when the project ships.</p></li>' +
        '<li class="case-item"><h4><em>02</em> Approach</h4><p>Being documented while the project is in active development.</p></li>' +
        '<li class="case-item"><h4><em>03</em> Build</h4><p>In progress \u2014 updates will land here as milestones complete.</p></li>' +
        '<li class="case-item"><h4><em>04</em> Technology</h4><div class="modal-tech">' + tech + '</div></li>' +
        '<li class="case-item"><h4><em>05</em> Result</h4><p>Result data coming soon.</p></li>' +
      '</ol>' +
      '<div class="modal-links">' +
        link('View Project', p.demo, '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7m0 0H8m9 0v9"/></svg>') +
        link('GitHub', p.github, '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 19c-4.3 1.2-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></svg>') +
      '</div>'
    );
  }

  function openModal(i) {
    const p = portfolio.projects[i];
    if (!p) return;
    lastFocus = document.activeElement;
    modalBody.innerHTML = buildCase(p);
    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add('open'));
    document.body.style.overflow = 'hidden';
    const closeBtn = $('.modal-close', modal);
    closeBtn.focus();
  }
  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { modal.hidden = true; }, 320);
    if (lastFocus) lastFocus.focus();
  }
  $('#workList').addEventListener('click', (e) => {
    const row = e.target.closest('[data-open]');
    if (row) openModal(Number(row.dataset.open));
  });
  $$('[data-modal-close]').forEach((el) => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });
  // focus trap
  modal.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || modal.hidden) return;
    const focusables = $$('a[href], button, input, textarea, [tabindex]', modal)
      .filter((el) => !el.hasAttribute('hidden') && el.offsetParent !== null);
    if (!focusables.length) return;
    const first = focusables[0], lastEl = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastEl.focus(); }
    else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); first.focus(); }
  });

  /* ---------- stack radial ---------- */
  const orbit = $('#stackOrbit');
  const itemsWrap = $('#stackItems');
  const readoutName = $('#stackReadoutName');
  const readoutNote = $('#stackReadoutNote');
  itemsWrap.innerHTML = portfolio.skills.map((s, i) =>
    '<li><button class="stack-item" data-skill="' + i + '" data-cursor style="--i:' + i + '">' +
      escapeHtml(s.name) + '</button></li>'
  ).join('');
  const items = $$('.stack-item', orbit);

  function placeStack() {
    const r = orbit.clientWidth / 2;
    const rx = r * 0.82, ry = r * 0.8;
    items.forEach((el, i) => {
      const a = (-90 + i * (360 / items.length)) * Math.PI / 180;
      const x = 50 + (rx / orbit.clientWidth * 100) * Math.cos(a);
      const y = 50 + (ry / orbit.clientHeight * 100) * Math.sin(a);
      el.style.setProperty('--x', x.toFixed(2));
      el.style.setProperty('--y', y.toFixed(2));
    });
  }
  placeStack();
  window.addEventListener('resize', () => requestAnimationFrame(placeStack));

  function showSkill(i) {
    const s = portfolio.skills[i];
    if (!s) return;
    readoutName.textContent = s.name;
    readoutNote.textContent = s.note;
  }
  items.forEach((el, i) => {
    const activate = () => {
      items.forEach((o) => o.classList.remove('active'));
      el.classList.add('active');
      showSkill(i);
    };
    el.addEventListener('mouseenter', activate);
    el.addEventListener('focus', activate);
    el.addEventListener('click', () => {
      if (touchDevice) {
        const isActive = el.classList.contains('active');
        items.forEach((o) => o.classList.remove('active'));
        if (!isActive) { el.classList.add('active'); showSkill(i); }
        else { readoutName.textContent = 'Hover or tap a skill'; readoutNote.textContent = 'A short note about how I use it.'; }
      }
    });
  });

  /* ---------- GitHub (live API, cached, no tokens, fallback) ---------- */
  const osGrid = $('#osGrid');
  const CACHE_KEY = 'bj_gh_repos_v1';
  const CACHE_TTL = 60 * 60 * 1000; // 1h

  function repoCard(r) {
    const desc = r.description || 'Public repository \u2014 no description yet.';
    return (
      '<a class="os-card glass reveal" href="' + escapeHtml(r.html_url || r.url) + '" target="_blank" rel="noopener" data-cursor>' +
        '<div class="os-card-head">' +
          '<span class="os-card-name">' + escapeHtml(r.name) + '</span>' +
          '<span class="os-card-url" aria-hidden="true"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7m0 0H8m9 0v9"/></svg></span>' +
        '</div>' +
        '<p class="os-card-desc">' + escapeHtml(desc) + '</p>' +
        '<div class="os-card-foot">' +
          '<span class="' + (r.language ? '' : 'lt') + ' os-lang">' + escapeHtml(r.language || 'repo') + '</span>' +
          '<span class="os-state">Public repo</span>' +
        '</div>' +
      '</a>'
    );
  }

  function renderRepos(list) {
    if (!list.length) {
      osGrid.innerHTML = '<p class="os-note">No public repositories yet \u2014 check back soon.</p>';
      return;
    }
    osGrid.innerHTML = list.map(repoCard).join('');
    ioReveal.observeAll();
  }

  function loadGitHub() {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { ts, repos } = JSON.parse(cached);
        if (Date.now() - ts < CACHE_TTL && Array.isArray(repos)) {
          renderRepos(repos);
          return;
        }
      }
    } catch (_) { /* cache unavailable -> fetch fresh */ }
    fetch('https://api.github.com/users/' + encodeURIComponent(portfolio.githubUser) + '/repos?sort=updated&per_page=6', {
      headers: { Accept: 'application/vnd.github+json' }
    })
      .then((res) => {
        if (!res.ok) throw new Error('GitHub API ' + res.status);
        return res.json();
      })
      .then((repos) => {
        const clean = (repos || []).map((r) => ({
          name: r.name, description: r.description, language: r.language,
          html_url: r.html_url
        }));
        renderRepos(clean);
        try { localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), repos: clean })); } catch (_) {}
      })
      .catch(() => renderRepos(portfolio.githubFallback));
  }
  loadGitHub();

  /* ---------- email + footer links ---------- */
  const emailOk = portfolio.email && portfolio.email !== 'YOUR_EMAIL_HERE';
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'status');
  document.body.appendChild(toast);
  let toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  }
  function wireEmail(link) {
    if (emailOk) { link.href = 'mailto:' + portfolio.email; return; }
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Email not configured \u2014 add yours in js/data.js (email field)');
    });
  }
  wireEmail($('#emailBtn'));
  wireEmail($('#footerEmail'));

  // frontend-only contact form -> composes an email (no backend)
  $('#contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!emailOk) {
      showToast('Email not configured \u2014 add yours in js/data.js (email field)');
      return;
    }
    const name = $('#cfName').value.trim();
    const from = $('#cfEmail').value.trim();
    const msg = $('#cfMessage').value.trim();
    if (!name || !msg) { showToast('Please add your name and a message.'); return; }
    const subject = encodeURIComponent('Portfolio inquiry from ' + name);
    const body = encodeURIComponent(msg + (from ? '\n\nReply to: ' + from : ''));
    window.location.href = 'mailto:' + portfolio.email + '?subject=' + subject + '&body=' + body;
  });

  /* ---------- nav: scroll state, burger, active section ---------- */
  const nav = $('.nav');
  const burger = $('#navBurger');
  const navLinks = $('#navLinks');
  const navAnchors = $$('.nav-links a');
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 30), { passive: true });
  function closeMenu() {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }
  burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  });
  navAnchors.forEach((a) => a.addEventListener('click', closeMenu));

  const sectionMap = { work: 0, about: 1, stack: 2, contact: 3 };
  const scrollSpy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      navAnchors.forEach((a) => a.classList.remove('active'));
      const idx = sectionMap[en.target.id];
      if (idx != null && navAnchors[idx]) navAnchors[idx].classList.add('active');
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  ['work', 'about', 'stack', 'contact'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) scrollSpy.observe(el);
  });

  /* ---------- mobile island ---------- */
  const island = $('#island');
  $('#islandTrigger').addEventListener('click', () => {
    const open = island.classList.toggle('expanded');
    $('#islandTrigger').setAttribute('aria-expanded', String(open));
  });
  $$('.island-item').forEach((a) => a.addEventListener('click', () => {
    island.classList.remove('expanded');
    $('#islandTrigger').setAttribute('aria-expanded', 'false');
  }));

  /* ---------- reveal on scroll ---------- */
  const revealEls = [];
  const ioReveal = {
    observer: new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('visible');
          ioReveal.observer.unobserve(en.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }),
    observeAll() {
      $$('.reveal:not(.inited)').forEach((el) => {
        el.classList.add('inited');
        revealEls.push(el);
        ioReveal.observer.observe(el);
      });
    }
  };
  ioReveal.observeAll();

  /* ---------- custom cursor (desktop + precise pointer only) ---------- */
  if (finePointer && !reduced) {
    const cursor = $('#cursor');
    document.body.classList.add('cursor-live');
    let mx = innerWidth / 2, my = innerHeight / 2;
    let dotX = mx, dotY = my, ringX = mx, ringY = my;
    let raf = null;
    document.addEventListener('pointermove', (e) => {
      mx = e.clientX; my = e.clientY;
      if (!raf) raf = requestAnimationFrame(move);
    }, { passive: true });
    function move() {
      dotX += (mx - dotX) * 0.9;
      ringX += (mx - ringX) * 0.18;
      dotY += (my - dotY) * 0.9;
      ringY += (my - ringY) * 0.18;
      $('.cursor-dot', cursor).style.transform = 'translate(' + dotX + 'px,' + dotY + 'px)';
      $('.cursor-ring', cursor).style.transform = 'translate(' + ringX + 'px,' + ringY + 'px)';
      raf = null;
    }
    document.addEventListener('pointerdown', () => cursor.classList.add('press'));
    document.addEventListener('pointerup', () => cursor.classList.remove('press'));
    document.addEventListener('pointerover', (e) => {
      cursor.classList.toggle('hover', !!e.target.closest('a, button, .stack-item, [data-cursor]'));
    });
  } else {
    $('#cursor').remove();
  }

  /* ---------- year ---------- */
  $('#year').textContent = new Date().getFullYear();

  /* ==========================================================
     3D HERO — lazy-loaded Three.js with CSS orb fallback
     ========================================================== */
  const stage = $('#heroStage');
  const canvas = $('#orbWebgl');
  const isMobile = window.innerWidth < 768;

  function webglAvailable() {
    try {
      const c = document.createElement('canvas');
      return !!(window.WebGLRenderingContext &&
        (c.getContext('webgl') || c.getContext('experimental-webgl')));
    } catch (_) { return false; }
  }

  // Skip WebGL for reduced-motion users -> static CSS orb remains
  const should3D = !reduced && webglAvailable();

  if (should3D) {
    // Lazy-load three.js only when the hero actually approaches the viewport
    let threeLoaded = false;
    const heroIO = new IntersectionObserver((entries) => {
      const visible = entries.some((en) => en.isIntersecting);
      if (visible && !threeLoaded) {
        threeLoaded = true;
        const s = document.createElement('script');
        s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        s.async = true;
        s.onload = initOrb3D;
        s.onerror = () => { threeLoaded = false; }; // retry on next intersection
        document.head.appendChild(s);
      }
    }, { rootMargin: '200px 0px' });
    heroIO.observe(stage);
  }

  let renderer3D = null;

  function initOrb3D() {
    if (!window.THREE || !stage.isConnected) return;
    const W = stage.clientWidth;
    const H = stage.clientHeight;
    if (W < 40 || H < 40) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
    camera.position.z = 5.4;

    renderer3D = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: !isMobile, powerPreference: 'high-performance' });
    const dprCap = isMobile ? 1.5 : 2;
    renderer3D.setPixelRatio(Math.min(window.devicePixelRatio || 1, dprCap));
    renderer3D.setSize(W, H, false);

    // Low detail on mobile / low-power devices
    const low = isMobile || (navigator.hardwareConcurrency || 8) <= 4;
    const seg = low ? 28 : 56;

    const group = new THREE.Group();

    // outer glass shell
    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.62, 2),
      new THREE.MeshPhysicalMaterial({
        color: 0xeef0ff, roughness: 0.06, metalness: 0,
        transparent: true, opacity: 0.14,
        clearcoat: 1, clearcoatRoughness: 0.12
      })
    );
    group.add(shell);

    // thin wireframe aura
    const aura = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.75, 1),
      new THREE.MeshBasicMaterial({
        color: 0xa8b2ff, wireframe: true, transparent: true, opacity: 0.08
      })
    );
    group.add(aura);

    // glowing core
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.34, seg, seg),
      new THREE.MeshBasicMaterial({ color: 0xd6daff })
    );
    group.add(core);

    // inner glass bubble around core
    const bubble = new THREE.Mesh(
      new THREE.SphereGeometry(0.62, seg, seg),
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff, roughness: 0.08, metalness: 0,
        transparent: true, opacity: 0.22, clearcoat: 1, clearcoatRoughness: 0.1
      })
    );
    group.add(bubble);

    // orbit rings
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xa8b2ff, transparent: true, opacity: 0.35 });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.15, 0.008, 12, 120), ringMat);
    ring1.rotation.x = Math.PI / 2.35;
    ring1.rotation.z = 0.35;
    group.add(ring1);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.55, 0.005, 12, 120), ringMat.clone());
    ring2.material.opacity = 0.2;
    ring2.rotation.x = Math.PI / 1.8;
    ring2.rotation.z = -0.5;
    group.add(ring2);

    // specular blips on the shell
    const blipMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });
    const blips = [];
    for (let i = 0; i < (low ? 12 : 22); i++) {
      const b = new THREE.Mesh(new THREE.SphereGeometry(0.018, 8, 8), blipMat.clone());
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      b.position.set(
        1.62 * Math.sin(phi) * Math.cos(theta),
        1.62 * Math.sin(phi) * Math.sin(theta),
        1.62 * Math.cos(phi)
      );
      b.material.opacity = 0.25 + Math.random() * 0.4;
      group.add(b);
      blips.push(b);
    }

    // lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(4, 6, 5);
    scene.add(key);
    const violet = new THREE.PointLight(0x8b7cf6, 1.4, 12);
    violet.position.set(-4, -2, 3.5);
    scene.add(violet);
    const accent = new THREE.PointLight(0xa8b2ff, 0.8, 10);
    accent.position.set(3, 3, -2);
    scene.add(accent);

    scene.add(group);

    // idle float + pointer parallax
    const pointer = { x: 0, y: 0 };
    let parallax = { x: 0, y: 0 };
    if (finePointer) {
      document.addEventListener('pointermove', (e) => {
        pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
        pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
      }, { passive: true });
    }

    let running = true;
    let hidden = false;
    document.addEventListener('visibilitychange', () => {
      hidden = document.hidden;
    });

    let rafId = null;
    const clock = new THREE.Clock();
    function tick() {
      rafId = requestAnimationFrame(tick);
      if (!running || hidden) return;
      const t = clock.getElapsedTime();

      parallax.x += (pointer.x - parallax.x) * 0.04;
      parallax.y += (pointer.y - parallax.y) * 0.04;

      group.rotation.y = t * 0.16 + parallax.x * 0.35;
      group.rotation.x = Math.sin(t * 0.1) * 0.12 - parallax.y * 0.25;
      group.position.y = Math.sin(t * 0.7) * 0.14;

      core.scale.setScalar(1 + Math.sin(t * 1.6) * 0.08);
      blips.forEach((b, i) => {
        b.material.opacity = 0.25 + 0.4 * (0.5 + 0.5 * Math.sin(t * 2 + i * 1.3));
      });

      renderer3D.render(scene, camera);
    }
    tick();

    // pause when the hero scrolls out of view
    const pauseIO = new IntersectionObserver((entries) => {
      running = entries.some((en) => en.isIntersecting);
      if (running) clock.getDelta(); // avoid jump
    });
    pauseIO.observe(stage);

    // resize
    let resizeRaf = null;
    function resize() {
      const w = stage.clientWidth, h = stage.clientHeight;
      if (w < 40 || h < 40) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer3D.setSize(w, h, false);
    }
    window.addEventListener('resize', () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(resize);
    });
  }
})();
})();
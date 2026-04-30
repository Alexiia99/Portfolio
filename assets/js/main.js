// =================================================================
// Portfolio Alexia Herrador — main.js  v2
// Modules: nav · scroll · typewriter · counters · filters · ripple
// =================================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Utils ────────────────────────────────────────────────────────
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  const throttle = (fn, ms) => {
    let last = 0;
    return (...args) => {
      const now = Date.now();
      if (now - last >= ms) { last = now; fn(...args); }
    };
  };
  const debounce = (fn, ms) => {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
  };

  // ── Navbar ───────────────────────────────────────────────────────
  const initNav = () => {
    const nav = $('#navbar');
    if (!nav) return;

    window.addEventListener('scroll', throttle(() => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }, 16));
  };

  // ── Smooth scrolling ─────────────────────────────────────────────
  const initSmoothScroll = () => {
    $$('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = $(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offset = ($('#navbar')?.offsetHeight ?? 64) + 16;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
        if (mobileState.open) toggleMobile();
      });
    });
  };

  // ── Mobile menu ──────────────────────────────────────────────────
  const mobileState = { open: false };
  const mobileBtn = $('#mobileMenuBtn');
  const mobileNav = $('#mobileNav');

  const toggleMobile = () => {
    mobileState.open = !mobileState.open;
    mobileBtn?.classList.toggle('active', mobileState.open);
    mobileNav?.classList.toggle('active', mobileState.open);
    document.body.style.overflow = mobileState.open ? 'hidden' : '';
  };

  const initMobile = () => {
    mobileBtn?.addEventListener('click', toggleMobile);

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileState.open) toggleMobile();
    });

    $$('.mobile-nav-links a').forEach(a => {
      a.addEventListener('click', () => setTimeout(toggleMobile, 180));
    });

    window.addEventListener('resize', debounce(() => {
      if (window.innerWidth > 768 && mobileState.open) toggleMobile();
    }, 220));
  };

  // ── Language toggle ──────────────────────────────────────────────
  const initLang = () => {
    const btns = $$('.lang-btn');
    if (!btns.length) return;

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        document.documentElement.lang = lang;
        btns.forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
        // Restart typewriter with new lang
        startTypewriter();
      });
    });
  };

  // ── Typewriter ───────────────────────────────────────────────────
  let twTimer;
  const roles = {
    es: ['Software Developer', 'Android Dev', 'AI & Data Engineer', 'Backend Developer', 'Builder de cosas útiles'],
    en: ['Software Developer', 'Android Dev', 'AI & Data Engineer', 'Backend Developer', 'Builder of useful things'],
  };

  const startTypewriter = () => {
    clearTimeout(twTimer);
    const el = $('#typewriter');
    if (!el) return;

    const lang = document.documentElement.lang || 'es';
    const list = roles[lang] ?? roles.es;
    let i = 0, ci = 0, del = false;
    el.textContent = '';

    const tick = () => {
      const word = list[i];
      if (!del) {
        ci++;
        el.textContent = word.slice(0, ci);
        if (ci === word.length) { del = true; twTimer = setTimeout(tick, 2000); }
        else twTimer = setTimeout(tick, 85);
      } else {
        ci--;
        el.textContent = word.slice(0, ci);
        if (ci === 0) { del = false; i = (i + 1) % list.length; twTimer = setTimeout(tick, 320); }
        else twTimer = setTimeout(tick, 48);
      }
    };
    twTimer = setTimeout(tick, 700);
  };

  // ── Scroll reveal (IntersectionObserver) ─────────────────────────
  const initReveal = () => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        io.unobserve(entry.target);

        // Trigger skill bars when skills section becomes visible
        if (entry.target.classList.contains('skills-grid')) animateBars();
        // Trigger counters when stat section becomes visible
        if (entry.target.classList.contains('stats-detailed')) animateCounters();
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    $$('.fade-in').forEach(el => io.observe(el));
    $$('.skills-grid, .stats-detailed').forEach(el => io.observe(el));
  };

  // ── Skill bars ───────────────────────────────────────────────────
  const animateBars = () => {
    $$('.skill-bar').forEach((bar, i) => {
      const level = bar.dataset.level;
      if (!level) return;
      setTimeout(() => { bar.style.width = level + '%'; }, i * 90);
    });
  };

  // ── Animated counters ────────────────────────────────────────────
  const animateCounters = () => {
    $$('.stat-number').forEach(el => {
      if (el.dataset.animated) return;
      el.dataset.animated = '1';

      const original = el.textContent.trim();
      const num = parseInt(original.replace(/\D/g, ''));
      if (!num) return;

      const suffix = original.replace(/[\d,]/g, '');
      let current = 0;
      const step  = num / 60;
      const timer = setInterval(() => {
        current = Math.min(current + step, num);
        el.textContent = Math.floor(current) + suffix;
        if (current >= num) clearInterval(timer);
      }, 20);
    });
  };

  // ── Filter buttons (skills & projects) ───────────────────────────
  const initFilters = (filterSel, cardSel) => {
    const filters = $$(filterSel);
    const cards   = $$(cardSel);
    if (!filters.length) return;

    filters.forEach(btn => {
      btn.addEventListener('click', () => {
        filters.forEach(f => f.classList.remove('active'));
        btn.classList.add('active');

        const val = btn.dataset.filter;
        cards.forEach((card, i) => {
          const match = val === 'all' || card.dataset.category === val;
          card.classList.toggle('hidden', !match);
          if (match) {
            card.style.animation = 'none';
            card.offsetHeight; // reflow
            card.style.animation = `fadeInUp .45s ${i * 45}ms var(--ease-out) both`;
          }
        });
      });
    });
  };

  // ── Ripple effect ────────────────────────────────────────────────
  const initRipple = () => {
    $$('.btn, .contact-btn, .mobile-nav-links a').forEach(el => {
      el.addEventListener('click', function (e) {
        const r = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        Object.assign(r.style, {
          position: 'absolute',
          width: size + 'px', height: size + 'px',
          left: e.clientX - rect.left - size / 2 + 'px',
          top:  e.clientY - rect.top  - size / 2 + 'px',
          background: 'rgba(255,255,255,.25)',
          borderRadius: '50%',
          transform: 'scale(0)',
          animation: 'ripplePop .55s ease-out forwards',
          pointerEvents: 'none',
        });
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(r);
        setTimeout(() => r.remove(), 560);
      });
    });
  };

  // Inject ripple keyframe if not already in CSS
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = '@keyframes ripplePop{to{transform:scale(2.8);opacity:0}}';
  document.head.appendChild(rippleStyle);

  // ── Lazy images ──────────────────────────────────────────────────
  const initLazy = () => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const img = e.target;
        if (img.dataset.src) { img.src = img.dataset.src; delete img.dataset.src; }
        io.unobserve(img);
      });
    });
    $$('img[data-src]').forEach(img => io.observe(img));
  };

  // ── Copy email ───────────────────────────────────────────────────
  window.copyEmail = () => {
    const email = 'alexiahj111@gmail.com';
    navigator.clipboard?.writeText(email)
      .then(() => toast('📧 Email copiado al portapapeles'))
      .catch(() => {
        const ta = Object.assign(document.createElement('textarea'), { value: email });
        document.body.append(ta); ta.select(); document.execCommand('copy'); ta.remove();
        toast('📧 Email copiado al portapapeles');
      });
  };

  // ── Toast notification ───────────────────────────────────────────
  window.toast = (msg, type = 'success') => {
    const colors = { success: '#2E6147', error: '#C0392B', info: '#1A5276' };
    const el = document.createElement('div');
    Object.assign(el.style, {
      position: 'fixed', top: '1.2rem', right: '1.2rem',
      background: colors[type] ?? colors.success,
      color: '#fff', padding: '.9rem 1.6rem',
      borderRadius: '10px', fontWeight: '600', fontSize: '.9rem',
      boxShadow: '0 10px 30px rgba(0,0,0,.18)',
      transform: 'translateX(110%)', transition: 'transform .35s cubic-bezier(.175,.885,.32,1.275)',
      zIndex: '9999', maxWidth: '300px',
    });
    el.textContent = msg;
    document.body.append(el);
    requestAnimationFrame(() => { el.style.transform = 'none'; });
    setTimeout(() => {
      el.style.transform = 'translateX(110%)';
      setTimeout(() => el.remove(), 380);
    }, 3000);
  };

  // ── Performance: slow connection ─────────────────────────────────
  const initPerfHints = () => {
    const conn = navigator?.connection;
    if (conn?.effectiveType === 'slow-2g' || conn?.effectiveType === '2g') {
      document.body.classList.add('reduced-motion');
    }
    if (window.performance) {
      window.addEventListener('load', () => {
        const t = performance.timing;
        console.log(`🚀 Cargado en ${t.loadEventEnd - t.navigationStart}ms`);
      });
    }
  };

  // ── Init ─────────────────────────────────────────────────────────
  try {
    initNav();
    initSmoothScroll();
    initMobile();
    initLang();
    startTypewriter();
    initReveal();
    initFilters('.skills-filters .filter-btn', '.skill-card');
    initFilters('.projects-filter .filter-btn', '.project-card');
    initRipple();
    initLazy();
    initPerfHints();
    console.log('✅ Portfolio v2 listo');
  } catch (err) {
    console.error('❌ Error init:', err);
  }

});

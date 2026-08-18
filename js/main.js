/* ═══════════════════════════════════════
   Qnity Intern — Corporate Project 2026
   main.js
   ═══════════════════════════════════════ */

/* ── Lightbox ── */
function openLightbox(el) {
  const img = el.querySelector('img');
  if (!img) return;
  document.getElementById('lightbox-img').src = img.src;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

// ESC 鍵也可以關閉燈箱
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

/* ── 手機版選單開關 ── */
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // 點選任一連結後自動關閉選單
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
});

/* ── Scroll Fade-in Animation（每次滑入畫面都會重新播放） ── */
document.addEventListener('DOMContentLoaded', () => {
  const fadeEls = document.querySelectorAll(
    '.value-item, .game-card, .ty-card, .team-member, .gallery-item, ' +
    '.section-label, .section-title, .section-desc, .design-intro, .stats-row'
  );

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      } else {
        entry.target.style.opacity = '0';
        entry.target.style.transform = 'translateY(20px)';
      }
    });
  }, { threshold: 0.12 });

  fadeEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    observer.observe(el);
  });
});

/* ── Active Nav Link Highlight ── */
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(
          `.nav-links a[href="#${entry.target.id}"]`
        );
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(section => navObserver.observe(section));
});

/* ── Nav Shadow + Back-to-Top Visibility + Hero Parallax on Scroll ── */
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav');
  const backToTop = document.getElementById('back-to-top');
  const heroDecos = document.querySelectorAll('.hero-deco');

  const onScroll = () => {
    const y = window.scrollY;

    if (y > 20) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');

    if (y > window.innerHeight * 0.6) backToTop.classList.add('show');
    else backToTop.classList.remove('show');

    heroDecos.forEach((el, i) => {
      const speed = i === 0 ? 0.15 : 0.25;
      el.style.transform = `translateY(${y * speed}px)`;
    });
  };

  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});

/* ── Divider／長條圖／圓餅圖 Grow-in Animation（每次滑入畫面都會重新播放） ── */
document.addEventListener('DOMContentLoaded', () => {
  const growEls = document.querySelectorAll('.divider, .bar-row, .donut-wrap');

  const growObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('grow');
      else entry.target.classList.remove('grow');
    });
  }, { threshold: 0.4 });

  growEls.forEach(el => growObserver.observe(el));
});

/* ── Stats Count-up Animation（每次滑入畫面都會重新播放） ── */
document.addEventListener('DOMContentLoaded', () => {
  const statNums = document.querySelectorAll('.stat-num[data-target]');
  const runningTicks = new WeakMap();

  const statObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const el = entry.target;

      if (!entry.isIntersecting) {
        el.textContent = '0';
        return;
      }

      const target = parseInt(el.dataset.target, 10);
      const duration = 900;
      const startTime = performance.now();
      const tickId = Symbol();
      runningTicks.set(el, tickId);

      function tick(now) {
        if (runningTicks.get(el) !== tickId) return; // 被下一次觸發取代，停止舊的動畫
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => statObserver.observe(el));
});

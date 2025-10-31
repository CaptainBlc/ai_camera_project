/* Main interactions: theme toggle, nav, reveal */
(function() {
  const docEl = document.documentElement;

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    docEl.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const icon = document.querySelector('#themeToggle i');
    if (icon) icon.className = theme === 'dark' ? 'ri-moon-line' : 'ri-sun-line';
    const meta = document.querySelector('meta[name="theme-color"][media*="prefers-color-scheme: dark"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0f172a' : '#ffffff');
  }

  function initTheme() {
    const saved = localStorage.getItem('theme');
    applyTheme(saved || getSystemTheme());
  }

  function initNav() {
    const btn = document.querySelector('.nav-toggle');
    const list = document.querySelector('.nav-list');
    if (!btn || !list) return;
    btn.addEventListener('click', () => list.classList.toggle('open'));
    list.querySelectorAll('a').forEach(a => a.addEventListener('click', () => list.classList.remove('open')));
  }

  // No CTA buttons on the hero; email/jury links removed per spec

  function initReveal() {
    const revealables = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window) || revealables.length === 0) {
      revealables.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const target = entry.target;
        const delay = Number(target.getAttribute('data-reveal-delay') || 0);
        if (entry.isIntersecting) {
          setTimeout(() => target.classList.add('is-visible'), delay);
          io.unobserve(target);
        }
      });
    }, { threshold: 0.15 });
    revealables.forEach(el => io.observe(el));
  }

  function initStagger() {
    const parent = document.querySelector('[data-reveal="stagger"]');
    if (!parent) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const children = parent.children;
        Array.from(children).forEach((el, idx) => {
          setTimeout(() => el.classList.add('is-visible'), idx * 70);
        });
        io.disconnect();
      });
    }, { threshold: 0.15 });
    io.observe(parent);
  }

  function bindThemeToggle() {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }

  function initYear() {
    const y = document.getElementById('year');
    if (y) y.textContent = String(new Date().getFullYear());
  }

  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    bindThemeToggle();
    initNav();
    initYear();
    initReveal();
    initStagger();
  });
})();
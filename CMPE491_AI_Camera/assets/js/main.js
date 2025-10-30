/* Main interactions: theme toggle, nav, reveal, CTAs */
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

  function buildMailTo() {
    const subject = 'JÃ¼ri Daveti - Yapay Zeka TabanlÄ± GÃ¶rÃ¼ntÃ¼ Ä°yileÅŸtirme Projesi';
    const body = [
      'Merhaba,',
      '',
      'Bitirme projemiz kapsamÄ±nda jÃ¼ri olarak katkÄ±nÄ±zÄ± deÄŸerlendirmek isteriz.',
      'Proje: Yapay Zeka TabanlÄ± GÃ¶rÃ¼ntÃ¼ Ä°yileÅŸtirme ve Ä°ÅŸleme Sistemi',
      'Ã–ne Ã§Ä±kanlar: DÃ¼ÅŸÃ¼k Ä±ÅŸÄ±k iyileÅŸtirme, sÃ¼per Ã§Ã¶zÃ¼nÃ¼rlÃ¼k, adaptif Ã¶ÄŸrenme, enerji verimliliÄŸi.',
      '',
      'Uygun olduÄŸunuz tarihleri iletirseniz Ã§ok seviniriz.',
      '',
      'SaygÄ±larÄ±mÄ±zla,',
      'AI Vision Ekibi'
    ].join('%0D%0A');
    return `mailto:info@example.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  }

  function initCtas() {
    const jury = document.getElementById('juryBtn');
    const mail = document.getElementById('mailtoCta');
    const href = buildMailTo();
    if (jury) jury.setAttribute('href', href);
    if (mail) mail.setAttribute('href', href);
  }

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
    initCtas();
    initYear();
    initReveal();
    initStagger();
  });
})();
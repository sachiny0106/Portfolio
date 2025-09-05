document.addEventListener('DOMContentLoaded', () => {
  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);

  const isCoarse = matchMedia('(pointer: coarse)').matches;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Subtle custom cursor
  const cursor = $('.cursor');
  if (!isCoarse && cursor) {
    let x = 0, y = 0, raf = 0;
    function draw(){ cursor.style.left = `${x}px`; cursor.style.top = `${y}px`; raf = 0; }
    function move(e){ x = e.clientX; y = e.clientY; if(!raf) raf = requestAnimationFrame(draw); }
    document.addEventListener('mousemove', move, { passive: true });

    const hoverSel = 'a, button, input, textarea, select, label, [role="button"]';
    document.addEventListener('pointerover', e => { if (e.target.closest(hoverSel)) cursor.classList.add('cursor--grow'); });
    document.addEventListener('pointerout',  e => { if (e.target.closest(hoverSel)) cursor.classList.remove('cursor--grow'); });

    const typingSel = 'input, textarea, [contenteditable="true"]';
    $$(typingSel).forEach(el => {
      el.addEventListener('focus', () => document.body.classList.add('is-typing'));
      el.addEventListener('blur',  () => document.body.classList.remove('is-typing'));
    });

    if (reduceMotion) cursor.style.transition = 'none';
  }

  // Reveal-on-scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) en.target.classList.add('visible'); });
  }, { threshold: 0.15 });

  $$('.reveal').forEach(el => {
    if (reduceMotion) el.classList.add('visible');
    else io.observe(el);
  });

  // Theme toggle
  const themeBtn = $('.theme-toggle');
  themeBtn?.addEventListener('click', () => {
    const root = document.documentElement;
    root.classList.toggle('light');
    themeBtn.textContent = root.classList.contains('light') ? '☀️' : '🌙';
  });

  // Mobile nav
  const navBtn = $('.nav-toggle');
  const nav = $('#nav');
  if (navBtn && nav) {
    let open = false;
    navBtn.addEventListener('click', () => {
      open = !open;
      nav.style.display = open ? 'flex' : 'none';
      navBtn.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', e => {
      if (e.target.tagName === 'A' && open) {
        open = false; nav.style.display = 'none';
        navBtn.setAttribute('aria-expanded','false');
      }
    });
  }

  // Footer year
  const y = $('#year');
  if (y) y.textContent = new Date().getFullYear();
});

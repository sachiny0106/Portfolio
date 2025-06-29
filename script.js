document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.querySelector('.cursor');

  // Always update position on mousemove
  document.addEventListener('mousemove', e => {
    cursor.style.top = `${e.pageY}px`;
    cursor.style.left = `${e.pageX}px`;
  });

  // Enlarge on hover over interactive elements
  const hoverTargets = document.querySelectorAll('a, button, input, textarea, img, svg, i, label');

  hoverTargets.forEach(el => {
    el.addEventListener('mouseover', () => {
      cursor.style.width = '40px';
      cursor.style.height = '40px';
      cursor.style.backgroundColor = 'var(--accent-gold)';
    });

    el.addEventListener('mouseout', () => {
      cursor.style.width = '25px';
      cursor.style.height = '25px';
      cursor.style.backgroundColor = 'transparent';
    });
  });

  // Animate on scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  feather.replace();
});

document.addEventListener('DOMContentLoaded', () => {

  feather.replace();

  // 2. Elements
  const navMenu = document.getElementById('nav-menu');
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.getElementById('navbar');

  // 3. Mobile Menu Toggle
  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
      navMenu.classList.add('active');
      menuBtn.innerHTML = '<i data-feather="x"></i>';
      document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    } else {
      navMenu.classList.remove('active');
      menuBtn.innerHTML = '<i data-feather="menu"></i>';
      document.body.style.overflow = '';
    }
    feather.replace();
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', toggleMenu);
  }

  // Close menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (isMenuOpen) toggleMenu();
    });
  });

  // Close menu when clicking outside (optional but good UX)
  document.addEventListener('click', (e) => {
    if (isMenuOpen && !navMenu.contains(e.target) && !menuBtn.contains(e.target)) {
      toggleMenu();
    }
  });

  // 4. Navbar Scroll Effect (Hide/Show on Scroll)
  let lastScrollTop = 0;
  const delta = 5;
  const navbarHeight = navbar.offsetHeight;

  window.addEventListener('scroll', () => {
    const st = window.scrollY;

    // Make navbar shadow appear after scrolling down a bit
    if (st > 0) {
      navbar.style.boxShadow = '0 10px 30px -10px rgba(2,12,27,0.7)';
    } else {
      navbar.style.boxShadow = 'none';
    }

    // Hide/Show Logic
    if (Math.abs(lastScrollTop - st) <= delta) return;

    if (st > lastScrollTop && st > navbarHeight) {
      // Scroll Down
      navbar.style.transform = `translateY(-${navbarHeight}px)`;
    } else {
      // Scroll Up
      navbar.style.transform = 'translateY(0)';
    }
    lastScrollTop = st;
  });

});

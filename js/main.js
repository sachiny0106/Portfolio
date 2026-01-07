/**
 * Portfolio Interactive Features
 * @author Sachin Yadav
 * @version 1.0.0
 * @description Handles navigation, mobile menu, and scroll effects
 */

(function () {
  'use strict';

  // ============================================
  // Configuration
  // ============================================
  const CONFIG = {
    scrollDelta: 5,
    scrollShadow: '0 10px 30px -10px rgba(2,12,27,0.7)'
  };

  // ============================================
  // DOM Elements
  // ============================================
  const DOM = {
    navbar: document.getElementById('navbar'),
    navMenu: document.getElementById('nav-menu'),
    menuBtn: document.querySelector('.menu-btn'),
    navLinks: document.querySelectorAll('.nav-link')
  };

  // ============================================
  // State
  // ============================================
  let state = {
    isMenuOpen: false,
    lastScrollTop: 0
  };

  // ============================================
  // Mobile Menu
  // ============================================
  const MobileMenu = {
    toggle() {
      state.isMenuOpen = !state.isMenuOpen;

      if (state.isMenuOpen) {
        DOM.navMenu.classList.add('active');
        DOM.menuBtn.innerHTML = '<i data-feather="x"></i>';
        document.body.style.overflow = 'hidden';
      } else {
        DOM.navMenu.classList.remove('active');
        DOM.menuBtn.innerHTML = '<i data-feather="menu"></i>';
        document.body.style.overflow = '';
      }

      feather.replace();
    },

    close() {
      if (state.isMenuOpen) {
        this.toggle();
      }
    },

    init() {
      if (!DOM.menuBtn) return;

      // Toggle on button click
      DOM.menuBtn.addEventListener('click', () => this.toggle());

      // Close on nav link click
      DOM.navLinks.forEach(link => {
        link.addEventListener('click', () => this.close());
      });

      // Close on outside click
      document.addEventListener('click', (e) => {
        if (state.isMenuOpen &&
          !DOM.navMenu.contains(e.target) &&
          !DOM.menuBtn.contains(e.target)) {
          this.toggle();
        }
      });
    }
  };

  // ============================================
  // Navbar Scroll Effects
  // ============================================
  const NavbarScroll = {
    init() {
      if (!DOM.navbar) return;

      const navbarHeight = DOM.navbar.offsetHeight;

      window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;

        // Add shadow when scrolled
        DOM.navbar.style.boxShadow = scrollTop > 0 ? CONFIG.scrollShadow : 'none';

        // Hide/show navbar based on scroll direction
        if (Math.abs(state.lastScrollTop - scrollTop) <= CONFIG.scrollDelta) return;

        if (scrollTop > state.lastScrollTop && scrollTop > navbarHeight) {
          // Scrolling down - hide navbar
          DOM.navbar.style.transform = `translateY(-${navbarHeight}px)`;
        } else {
          // Scrolling up - show navbar
          DOM.navbar.style.transform = 'translateY(0)';
        }

        state.lastScrollTop = scrollTop;
      }, { passive: true });
    }
  };

  // ============================================
  // Initialize
  // ============================================
  function init() {
    // Initialize Feather Icons
    if (typeof feather !== 'undefined') {
      feather.replace();
    }

    // Initialize modules
    MobileMenu.init();
    NavbarScroll.init();

    console.log('Portfolio initialized successfully');
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

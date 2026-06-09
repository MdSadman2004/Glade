/* ============================================
   GLADE — Main Orchestration
   Scroll, reveals, dot animation, form, menu
   ============================================ */
(function() {

  /* --- UI Updates via Global Store --- */
  const scrollProgress = document.getElementById('scrollProgress');
  const navbar = document.getElementById('navbar');

  if (window.GladeStore) {
    window.GladeStore.subscribe(state => {
      // Update progress bar
      if (scrollProgress) scrollProgress.style.width = (state.scrollProgress * 100) + '%';
      // Update navbar
      if (navbar) navbar.classList.toggle('nav-scrolled', state.scrollY > 100);
    });
  }

  /* --- Reveal Animations (IntersectionObserver) --- */
  const revealEls = document.querySelectorAll('.reveal-text, .reveal-stagger');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* --- Dot formation now handled by canvas-engine.js --- */

  /* --- Mobile Menu --- */
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileOverlay = document.querySelector('.mobile-overlay');
  if (menuToggle && mobileOverlay) {
    menuToggle.addEventListener('click', () => {
      mobileOverlay.classList.toggle('active');
      menuToggle.classList.toggle('open');
    });
    mobileOverlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileOverlay.classList.remove('active');
        menuToggle.classList.remove('open');
      });
    });
  }

  /* --- Contact Form Submit Animation --- */
  const submitBtn = document.querySelector('#contact .btn-submit');
  if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      submitBtn.classList.add('sent');
      setTimeout(() => {
        submitBtn.classList.remove('sent');
      }, 3000);
    });
  }

  /* --- Ecosystem Carousel Drag-to-Scroll --- */
  const track = document.querySelector('.ecosystems-track');
  if (track) {
    let isDown = false, startX, scrollLeft;
    track.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });
    track.addEventListener('mouseleave', () => isDown = false);
    track.addEventListener('mouseup', () => isDown = false);
    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      track.scrollLeft = scrollLeft - (x - startX) * 1.2;
    });
  }

})();

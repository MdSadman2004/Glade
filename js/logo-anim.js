/* ============================================
   GLADE — Logo Draw-In + Breathing + Parallax
   ============================================ */
(function() {
  function init() {
    const roots = document.querySelectorAll('.logo-roots');
    const core = document.querySelectorAll('.logo-core');
    const halo = document.querySelectorAll('.logo-halo');
    const sprout = document.querySelectorAll('.logo-sprout');
    const heroContent = document.querySelector('.hero-content');
    const logoSvg = document.querySelector('.hero-logo-svg');
    const sunbreak = document.querySelector('.sunbreak-glow');

    setTimeout(() => roots.forEach(el => el.classList.add('animate')), 400);
    setTimeout(() => core.forEach(el => el.classList.add('animate')), 1600);
    setTimeout(() => halo.forEach(el => el.classList.add('animate')), 2800);
    setTimeout(() => {
      sprout.forEach(el => el.classList.add('animate'));
      if (sunbreak) sunbreak.classList.add('active');
    }, 3600);
    setTimeout(() => { if (heroContent) heroContent.classList.add('visible'); }, 4400);
    setTimeout(() => { if (logoSvg) logoSvg.classList.add('breathing'); }, 5200);

    // Per-element parallax depth on scroll
    if (logoSvg) {
      let t = false;
      window.addEventListener('scroll', () => {
        if (!t) { requestAnimationFrame(() => {
          const sy = window.scrollY;
          if (sy < innerHeight * 1.5) {
            const r = logoSvg.querySelector('.logo-roots');
            const c = logoSvg.querySelectorAll('.logo-core');
            const h = logoSvg.querySelector('.logo-halo');
            const s = logoSvg.querySelector('.logo-sprout');
            if (r) r.style.transform = `translateY(${sy * 0.08}px)`;
            c.forEach(el => el.style.transform = `translateY(${sy * 0.04}px)`);
            if (h) h.style.transform = `translateY(${sy * -0.03}px)`;
            if (s) s.style.transform = `translateY(${sy * -0.06}px)`;
          }
          t = false;
        }); t = true; }
      }, { passive: true });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

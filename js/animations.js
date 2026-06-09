/* ============================================
   GLADE — Narrative Animation Engine
   Story-driven motion: char splits, marquee,
   divider activation, timeline glow, parallax
   ============================================ */
(function() {

  /* 1. SPLIT TEXT — Word + Character level */
  document.querySelectorAll('.split-text').forEach(el => {
    const text = el.innerText;
    const charLevel = el.hasAttribute('data-reveal-char');
    el.innerHTML = '';
    if (charLevel) {
      [...text].forEach((ch, i) => {
        if (ch === ' ') { el.appendChild(document.createTextNode(' ')); return; }
        const s = document.createElement('span');
        s.classList.add('split-char');
        s.innerText = ch;
        s.style.transitionDelay = `${i * 0.025}s`;
        el.appendChild(s);
      });
    } else {
      text.split(' ').forEach((w, i) => {
        const s = document.createElement('span');
        s.classList.add('split-word');
        s.innerText = w;
        s.style.transitionDelay = `${i * 0.045}s`;
        el.appendChild(s);
        if (i < text.split(' ').length - 1) el.appendChild(document.createTextNode(' '));
      });
    }
  });

  /* 2. INTERSECTION OBSERVER — All reveals */
  const reveals = document.querySelectorAll(
    '.split-text, .reveal-text, .reveal-up, .reveal-scale, .reveal-left, .reveal-right, .reveal-stagger, .process-step'
  );
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
  reveals.forEach(el => obs.observe(el));

  /* 3. SECTION DIVIDERS — Animate on scroll */
  document.querySelectorAll('.section-divider').forEach(d => {
    new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) d.classList.add('divider-active'); });
    }, { threshold: 0.5 }).observe(d);
  });

  /* 4. MAGNETIC BUTTONS */
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
      const r = this.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.04)`;
    });
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translate(0,0) scale(1)';
    });
  });

  /* 5. 3D TILT CARDS */
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const r = this.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      this.style.transform = `perspective(800px) rotateX(${y*-8}deg) rotateY(${x*8}deg) scale3d(1.03,1.03,1.03)`;
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)';
    });
  });

  /* 6. COUNTER — Spring eased */
  const counters = document.querySelectorAll('.stat-number[data-target]');
  let counted = false;
  const stats = document.getElementById('stats');
  if (stats) {
    new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && !counted) {
          counted = true;
          counters.forEach(c => {
            const target = parseInt(c.dataset.target);
            const start = performance.now(), dur = 2400;
            (function tick(now) {
              const t = Math.min((now - start) / dur, 1);
              const eased = 1 - Math.pow(1 - t, 4);
              c.textContent = Math.round(eased * target);
              if (t < 1) requestAnimationFrame(tick); else c.textContent = target;
            })(start);
          });
        }
      });
    }, { threshold: 0.3 }).observe(stats);
  }

  /* 7. PARALLAX */
  const heroContent = document.querySelector('#hero .hero-content');
  const heroLogo = document.querySelector('.hero-logo-svg');
  const scrollPrompt = document.querySelector('.scroll-prompt');
  const clarityDiamond = document.querySelector('.clarity-diamond');
  let ticking = false;

  function updateParallax() {
    const sy = window.scrollY, vh = window.innerHeight;
    if (heroContent && sy < vh * 1.5) {
      heroContent.style.transform = `translateY(${sy * 0.35}px)`;
      heroContent.style.opacity = Math.max(0, 1 - sy / (vh * 0.55));
    }
    if (heroLogo && sy < vh * 1.5) {
      // Don't override breathing animation transform - use margin instead
      heroLogo.style.marginTop = `${sy * 0.12}px`;
      heroLogo.style.opacity = Math.max(0, 1 - sy / (vh * 0.75));
    }
    if (scrollPrompt && sy < vh) {
      scrollPrompt.style.opacity = Math.max(0, 1 - sy / (vh * 0.2));
    }
    if (clarityDiamond) {
      const r = clarityDiamond.getBoundingClientRect();
      const p = 1 - Math.max(0, Math.min(1, r.top / vh));
      clarityDiamond.style.transform = `scale(${0.6 + p * 0.4})`;
    }
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(updateParallax); ticking = true; }
  }, { passive: true });

  /* 8. NAV GLOW */
  const navInner = document.querySelector('#navbar .nav-inner');
  window.addEventListener('scroll', () => {
    if (!navInner) return;
    const sy = window.scrollY;
    navInner.style.boxShadow = sy > 100
      ? `0 0 40px rgba(var(--life-spring-rgb), ${0.05 + Math.min(1, sy / (innerHeight*3)) * 0.15})`
      : 'none';
  }, { passive: true });

  /* 9. SMOOTH ANCHORS */
  document.querySelectorAll('a[href^="#"]').forEach(l => {
    l.addEventListener('click', function(e) {
      e.preventDefault();
      const t = document.querySelector(this.getAttribute('href'));
      if (t) window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 80, behavior: 'smooth' });
    });
  });

  /* 10. ANATOMY COL STAGGER */
  document.querySelectorAll('.anatomy-col').forEach((c, i) => { c.style.transitionDelay = `${i*0.15}s`; });

  /* 11. ECO CARD SCROLL SNAP */
  const track = document.querySelector('.ecosystems-track');
  if (track) {
    const cards = track.querySelectorAll('.eco-card');
    function updateFocus() {
      const center = track.getBoundingClientRect().left + track.offsetWidth / 2;
      cards.forEach(c => {
        const cc = c.getBoundingClientRect().left + c.offsetWidth / 2;
        const d = Math.abs(center - cc), m = track.offsetWidth / 2;
        c.style.opacity = 0.5 + (1 - Math.min(d/m, 1)) * 0.5;
      });
    }
    track.addEventListener('scroll', updateFocus, { passive: true });
    updateFocus();
  }

  /* 12. PAGE TRANSITION */
  const overlay = document.querySelector('.page-transition-overlay');
  if (overlay) setTimeout(() => overlay.classList.add('loaded'), 50);

  /* 13. MARQUEE CLONE */
  const marquee = document.querySelector('.marquee-track');
  if (marquee) { marquee.innerHTML += marquee.innerHTML; }

  /* 14. TIMELINE GLOW DOT */
  const glowDot = document.querySelector('.timeline-glow-dot');
  const processSteps = document.querySelector('.process-steps');
  if (glowDot && processSteps) {
    const steps = processSteps.querySelectorAll('.process-step');
    window.addEventListener('scroll', () => {
      const pr = processSteps.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -pr.top / (pr.height - innerHeight)));
      glowDot.style.top = (progress * (pr.height - 20)) + 'px';
      // Activate steps
      steps.forEach(s => {
        const sr = s.getBoundingClientRect();
        s.classList.toggle('step-active', sr.top < innerHeight * 0.6 && sr.bottom > innerHeight * 0.3);
      });
    }, { passive: true });
  }

  /* 15. DRAG TO SCROLL — Eco track */
  if (track) {
    let isDown = false, startX, scrollLeft;
    track.addEventListener('mousedown', e => { isDown = true; startX = e.pageX - track.offsetLeft; scrollLeft = track.scrollLeft; });
    track.addEventListener('mouseleave', () => isDown = false);
    track.addEventListener('mouseup', () => isDown = false);
    track.addEventListener('mousemove', e => {
      if (!isDown) return; e.preventDefault();
      track.scrollLeft = scrollLeft - (e.pageX - track.offsetLeft - startX) * 1.2;
    });
  }

})();

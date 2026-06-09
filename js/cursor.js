/* ============================================
   GLADE — Premium Cursor: Double ring + morphing + burst
   ============================================ */
(function() {
  const outer = document.createElement('div');
  outer.classList.add('cursor-dot');
  document.body.appendChild(outer);
  const inner = document.createElement('div');
  inner.classList.add('cursor-inner');
  document.body.appendChild(inner);

  let mx = -100, my = -100, ox = -100, oy = -100;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    inner.style.left = mx + 'px'; inner.style.top = my + 'px';
  }, { passive: true });

  function tick() {
    ox += (mx - ox) * 0.12; oy += (my - oy) * 0.12;
    outer.style.left = ox + 'px'; outer.style.top = oy + 'px';
    requestAnimationFrame(tick);
  }
  tick();

  const links = 'a, button, .btn-glade, .btn-submit, .btn-github, .menu-toggle';
  const cards = '.eco-card, .anatomy-col, .pillar-card, .project-detail-card, .project-mini-card, .eco-detail-card';

  document.addEventListener('mouseover', e => {
    if (e.target.closest('input, textarea')) outer.classList.add('cursor-text');
    else if (e.target.closest(cards)) outer.classList.add('cursor-expand');
    else if (e.target.closest(links)) outer.classList.add('hovering');
  }, { passive: true });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(links)) outer.classList.remove('hovering');
    if (e.target.closest(cards)) outer.classList.remove('cursor-expand');
    if (e.target.closest('input, textarea')) outer.classList.remove('cursor-text');
  }, { passive: true });

  document.addEventListener('click', e => {
    for (let i = 0; i < 6; i++) {
      const p = document.createElement('div');
      p.className = 'click-burst';
      p.style.left = e.clientX + 'px'; p.style.top = e.clientY + 'px';
      const a = (i / 6) * Math.PI * 2;
      p.style.setProperty('--bx', Math.cos(a) * 28 + 'px');
      p.style.setProperty('--by', Math.sin(a) * 28 + 'px');
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 600);
    }
  });

  document.addEventListener('mouseleave', () => { outer.style.opacity = '0'; inner.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { outer.style.opacity = '1'; inner.style.opacity = '1'; });
})();

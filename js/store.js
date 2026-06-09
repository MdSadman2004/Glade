/* ============================================
   GLADE — Global State Manager
   ============================================ */
window.GladeStore = (function() {
  const state = {
    scrollY: 0, scrollProgress: 0, scrollVelocity: 0,
    mouseX: -100, mouseY: -100,
    pageLoaded: false,
    activeMode: 'ambient'
  };
  const listeners = new Set();
  let lastScrollY = window.scrollY, lastTime = performance.now();

  function getState() { return { ...state }; }
  function setState(ns) {
    let c = false;
    for (const k in ns) { if (state[k] !== ns[k]) { state[k] = ns[k]; c = true; } }
    if (c) { const s = getState(); for (const l of listeners) l(s); }
  }
  function subscribe(fn) { listeners.add(fn); fn(getState()); return () => listeners.delete(fn); }

  document.addEventListener('mousemove', e => setState({ mouseX: e.clientX, mouseY: e.clientY }), { passive: true });

  let ticking = false;
  function updateScroll() {
    const sy = window.scrollY, now = performance.now();
    const dt = Math.max(1, now - lastTime);
    const sh = document.body.scrollHeight - window.innerHeight;
    const sections = Array.from(document.querySelectorAll('.particle-target-section'));
    let mode = 'ambient';
    for (let i = sections.length - 1; i >= 0; i--) {
      const r = sections[i].getBoundingClientRect();
      if (r.top < innerHeight * 0.75 && r.bottom > innerHeight * 0.25) {
        mode = sections[i].getAttribute('data-shape') || 'ambient'; break;
      }
    }
    setState({ scrollY: sy, scrollProgress: Math.max(0, Math.min(1, sy / (sh || 1))),
      scrollVelocity: (sy - lastScrollY) / dt, activeMode: mode });
    lastScrollY = sy; lastTime = now; ticking = false;
  }
  window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(updateScroll); ticking = true; } }, { passive: true });
  window.addEventListener('DOMContentLoaded', () => { updateScroll(); setTimeout(() => setState({ pageLoaded: true }), 100); });

  return { getState, setState, subscribe };
})();

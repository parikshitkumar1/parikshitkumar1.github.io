// Theme toggle removed, forcing dark mode

// Parallax effect on scroll (throttled + disabled on touch/reduced-motion)
// Parallax background disabled for faster paint
(function initParallax() { /* no-op */ })();

// Toggle body.scrolling to hide sidebar content when not at the very top
(function initScrollHideSidebar() {
  const root = document.documentElement;
  let ticking = false;
  const THRESHOLD = 40; // px from top before we hide
  function onScroll() {
    const y = window.scrollY || root.scrollTop || 0;
    if (y > THRESHOLD) {
      document.body.classList.add('scrolling');
    } else {
      document.body.classList.remove('scrolling');
    }
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
  // Run once on load
  onScroll();
})();

// Custom cursor disabled for performance
(function() { /* no-op */ })();

// Dynamic footer date
document.addEventListener('DOMContentLoaded', function() {
  const footer = document.querySelector('footer');
  if (footer) {
    const now = new Date();
    const year = now.getFullYear();
    footer.innerHTML = `&copy; ${year} Parikshit Kumar`;
  }
});

// Greeting based on time (disabled, keep About heading static)

// Parallax effect for project cards
// Project card parallax disabled for performance
function addProjectParallax() { /* no-op */ }
document.addEventListener('DOMContentLoaded', addProjectParallax);

// Section fade-in on scroll
const fadeEls = document.querySelectorAll('.main-content, .section-card, .timeline-event, .skills-grid, .section-divider');
const fadeIn = (el) => {
  el.style.opacity = 1;
  el.style.transform = 'none';
  el.style.transition = 'none';
};
// Immediately show all sections without scroll-triggered animations
fadeEls.forEach(fadeIn);

// Touch feedback for interactive elements
function addTouchFeedback(selector) {
  document.querySelectorAll(selector).forEach(el => {
    el.addEventListener('touchstart', () => {
      el.style.filter = 'brightness(1.2)';
    });
    el.addEventListener('touchend', () => {
      el.style.filter = '';
    });
  });
}
addTouchFeedback('.tab-btn, .section-card, .socials a');

// Highlight active nav link based on scroll position
document.addEventListener('DOMContentLoaded', function () {
  const links = Array.from(document.querySelectorAll('.tab-btn'));
  const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

  function onScroll() {
    let current = sections[0];
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 80) current = s;
    });
    links.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current.id);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});

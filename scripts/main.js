// Theme toggle with persistence and system preference
(function initTheme() {
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const mq = window.matchMedia('(prefers-color-scheme: light)');
  const stored = localStorage.getItem('theme');
  function apply(theme) {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
      if (btn) { btn.setAttribute('aria-pressed', 'true'); btn.textContent = '☀️ Light theme'; }
    } else {
      root.removeAttribute('data-theme');
      if (btn) { btn.setAttribute('aria-pressed', 'false'); btn.textContent = '🌙 Dark theme'; }
    }
  }
  let current = stored || (mq.matches ? 'light' : 'dark');
  apply(current);
  if (btn) {
    btn.addEventListener('click', () => {
      current = current === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', current);
      apply(current);
    });
  }
})();

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
    const month = now.toLocaleString('default', { month: 'long' });
    const year = now.getFullYear();
    footer.innerHTML = `Updated: ${month} ${year} &nbsp;|&nbsp; © ${year} Parikshit Kumar &nbsp;|&nbsp; Made in California <span class="footer-emoji">☀️</span> with a dash of code and <span class="footer-emoji">☕️</span>`;
  }
});

// Greeting based on time
document.addEventListener('DOMContentLoaded', function() {
  const aboutTab = document.getElementById('about');
  if (aboutTab) {
    const hour = new Date().getHours();
    let greeting = 'Hello';
    if (hour < 12) greeting = 'Good morning';
    else if (hour < 18) greeting = 'Good afternoon';
    else greeting = 'Hello';
    const aboutH2 = aboutTab.querySelector('h2');
    if (aboutH2) {
      aboutH2.innerHTML = `${greeting}, I’m Parikshit.`;
    }
  }
});

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

// In the minimalist layout, show all sections at once instead of toggling tabs.
// Keep ARIA markup but ensure every panel is visible.
(function initStaticSections() {
  const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));
  panels.forEach(p => {
    p.classList.add('active');
    p.removeAttribute('hidden');
  });
})();

// Simple scroll navigation for tab buttons
// Clicking About / Experience / Skills / Projects / Education scrolls to that section.
document.addEventListener('DOMContentLoaded', function () {
  const tabs = Array.from(document.querySelectorAll('.tab-btn'));
  if (!tabs.length) return;

  const panelMap = new Map();
  tabs.forEach(tab => {
    const id = tab.getAttribute('data-tab');
    if (id) {
      const panel = document.getElementById(id);
      if (panel) {
        panelMap.set(tab, panel);
      }
    }
  });

  tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      const panel = panelMap.get(tab);
      if (!panel) return;

      // Visually mark the current tab
      tabs.forEach(t => t.classList.toggle('active', t === tab));

      // Smooth scroll to section
      panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
});

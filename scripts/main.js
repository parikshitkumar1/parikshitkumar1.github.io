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
(function initParallax() {
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isTouch || prefersReduced) {
    document.body.style.backgroundPosition = 'center 0px';
    return;
  }
  let ticking = false;
  function onScroll() {
    const y = window.scrollY || 0;
    document.body.style.backgroundPosition = `center ${y * 0.06}px`;
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
  onScroll();
})();

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

// Custom cyan-glow cursor
(function() {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);
  document.addEventListener('mousemove', e => {
    cursor.style.transform = `translate3d(${e.clientX - 11}px, ${e.clientY - 11}px, 0)`;
  });
  // Cursor hover effect for interactive elements
  const hoverables = ['a', 'button', '.btn', '.tab-btn', '.section-card', '.socials a'];
  hoverables.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });
  });
  // Hide cursor on touch devices
  function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }
  if (isTouchDevice()) cursor.style.display = 'none';
})();

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
    else greeting = 'Good evening';
    const aboutH2 = aboutTab.querySelector('h2');
    if (aboutH2) {
      aboutH2.innerHTML = `${greeting}, I’m Parikshit.`;
    }
  }
});

// Parallax effect for project cards
function addProjectParallax() {
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isTouch || prefersReduced) return; // skip for touch and reduced motion
  const cards = document.querySelectorAll('.project-parallax');
  cards.forEach(card => {
    let ticking = false;
    let lastEvent = null;
    function apply() {
      if (!lastEvent) { ticking = false; return; }
      const rect = card.getBoundingClientRect();
      const x = lastEvent.clientX - rect.left;
      const y = lastEvent.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * 6; // slightly reduced amplitude
      const rotateY = ((x - centerX) / centerX) * 6;
      card.style.willChange = 'transform';
      card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
      ticking = false;
    }
    card.addEventListener('mousemove', e => {
      lastEvent = e;
      if (!ticking) {
        window.requestAnimationFrame(apply);
        ticking = true;
      }
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.willChange = '';
    });
  });
}
document.addEventListener('DOMContentLoaded', addProjectParallax);

// Section fade-in on scroll
const fadeEls = document.querySelectorAll('.main-content, .section-card, .timeline-event, .skills-grid, .section-divider');
const fadeIn = (el) => {
  el.style.opacity = 1;
  el.style.transform = 'translateY(0)';
  el.style.transition = 'opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1)';
};
const fadeOut = (el) => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(40px)';
};
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) fadeIn(entry.target);
    });
  }, { threshold: 0.12 });
  fadeEls.forEach(el => {
    fadeOut(el);
    observer.observe(el);
  });
} else {
  fadeEls.forEach(fadeIn);
}

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

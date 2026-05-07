// Scroll-based nav highlighting
document.addEventListener('DOMContentLoaded', function () {
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const sections = navLinks
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  function updateActiveNav() {
    let current = sections[0];
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s;
    });
    navLinks.forEach(a => {
      a.classList.toggle('nav-active', a.getAttribute('href') === '#' + current.id);
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();
});

// Scroll reveal with IntersectionObserver + staggered children
document.addEventListener('DOMContentLoaded', function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    document.querySelectorAll('.reveal, .reveal-child').forEach(el => {
      el.classList.add('in-view');
    });
    return;
  }

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in-view');
      const kids = entry.target.querySelectorAll('.reveal-child');
      kids.forEach((kid, i) => {
        setTimeout(() => kid.classList.add('in-view'), 80 + i * 90);
      });
      sectionObserver.unobserve(entry.target);
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal').forEach(el => sectionObserver.observe(el));
});

// Dynamic footer copyright
document.addEventListener('DOMContentLoaded', function () {
  const copy = document.querySelector('.footer-copy');
  if (copy) copy.textContent = `\u00a9 ${new Date().getFullYear()} Parikshit Kumar`;
});

// Touch feedback
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.nav-link, .social-link, .btn, .skill-pill').forEach(el => {
    el.addEventListener('touchstart', () => { el.style.filter = 'brightness(1.15)'; }, { passive: true });
    el.addEventListener('touchend', () => { el.style.filter = ''; }, { passive: true });
  });
});

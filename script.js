/* ── NAVBAR ── */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = mobileMenu.querySelectorAll('a');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ── SCROLL REVEAL ── */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), entry.target.dataset.delay || 0);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

/* ── STAGGER CHILDREN ── */
document.querySelectorAll('.stagger-children').forEach(parent => {
  Array.from(parent.children).forEach((child, i) => {
    child.classList.add('reveal');
    child.dataset.delay = i * 100;
    observer.observe(child);
  });
});

/* ── TESTIMONIAL SLIDER ── */
const track = document.querySelector('.testimonial-track');
const cards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let current = 0;
let perView = window.innerWidth >= 768 ? 2 : 1;
let total = cards.length;
let maxIndex = total - perView;

function slideTo(idx) {
  current = Math.max(0, Math.min(idx, maxIndex));
  const pct = (100 / perView) * current;
  track.style.transform = `translateX(-${pct}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === current));
}

prevBtn && prevBtn.addEventListener('click', () => slideTo(current - 1));
nextBtn && nextBtn.addEventListener('click', () => slideTo(current + 1));
dots.forEach((d, i) => d.addEventListener('click', () => slideTo(i)));

window.addEventListener('resize', () => {
  perView = window.innerWidth >= 768 ? 2 : 1;
  maxIndex = total - perView;
  slideTo(Math.min(current, maxIndex));
});

// Auto-advance
setInterval(() => slideTo(current >= maxIndex ? 0 : current + 1), 5000);

slideTo(0);

/* ── RESERVATION FORM ── */
const form = document.getElementById('reservation-form');
form && form.addEventListener('submit', e => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.textContent = 'Booking Confirmed ✓';
  btn.style.background = '#2d6a4f';
  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = '';
    form.reset();
  }, 3500);
});

/* ── SMOOTH SCROLL NAV ── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── ACTIVE NAV HIGHLIGHT ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const secObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${entry.target.id}` ? 'var(--gold)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => secObserver.observe(s));

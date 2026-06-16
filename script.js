/* ========================================= */
/*              LOADING SCREEN               */
/* ========================================= */
window.addEventListener('load', () => {
  const loader = document.getElementById('loading-screen');
  setTimeout(() => loader.classList.add('hidden'), 300);
});

/* ========================================= */
/*              THEME TOGGLE                 */
/* ========================================= */
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-bs-theme', savedTheme);

function updateParticlesColor() {
  if (!window.pJSDom || !window.pJSDom[0]) return;
  const theme = html.getAttribute('data-bs-theme');
  const pColor = theme === 'light' ? '#000000' : '#ffffff';
  const pJS = window.pJSDom[0].pJS;
  pJS.particles.color.value = pColor;
  pJS.particles.line_linked.color = pColor;
  pJS.fn.particlesRefresh();
}

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-bs-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-bs-theme', next);
  localStorage.setItem('theme', next);
  requestAnimationFrame(updateParticlesColor);
});

/* ========================================= */
/*              TYPED.JS                     */
/* ========================================= */
if (document.getElementById('typed-text')) {
  new Typed('#typed-text', {
    strings: [
      'AI Enthusiast',
      'Web Developer',
      'Problem Solver',
      'Automation Learner',
      'Tech Explorer'
    ],
    typeSpeed: 50,
    backSpeed: 35,
    backDelay: 2000,
    loop: true,
    showCursor: true,
    cursorChar: '|',
  });
}

/* ========================================= */
/*              PARTICLES.JS                */
/* ========================================= */
if (document.getElementById('particles-js')) {
  particlesJS('particles-js', {
    particles: {
      number: { value: 50, density: { enable: true, value_area: 800 } },
      color: { value: '#ffffff' },
      shape: { type: 'circle' },
      opacity: { value: 0.3, random: true, anim: { enable: true, speed: 0.5, opacity_min: 0.1 } },
      size: { value: 2.5, random: true, anim: { enable: true, speed: 1, size_min: 0.1 } },
      line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.12, width: 1 },
      move: { enable: true, speed: 1, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
      modes: { repulse: { distance: 80, duration: 0.3 }, push: { particles_nb: 2 } }
    },
    retina_detect: true
  });

  updateParticlesColor();
}

/* ========================================= */
/*              AOS INIT                     */
/* ========================================= */
AOS.init({
  duration: 700,
  once: true,
  offset: 80,
  easing: 'ease-out-cubic',
  disable: window.innerWidth < 576 ? true : false
});

/* ========================================= */
/*        SKILL PROGRESS BARS               */
/* ========================================= */
function animateProgressBars() {
  const bars = document.querySelectorAll('.progress-bar[data-width]');
  bars.forEach(bar => {
    const width = bar.getAttribute('data-width');
    bar.style.width = width + '%';
  });
}

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateProgressBars();
      skillsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const skillsSection = document.querySelector('#skills');
if (skillsSection) skillsObserver.observe(skillsSection);

/* ========================================= */
/*           SCROLL HANDLERS (throttled)     */
/* ========================================= */
const scrollBtn = document.getElementById('scroll-top-btn');
const navbar = document.querySelector('.glass-nav');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

let ticking = false;

function onScroll() {
  const y = window.scrollY;

  if (y > 400) {
    scrollBtn.classList.add('visible');
  } else {
    scrollBtn.classList.remove('visible');
  }

  navbar.style.boxShadow = y > 80 ? '0 4px 30px var(--shadow-color)' : 'none';

  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 150;
    const bottom = top + section.offsetHeight;
    if (y >= top && y < bottom) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });

  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(onScroll);
    ticking = true;
  }
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ========================================= */
/*          DOWNLOAD RESUME BUTTON          */
/* ========================================= */
const downloadBtn = document.getElementById('download-resume-btn');
if (downloadBtn) {
  downloadBtn.addEventListener('click', () => {
    showNotification('Downloading resume...');
  });
}

/* ========================================= */
/*          NOTIFICATION TOAST               */
/* ========================================= */
function showNotification(message) {
  const toast = document.getElementById('notification');
  const msgEl = document.getElementById('notification-message');
  if (!toast || !msgEl) return;
  msgEl.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ========================================= */
/*          SMOOTH SCROLL FOR NAV           */
/* ========================================= */
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    const navHeight = navbar ? navbar.offsetHeight : 70;
    window.scrollTo({ top: target.offsetTop - navHeight, behavior: 'smooth' });
    const navCollapse = document.querySelector('.navbar-collapse');
    if (navCollapse && navCollapse.classList.contains('show')) {
      const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
      if (bsCollapse) bsCollapse.hide();
    }
  });
});

/* ========================================= */
/*          CONTACT FORM                    */
/* ========================================= */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
    btn.disabled = true;

    try {
      const formData = new FormData(contactForm);
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        btn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Message Sent!';
        btn.classList.remove('glow-btn', 'btn-danger');
        btn.classList.add('btn-success');
        contactForm.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch {
      btn.innerHTML = '<i class="bi bi-exclamation-circle me-2"></i>Failed! Try again';
      btn.classList.remove('glow-btn', 'btn-success');
      btn.classList.add('btn-danger');
    }

    setTimeout(() => {
      btn.innerHTML = original;
      btn.classList.add('glow-btn');
      btn.classList.remove('btn-success', 'btn-danger');
      btn.disabled = false;
    }, 3000);
  });
}

/* ========================================= */
/*        INITIALIZATION ON LOAD            */
/* ========================================= */
document.addEventListener('DOMContentLoaded', () => {
  onScroll();
});

/* ========================================= */
/*              LOADING SCREEN               */
/* ========================================= */
window.addEventListener('load', () => {
  const loader = document.getElementById('loading-screen');
  setTimeout(() => loader.classList.add('hidden'), 500);
});

/* ========================================= */
/*              THEME TOGGLE                 */
/* ========================================= */
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-bs-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-bs-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-bs-theme', next);
  localStorage.setItem('theme', next);
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
    typeSpeed: 60,
    backSpeed: 40,
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
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: '#ffffff' },
      shape: { type: 'circle' },
      opacity: { value: 0.4, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1 } },
      size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0.1 } },
      line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.15, width: 1 },
      move: { enable: true, speed: 1.5, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
      modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
  });

  const theme = html.getAttribute('data-bs-theme');
  const pColor = theme === 'light' ? '#000000' : '#ffffff';
  if (window.pJSDom && window.pJSDom[0]) {
    const pJS = window.pJSDom[0].pJS;
    pJS.particles.color.value = pColor;
    pJS.particles.line_linked.color = pColor;
    pJS.fn.particlesRefresh();
  }
}

/* ========================================= */
/*              AOS INIT                     */
/* ========================================= */
AOS.init({
  duration: 800,
  once: true,
  offset: 100,
  easing: 'ease-out-cubic'
});

/* ========================================= */
/*        SKILL PROGRESS BARS               */
/* ========================================= */
function animateProgressBars() {
  document.querySelectorAll('.progress-bar[data-width]').forEach(bar => {
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
}, { threshold: 0.3 });

const skillsSection = document.querySelector('#skills');
if (skillsSection) skillsObserver.observe(skillsSection);

/* ========================================= */
/*           SCROLL TO TOP BUTTON           */
/* ========================================= */
const scrollBtn = document.getElementById('scroll-top-btn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollBtn.classList.add('visible');
  } else {
    scrollBtn.classList.remove('visible');
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
/*          ACTIVE NAV LINK                  */
/* ========================================= */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 150;
    const bottom = top + section.offsetHeight;
    if (window.scrollY >= top && window.scrollY < bottom) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

/* ========================================= */
/*          SMOOTH SCROLL FOR NAV           */
/* ========================================= */
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const nav = document.querySelector('.navbar');
        const navHeight = nav ? nav.offsetHeight : 70;
        const top = target.offsetTop - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      const navCollapse = document.querySelector('.navbar-collapse');
      if (navCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    }
  });
});

/* ========================================= */
/*          CONTACT FORM                    */
/* ========================================= */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Message Sent!';
      btn.classList.remove('glow-btn');
      btn.classList.add('btn-success');

      setTimeout(() => {
        btn.innerHTML = original;
        btn.classList.add('glow-btn');
        btn.classList.remove('btn-success');
        btn.disabled = false;
        contactForm.reset();
      }, 2500);
    }, 1500);
  });
}

/* ========================================= */
/*        NAVBAR SCROLL EFFECT              */
/* ========================================= */
const navbar = document.querySelector('.glass-nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current > 80) {
    navbar.style.boxShadow = '0 4px 30px var(--shadow-color)';
  } else {
    navbar.style.boxShadow = 'none';
  }
  lastScroll = current;
});

/* ========================================= */
/*        THEME CHANGE PARTICLE REFRESH     */
/* ========================================= */
const origToggle = themeToggle.click;
themeToggle.addEventListener('click', () => {
  setTimeout(() => {
    if (window.pJSDom && window.pJSDom[0]) {
      const theme = html.getAttribute('data-bs-theme');
      const pColor = theme === 'light' ? '#000000' : '#ffffff';
      const pJS = window.pJSDom[0].pJS;
      pJS.particles.color.value = pColor;
      pJS.particles.line_linked.color = pColor;
      pJS.fn.particlesRefresh();
    }
  }, 100);
});

/* ========================================= */
/*              COUNTER ANIMATION            */
/* ========================================= */
function animateCounters() {
  // placeholder for future counter animations
}

/* ========================================= */
/*        INITIALIZATION ON LOAD            */
/* ========================================= */
document.addEventListener('DOMContentLoaded', () => {
  updateActiveLink();
});

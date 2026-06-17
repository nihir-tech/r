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
const contactFormContainer = contactForm ? contactForm.parentElement : null;

if (contactForm && contactFormContainer) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`;
    const mailto = `mailto:sartanparanihir@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=sartanparanihir@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const sentHTML = `
      <div class="text-center py-4">
        <div class="mb-3" style="font-size: 3rem;">📧</div>
        <h5 class="mb-2">Message Ready!</h5>
        <p class="text-muted mb-3">Send to: <strong>sartanparanihir@gmail.com</strong></p>
        <div class="d-flex gap-2 mb-3">
          <a href="${gmailLink}" target="_blank" class="btn btn-primary glow-btn flex-fill">
            <i class="bi bi-google me-2"></i>Open Gmail
          </a>
          <button class="btn btn-outline-light flex-fill" id="copy-btn">
            <i class="bi bi-clipboard me-2"></i>Copy to Clipboard
          </button>
        </div>
        <div class="glass-card p-3 text-start small mb-3">
          <div><strong>To:</strong> sartanparanihir@gmail.com</div>
          <div><strong>Subject:</strong> ${subject}</div>
          <hr class="my-2" style="border-color:var(--border-color)">
          <pre style="white-space:pre-wrap;margin:0;font-family:inherit;color:var(--text-secondary)">Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}</pre>
        </div>
        <button class="btn btn-sm btn-outline-light" id="reset-form-btn">
          <i class="bi bi-arrow-left me-1"></i>Back to Form
        </button>
      </div>
    `;

    contactForm.style.display = 'none';
    const sentDiv = document.createElement('div');
    sentDiv.innerHTML = sentHTML;
    sentDiv.id = 'sent-message';
    contactFormContainer.appendChild(sentDiv);

    sentDiv.querySelector('#copy-btn').addEventListener('click', async () => {
      const text = `To: sartanparanihir@gmail.com\nSubject: ${subject}\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`;
      try {
        await navigator.clipboard.writeText(text);
        const btn = sentDiv.querySelector('#copy-btn');
        btn.innerHTML = '<i class="bi bi-check-lg me-2"></i>Copied!';
        setTimeout(() => {
          btn.innerHTML = '<i class="bi bi-clipboard me-2"></i>Copy to Clipboard';
        }, 2000);
      } catch {
        prompt('Copy manually:', text);
      }
    });

    sentDiv.querySelector('#reset-form-btn').addEventListener('click', () => {
      sentDiv.remove();
      contactForm.style.display = '';
      contactForm.reset();
    });
  });
}

/* ========================================= */
/*        INITIALIZATION ON LOAD            */
/* ========================================= */
document.addEventListener('DOMContentLoaded', () => {
  onScroll();
});

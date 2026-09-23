// ── Dark Mode Toggle ────────────────────────────
const themeToggle = document.getElementById('theme-toggle');
const html = document.body;

function setTheme(dark) {
  if (dark) {
    html.classList.add('dark');
    themeToggle.querySelector('.icon-sun').style.display = 'none';
    themeToggle.querySelector('.icon-moon').style.display = 'block';
  } else {
    html.classList.remove('dark');
    themeToggle.querySelector('.icon-sun').style.display = 'block';
    themeToggle.querySelector('.icon-moon').style.display = 'none';
  }
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  setTheme(savedTheme === 'dark');
} else {
  setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);
}

themeToggle.addEventListener('click', () => {
  const isDark = html.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  themeToggle.querySelector('.icon-sun').style.display = isDark ? 'none' : 'block';
  themeToggle.querySelector('.icon-moon').style.display = isDark ? 'block' : 'none';
});

// ── Mobile Menu Toggle ──────────────────────────
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');

if (mobileMenuBtn && mobileNav) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });
  // Close on link click
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileNav.classList.remove('open'));
  });
}

// ── Sticky Header Shadow ───────────────────────
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ── Scroll-to-Top Button ───────────────────────
const scrollTopBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Typing Animation ──────────────────────────
const typingEl = document.getElementById('typing-text');
const roles = [
  'Data Analytics Leader',
  'Full Stack Solo Dev',
  'Agentic Engineer',
  'Self-Service Analytics Builder',
  'Snowflake Platform Admin'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
  const current = roles[roleIndex];
  if (isDeleting) {
    charIndex--;
    typingEl.textContent = current.substring(0, charIndex);
  } else {
    charIndex++;
    typingEl.textContent = current.substring(0, charIndex);
  }

  let delay = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === current.length) {
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 500;
  }

  setTimeout(typeRole, delay);
}
typeRole();

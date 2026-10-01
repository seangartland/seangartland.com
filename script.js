const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const themeColor = document.querySelector('meta[name="theme-color"]');

function applyTheme(dark) {
  root.classList.toggle('dark', dark);
  themeToggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  themeColor.content = dark ? '#1a1d23' : '#fffaeb';
}

applyTheme(root.classList.contains('dark'));
themeToggle.addEventListener('click', () => {
  const dark = !root.classList.contains('dark');
  applyTheme(dark);
  localStorage.setItem('theme', dark ? 'dark' : 'light');
});

const menuButton = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');

function closeMenu({ restoreFocus = false } = {}) {
  if (!mobileNav.classList.contains('open')) return;
  mobileNav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
  if (restoreFocus) menuButton.focus();
}

menuButton.addEventListener('click', () => {
  const open = !mobileNav.classList.contains('open');
  mobileNav.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  if (open) mobileNav.querySelector('a').focus();
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu({ restoreFocus: true });
});
document.addEventListener('pointerdown', event => {
  if (!mobileNav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
});

const header = document.getElementById('site-header');
const scrollTopButton = document.getElementById('scroll-top');
function updateScrollState() {
  header.classList.toggle('scrolled', window.scrollY > 10);
  scrollTopButton.classList.toggle('visible', window.scrollY > 400);
}
window.addEventListener('scroll', updateScrollState, { passive: true });
updateScrollState();
scrollTopButton.addEventListener('click', () => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
});

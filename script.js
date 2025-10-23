(function initThemeEarly() {
  try {
    const stored = localStorage.getItem('theme');
    const preferred = stored || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.dataset.theme = preferred;
  } catch {}
})();

window.addEventListener('DOMContentLoaded', () => {
    const storageKey = 'theme';
    const btn = document.getElementById('themeToggle');

  const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem(storageKey, theme); } catch {}
    if (btn) {
      btn.setAttribute('aria-pressed', String(theme === 'dark'));
      btn.textContent = theme === 'dark' ? '☀' : '☾';
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute('content', theme === 'dark' ? '#0b0b0f' : '#ffffff');
  };

  // Initialize from storage or system preference
  const current = document.documentElement.dataset.theme ||
                  localStorage.getItem(storageKey) ||
                  (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(current);

  // Toggle on click
  btn?.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });
});






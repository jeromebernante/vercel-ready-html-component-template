// Theme toggle logic
function initThemeToggle() {
  console.log('[THEME-TOGGLE] Initializing...');
  const root = document.documentElement;
  const select = document.getElementById('theme-select');
  const storageKey = 'theme-preference';

  console.log('[THEME-TOGGLE] Select element found:', select);

  // Determine initial theme
  const getTheme = () => {
    const stored = localStorage.getItem(storageKey);
    console.log('[THEME-TOGGLE] Stored theme:', stored);
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      return stored;
    }
    console.log('[THEME-TOGGLE] No valid stored theme, defaulting to system');
    return 'system';
  };

  const setTheme = (theme) => {
    console.log('[THEME-TOGGLE] Setting theme to:', theme);
    if (theme === 'system') {
      root.removeAttribute('data-theme');
      console.log('[THEME-TOGGLE] Removed data-theme, using OS preference');
    } else {
      root.setAttribute('data-theme', theme);
      console.log('[THEME-TOGGLE] Set data-theme to:', theme);
    }
    localStorage.setItem(storageKey, theme);
    if (select) {
      select.value = theme;
      console.log('[THEME-TOGGLE] Dropdown value set to:', theme);
    }
  };

  // Initialize with stored or default theme
  const currentTheme = getTheme();
  setTheme(currentTheme);

  // Listen for dropdown changes
  if (select) {
    select.addEventListener('change', (e) => {
      const newTheme = e.target.value;
      console.log('[THEME-TOGGLE] Dropdown changed to:', newTheme);
      setTheme(newTheme);
    });
    console.log('[THEME-TOGGLE] Change listener attached to dropdown');
  } else {
    console.warn('[THEME-TOGGLE] Select element not found');
  }

  // Listen for OS theme changes (only matters if system is selected)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const current = localStorage.getItem(storageKey);
    console.log('[THEME-TOGGLE] OS preference changed to:', e.matches ? 'dark' : 'light');
    if (current === 'system' || !current) {
      console.log('[THEME-TOGGLE] System preference selected, updating...');
      // Theme will automatically adjust due to media query
    }
  });

  console.log('[THEME-TOGGLE] Initialization complete');
}

// Run when DOM is ready
console.log('[THEME-TOGGLE] Script loaded, readyState:', document.readyState);
document.addEventListener('DOMContentLoaded', () => {
  console.log('[THEME-TOGGLE] DOMContentLoaded fired');
  initThemeToggle();
});
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  console.log('[THEME-TOGGLE] DOM already ready, initializing immediately');
  initThemeToggle();
}

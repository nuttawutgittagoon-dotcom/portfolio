// ===================================
// Theme Toggle JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
});

function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const html = document.documentElement;

    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    // Theme toggle click handler
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
        });
    }

    // Set theme function
    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // Update icon
        if (themeIcon) {
            themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
        }

        // Add transition class to body for smooth theme change
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
        // Only auto-switch if user hasn't manually set a preference
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
}

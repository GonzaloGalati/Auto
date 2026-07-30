// mobile nav toggle
const header = document.querySelector('.site-header');
const navToggle = document.getElementById('navToggle');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        const isOpen = header.classList.toggle('nav-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.querySelectorAll('.nav a').forEach((link) => {
        link.addEventListener('click', () => {
            header.classList.remove('nav-open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// back to top (header is sticky, so #top anchor alone won't scroll)
document.querySelectorAll('.back-top').forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

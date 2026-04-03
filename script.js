document.addEventListener('DOMContentLoaded', () => {

    // ══════════════════════════════════════
    // THEME TOGGLE — persists in localStorage
    // ══════════════════════════════════════
    const html = document.documentElement;
    const toggleBtn = document.getElementById('theme-toggle');

    // Restore saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const current = html.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });
    }

    // ══════════════════════════════════════
    // MOBILE NAV TOGGLE
    // ══════════════════════════════════════
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        navLinks.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => navLinks.classList.remove('active'));
        });
    }

    // ══════════════════════════════════════
    // BACK TO TOP BUTTON
    // ══════════════════════════════════════
    const topBtn = document.getElementById('back-to-top');
    if (topBtn) {
        window.addEventListener('scroll', () => {
            topBtn.classList.toggle('visible', window.scrollY > 400);
        }, { passive: true });

        topBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ══════════════════════════════════════
    // ACTIVE NAV LINK ON SCROLL
    // ══════════════════════════════════════
    const sections = document.querySelectorAll('section[id], footer[id]');
    const allNavLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - 100) {
                current = sec.getAttribute('id');
            }
        });
        allNavLinks.forEach(link => {
            link.classList.toggle('nav-active', link.getAttribute('href') === '#' + current);
        });
    }, { passive: true });

    // ══════════════════════════════════════
    // SCROLL-TRIGGERED FADE-IN
    // ══════════════════════════════════════
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -30px 0px', threshold: 0.05 });

    const animEls = document.querySelectorAll(
        '.research-card, .oppo-card, .pub-card, .tool-category, .teaching-item, .timeline-item'
    );
    animEls.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(14px)';
        el.style.transition = `opacity 0.4s ease ${(i % 4) * 0.06}s, transform 0.4s ease ${(i % 4) * 0.06}s`;
        observer.observe(el);
    });
	document.getElementById('current-year').textContent = new Date().getFullYear();
});

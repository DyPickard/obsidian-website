document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initMobileNav();
    initHeaderScroll();
    initFeatureCards();
});

function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal, .fade-in');
    if (!elements.length) return;

    if (prefersReducedMotion()) {
        elements.forEach(el => el.classList.add('visible', 'is-visible'));
        return;
    }

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible', 'is-visible');
                    obs.unobserve(entry.target);
                }
            });
        },
        { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );

    elements.forEach(el => observer.observe(el));
}

function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.site-nav');
    const header = document.querySelector('.site-header');

    if (!toggle || !nav) return;

    const closeNav = () => {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
        nav.classList.remove('is-open');
        document.body.classList.remove('nav-open');
    };

    toggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
        toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
        document.body.classList.toggle('nav-open', isOpen);
    });

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeNav();
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) closeNav();
    });

    if (header) {
        header.addEventListener('click', e => {
            if (e.target === header && nav.classList.contains('is-open')) closeNav();
        });
    }
}

function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const onScroll = () => {
        header.classList.toggle('is-scrolled', window.scrollY > 24);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
}

function initFeatureCards() {
    if (prefersReducedMotion()) return;

    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--pointer-x', `${x}%`);
            card.style.setProperty('--pointer-y', `${y}%`);
        });

        card.addEventListener('mouseleave', () => {
            card.style.removeProperty('--pointer-x');
            card.style.removeProperty('--pointer-y');
        });
    });
}

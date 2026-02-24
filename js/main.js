// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations (fade in elements as they scroll into view)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Optional: Stop observing once visible
            }
        });
    }, observerOptions);

    // Grab all elements with .fade-in and observe them
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
});

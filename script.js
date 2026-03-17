document.addEventListener("DOMContentLoaded", () => {
    // Current Year for Footer
    document.getElementById("year").textContent = new Date().getFullYear();

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector(".mobile-toggle");
    const nav = document.querySelector(".nav");
    const navLinks = document.querySelectorAll(".nav-link");

    if (mobileToggle) {
        mobileToggle.addEventListener("click", () => {
            mobileToggle.classList.toggle("active");
            nav.classList.toggle("nav-open");
        });
    }

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (nav.classList.contains("nav-open")) {
                nav.classList.remove("nav-open");
                mobileToggle.classList.remove("active");
            }
        });
    });

    // Header Background Change on Scroll
    const header = document.getElementById("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const animateOnScrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach(el => {
        animateOnScrollObserver.observe(el);
    });

    // Smooth Scrolling for anchor links (safeguard for older browsers)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});

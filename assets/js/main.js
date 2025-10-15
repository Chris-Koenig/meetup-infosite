// main.js
import { Navigation } from './modules/navigation.js';
import { SmoothScroll } from './modules/smooth-scroll.js';
import { RegistrationForm } from './modules/registration-form.js';
import { AnimationObserver } from './modules/animation-observer.js';

class MeetupApp {
    constructor() {
        this.init();
    }

    init() {
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        // Initialize modules
        new Navigation();
        new SmoothScroll();
        new RegistrationForm();
        new AnimationObserver();
        
        // Setup global event listeners
        this.setupGlobalEvents();
        this.setupMapClick();
    this.setupScrollToTop();
    }

    setupGlobalEvents() {
        // Handle hero CTA buttons
        const ctaButtons = document.querySelectorAll('.hero__actions .btn');
        ctaButtons.forEach(button => {
            if (button.getAttribute('href') === '#register') {
                button.addEventListener('click', this.handleRegisterClick.bind(this));
            } else if (button.getAttribute('href') === '#details') {
                button.addEventListener('click', this.handleDetailsClick.bind(this));
            }
        });

        // Add scroll effect to header
        window.addEventListener('scroll', this.handleHeaderScroll.bind(this));
    }

    setupMapClick() {
        const mapPlaceholder = document.querySelector('.map-placeholder');
        if (mapPlaceholder) {
            mapPlaceholder.addEventListener('click', () => {
                const address = encodeURIComponent('isolutions AG, The circle 38, Kloten, Switzerland');
                const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${address}`;
                window.open(googleMapsUrl, '_blank');
            });
        }
    }

    setupScrollToTop() {
        // Create scroll to top button
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.innerHTML = '↑';
        scrollToTopBtn.className = 'scroll-to-top';
        scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollToTopBtn);

        // Show/hide scroll to top button
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        // Handle click
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    handleRegisterClick(event) {
        event.preventDefault();
        const registerSection = document.getElementById('register');
        if (registerSection) {
            registerSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
            // Focus on first form field after scroll
            setTimeout(() => {
                const firstInput = registerSection.querySelector('input[type="text"]');
                if (firstInput) {
                    firstInput.focus();
                }
            }, 500);
        }
    }

    handleDetailsClick(event) {
        event.preventDefault();
        const detailsSection = document.getElementById('details');
        if (detailsSection) {
            detailsSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    handleHeaderScroll() {
        const header = document.querySelector('.site-header');
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

}

// Start the application
new MeetupApp();

// Add additional CSS for scroll to top button
const style = document.createElement('style');
style.textContent = `
    .scroll-to-top {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background-color: var(--color-primary);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        font-weight: bold;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-lg);
    }
    
    .scroll-to-top.visible {
        opacity: 1;
        visibility: visible;
    }
    
    .scroll-to-top:hover {
        background-color: var(--color-primary-dark);
        transform: translateY(-2px);
    }
    
    .site-header.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: var(--shadow-md);
    }
    
    @media (max-width: 768px) {
        .scroll-to-top {
            bottom: 1rem;
            right: 1rem;
            width: 45px;
            height: 45px;
        }
    }
`;
document.head.appendChild(style);
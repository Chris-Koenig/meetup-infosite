// main.js
import { Navigation } from './modules/navigation.js';
import { SmoothScroll } from './modules/smooth-scroll.js';
import { RegistrationForm } from './modules/registration-form.js';
import { AnimationObserver } from './modules/animation-observer.js';
import { logger, Logger } from './modules/logger.js';

class MeetupApp {
    constructor() {
        this.logger = logger;
        this.init();
    }

    init() {
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
        
        this.logger.info('MeetupApp initialized');
    }

    setup() {
        this.logger.info('Setting up MeetupApp modules');
        
        // Initialize modules
        new Navigation();
        new SmoothScroll();
        new RegistrationForm();
        new AnimationObserver();
        
        // Setup global event listeners
        this.setupGlobalEvents();
        this.setupMapClick();
        this.setupScrollToTop();
        
        this.logger.info('MeetupApp setup complete');
        
        // Expose logger globally for debugging (development only)
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            window.logger = this.logger;
            this.logger.debug('Logger exposed globally for development');
        }
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
                this.logger.info('Opening map in new window', { address });
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
        this.logger.debug('Register button clicked');
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
        this.logger.debug('Details button clicked');
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


    setupCountdown() {
        const countdownEl = document.getElementById('countdown');
        if (!countdownEl) return;

        // Event start: 2025-11-05 16:45 local (assume Europe/Zurich)
        // Using ISO string without timezone to rely on local time; adjust if needed
        const eventDate = new Date('2025-11-05T16:45:00');

        const updateCountdown = () => {
            const now = new Date();
            let diff = eventDate - now;

            if (diff <= 0) {
                countdownEl.textContent = 'Event is starting';
                return;
            }

            const minutesTotal = Math.floor(diff / 60000);
            const days = Math.floor(minutesTotal / (60 * 24));
            const hours = Math.floor((minutesTotal % (60 * 24)) / 60);
            const minutes = minutesTotal % 60;

            // Format string
            const parts = [];
            if (days > 0) parts.push(days + 'd');
            parts.push(hours + 'h');
            parts.push(minutes + 'm');
            countdownEl.textContent = parts.join(' ');
        };

        // Initial update
        updateCountdown();
        // Update every minute (if under 2 hours we can switch to every 15s for precision) 
        let interval = setInterval(updateCountdown, 60000);

        // Optional: refine updates when close (< 2 hours)
        const refineIntervalCheck = () => {
            const now = new Date();
            const diff = eventDate - now;
            if (diff < 2 * 60 * 60 * 1000 && interval) {
                clearInterval(interval);
                interval = setInterval(updateCountdown, 15000);
            }
            if (diff <= 0 && interval) {
                clearInterval(interval);
            }
        };
        setInterval(refineIntervalCheck, 60000);
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
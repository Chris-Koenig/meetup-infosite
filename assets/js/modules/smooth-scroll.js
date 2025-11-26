// modules/smooth-scroll.js
import { logger } from './logger.js';

export class SmoothScroll {
    constructor() {
        this.logger = logger.createChild('SmoothScroll');
        this.init();
    }

    init() {
        this.logger.info('Initializing SmoothScroll module');
        // Handle all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', this.handleAnchorClick.bind(this));
        });
        this.logger.info('SmoothScroll module initialized');
    }

    handleAnchorClick(e) {
        const href = e.target.getAttribute('href');
        
        // Skip if it's just a hash
        if (href === '#') {
            e.preventDefault();
            return;
        }

        const targetElement = document.querySelector(href);
        
        if (targetElement) {
            e.preventDefault();
            this.logger.debug('Smooth scrolling to anchor', { href });
            
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        } else {
            this.logger.warn('Target element not found for anchor link', { href });
        }
    }
}
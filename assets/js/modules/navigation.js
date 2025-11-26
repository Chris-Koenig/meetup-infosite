// modules/navigation.js
import { logger } from './logger.js';

export class Navigation {
    constructor() {
        this.logger = logger.createChild('Navigation');
        this.nav = document.querySelector('.nav');
        this.navLinks = document.querySelectorAll('.nav__link');
        this.navToggle = document.querySelector('.nav__toggle');
        this.init();
    }

    init() {
        this.logger.info('Initializing Navigation module');
        this.setupSmoothScrolling();
        this.setupActiveStates();
        this.setupMobileMenu();
        this.logger.info('Navigation module initialized');
    }

    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    this.logger.debug('Smooth scrolling to section', { targetId });
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    this.closeMobileMenu();
                } else {
                    this.logger.warn('Target element not found for navigation', { targetId });
                }
            });
        });
    }

    setupActiveStates() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const activeLink = document.querySelector(`[href="#${entry.target.id}"]`);
                    
                    // Remove active class from all links
                    this.navLinks.forEach(link => link.classList.remove('nav__link--active'));
                    
                    // Add active class to current link
                    if (activeLink) {
                        activeLink.classList.add('nav__link--active');
                    }
                }
            });
        }, { 
            threshold: 0.3,
            rootMargin: '-80px 0px -80px 0px'
        });

        // Observe all sections
        document.querySelectorAll('section[id]').forEach(section => {
            observer.observe(section);
        });
    }

    setupMobileMenu() {
        if (!this.navToggle) return;

        this.navToggle.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.nav.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        const navList = document.querySelector('.nav__list');
        const isOpen = navList.classList.contains('nav__list--open');
        
        if (isOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        this.logger.debug('Opening mobile menu');
        const navList = document.querySelector('.nav__list');
        navList.classList.add('nav__list--open');
        this.navToggle.classList.add('nav__toggle--open');
        document.body.classList.add('nav-open');
    }

    closeMobileMenu() {
        this.logger.debug('Closing mobile menu');
        const navList = document.querySelector('.nav__list');
        navList.classList.remove('nav__list--open');
        this.navToggle.classList.remove('nav__toggle--open');
        document.body.classList.remove('nav-open');
    }
}
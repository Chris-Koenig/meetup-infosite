// modules/registration-form.js
import { logger } from './logger.js';

export class RegistrationForm {
    constructor() {
        this.logger = logger.createChild('RegistrationForm');
        this.form = document.getElementById('registrationForm');
        this.init();
    }

    init() {
        if (!this.form) {
            this.logger.warn('Registration form not found on page');
            return;
        }
        
        this.logger.info('Initializing RegistrationForm module');
        this.setupFormValidation();
        this.setupFormSubmission();
        this.logger.info('RegistrationForm module initialized');
    }

    setupFormValidation() {
        const inputs = this.form.querySelectorAll('input[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearErrors(input));
        });
    }

    setupFormSubmission() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.getAttribute('name');
        let isValid = true;
        let errorMessage = '';

        // Remove existing error
        this.clearErrors(field);

        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (fieldName === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        } else if (fieldName === 'firstName' && value.length < 2) {
            isValid = false;
            errorMessage = 'First name must be at least 2 characters';
        } else if (fieldName === 'lastName' && value.length < 2) {
            isValid = false;
            errorMessage = 'Last name must be at least 2 characters';
        }

        if (!isValid) {
            this.logger.debug('Field validation failed', { fieldName, errorMessage });
            this.showError(field, errorMessage);
        }

        return isValid;
    }

    showError(field, message) {
        field.classList.add('error');
        
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        const formGroup = field.closest('.form-group');
        formGroup.appendChild(errorElement);
    }

    clearErrors(field) {
        field.classList.remove('error');
        
        const formGroup = field.closest('.form-group');
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        // Validate all required fields
        const requiredFields = this.form.querySelectorAll('input[required]');
        let isFormValid = true;
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            this.submitForm();
        } else {
            // Focus on first error field
            const firstError = this.form.querySelector('.error');
            if (firstError) {
                firstError.focus();
            }
        }
    }

    async submitForm() {
        this.logger.info('Submitting registration form');
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.textContent = 'Registering...';
        submitButton.disabled = true;
        
        try {
            // Simulate API call
            await this.simulateRegistration();
            
            this.logger.info('Registration successful');
            
            // Show success message
            this.showSuccessMessage();
            
            // Reset form
            this.form.reset();
            
        } catch (error) {
            this.logger.error('Registration failed', error);
            this.showErrorMessage('Registration failed. Please try again.');
        } finally {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }

    simulateRegistration() {
        return new Promise((resolve, reject) => {
            // Simulate network delay
            setTimeout(() => {
                // Simulate 95% success rate
                if (Math.random() > 0.05) {
                    resolve();
                } else {
                    reject(new Error('Network error'));
                }
            }, 1500);
        });
    }

    showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.innerHTML = `
            <h3>🎉 Registration Successful!</h3>
            <p>Thank you for registering! You'll receive a confirmation email shortly with event details and updates.</p>
        `;
        
        this.form.insertAdjacentElement('beforebegin', message);
        
        // Scroll to message
        message.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Remove message after 5 seconds
        setTimeout(() => {
            message.remove();
        }, 5000);
    }

    showErrorMessage(text) {
        const message = document.createElement('div');
        message.className = 'error-banner';
        message.textContent = text;
        
        this.form.insertAdjacentElement('beforebegin', message);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            message.remove();
        }, 5000);
    }
}
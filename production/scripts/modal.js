/**
 * Modal management: handles opening, closing, scroll prevention, and focus trapping
 */

const ModalInstances = {};

class Modal {
    constructor(modalElement) {
        this.modal = modalElement;
        this.isOpen = false;
        this.setupEventListeners();
        
        // Store instance globally for access
        if (this.modal.id) {
            ModalInstances[this.modal.id] = this;
        }
    }

    setupEventListeners() {
        // Close button
        const closeBtn = this.modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }

        // Cancel button (all buttons with data-action="cancel")
        const cancelBtns = this.modal.querySelectorAll('[data-action="cancel"]');
        cancelBtns.forEach(btn => {
            btn.addEventListener('click', () => this.close());
        });

        // Confirm button (all buttons with data-action="confirm" or modal-btn-primary)
        const confirmBtns = this.modal.querySelectorAll('[data-action="confirm"], .modal-btn-primary');
        confirmBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Trigger custom confirm event if needed
                this.modal.dispatchEvent(new CustomEvent('modal:confirm'));
                this.close();
            });
        });

        // All buttons with data-action="close"
        const closeBtns = this.modal.querySelectorAll('[data-action="close"]');
        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => this.close());
        });

        // Close on overlay click (outside modal box)
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        // Close on Escape key
        this.modal.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        });

        // Focus trap on Tab key
        this.modal.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                this.handleTabKey(e);
            }
        });
    }

    open() {
        this.modal.classList.add('active');
        document.body.classList.add('modal-open');
        this.isOpen = true;
        
        // Focus first focusable element
        this.focusFirstElement();
    }

    close() {
        this.modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        this.isOpen = false;
    }

    /**
     * Get all focusable elements within the modal
     */
    getFocusableElements() {
        const focusableSelectors = [
            'button',
            '[href]',
            'input',
            'select',
            'textarea',
            '[tabindex]:not([tabindex="-1"])'
        ].join(',');

        return Array.from(this.modal.querySelectorAll(focusableSelectors)).filter(el => {
            return !el.hasAttribute('disabled') && el.offsetParent !== null;
        });
    }

    /**
     * Focus the first focusable element in the modal
     */
    focusFirstElement() {
        const focusableElements = this.getFocusableElements();
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }
    }

    /**
     * Trap focus within modal when using Tab key
     */
    handleTabKey(e) {
        const focusableElements = this.getFocusableElements();
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        const activeElement = document.activeElement;

        // Shift + Tab: move to previous element
        if (e.shiftKey) {
            if (activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        }
        // Tab: move to next element
        else {
            if (activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
}

/**
 * Initialize all modals on the page
 */
document.addEventListener('DOMContentLoaded', () => {
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modalElement => {
        new Modal(modalElement);
    });

    // Add simple open handlers for demo buttons
    document.querySelectorAll('[data-modal-trigger]').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.getAttribute('data-modal-trigger');
            const modal = ModalInstances[modalId];
            if (modal) {
                modal.open();
            }
        });
    });
});

/**
 * Global function to open a modal by ID (for inline onclick handlers)
 */
window.openModal = function(modalId) {
    const modal = ModalInstances[modalId];
    if (modal) {
        modal.open();
    }
};

/**
 * Global function to close a modal by ID (for inline onclick handlers)
 */
window.closeModal = function(modalId) {
    const modal = ModalInstances[modalId];
    if (modal) {
        modal.close();
    }
};

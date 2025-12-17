/* ============================================
   UB INSTITUTE & TRAINING - MAIN JAVASCRIPT
   Version: 1.0
   Author: Your Developer Name
   ============================================ */

'use strict';

/* ============================================
   TABLE OF CONTENTS
   ============================================
   1. Global Variables & DOM Elements
   2. Utility Functions
   3. Preloader
   4. Announcement Bar
   5. Header & Navigation
   6. Mobile Menu
   7. Dropdown Navigation
   8. Smooth Scrolling
   9. Sticky Header
   10. Active Link Highlighting
   11. Typing Effect
   12. Animated Counters
   13. Course Filters
   14. FAQ Accordion
   15. Modal Functions
   16. Swiper Sliders
   17. GLightbox Gallery
   18. Countdown Timer
   19. Form Validation
   20. Back to Top Button
   21. AOS Initialization
   22. Lazy Loading
   23. Razorpay Payment
   24. Miscellaneous
   ============================================ */

/* ============================================
   1. GLOBAL VARIABLES & DOM ELEMENTS
   ============================================ */
const DOM = {
    // Preloader
    preloader: document.getElementById('preloader'),
    
    // Announcement Bar
    announcementBar: document.getElementById('announcementBar'),
    closeAnnouncement: document.getElementById('closeAnnouncement'),
    
    // Header & Navigation
    header: document.getElementById('header'),
    navMenu: document.getElementById('navMenu'),
    navToggle: document.getElementById('navToggle'),
    navLinks: document.querySelectorAll('.nav-link'),
    dropdowns: document.querySelectorAll('.dropdown'),
    
    // Hero
    typingText: document.getElementById('typingText'),
    
    // Counters
    counters: document.querySelectorAll('.counter'),
    
    // Courses
    filterBtns: document.querySelectorAll('.filter-btn'),
    courseCards: document.querySelectorAll('.course-card'),
    
    // FAQ
    faqItems: document.querySelectorAll('.faq-item'),
    
    // Modal
    enquiryModal: document.getElementById('enquiryModal'),
    openEnquiryModal: document.getElementById('openEnquiryModal'),
    closeEnquiryModal: document.getElementById('closeEnquiryModal'),
    
    // Forms
    heroForm: document.getElementById('heroEnquiryForm'),
    quickEnquiryForm: document.getElementById('quickEnquiryForm'),
    contactForm: document.getElementById('contactForm'),
    newsletterForms: document.querySelectorAll('.newsletter-form'),
    
    // Countdown
    countdownTimer: document.getElementById('countdownTimer'),
    
    // Back to Top
    backToTop: document.getElementById('backToTop'),
    
    // Floating Buttons
    floatingButtons: document.querySelector('.floating-buttons'),
    
    // Current Year
    currentYear: document.getElementById('currentYear')
};

// Configuration
const CONFIG = {
    headerScrollOffset: 100,
    counterDuration: 2000,
    typingSpeed: 100,
    typingDeleteSpeed: 50,
    typingPauseTime: 2000,
    scrollOffset: 80,
    animationDuration: 300
};

// Typing Words for Hero Section
const typingWords = [
    'Quality Education',
    'Digital Marketing',
    'Computer Skills',
    'Career Success',
    'Expert Training'
];

/* ============================================
   2. UTILITY FUNCTIONS
   ============================================ */

/**
 * Debounce function to limit function calls
 */
function debounce(func, wait = 100) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to limit function calls
 */
function throttle(func, limit = 100) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element, offset = 0) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
        rect.bottom >= 0
    );
}

/**
 * Add class to element
 */
function addClass(element, className) {
    if (element) element.classList.add(className);
}

/**
 * Remove class from element
 */
function removeClass(element, className) {
    if (element) element.classList.remove(className);
}

/**
 * Toggle class on element
 */
function toggleClass(element, className) {
    if (element) element.classList.toggle(className);
}

/**
 * Check if element has class
 */
function hasClass(element, className) {
    return element ? element.classList.contains(className) : false;
}

/**
 * Set local storage item
 */
function setStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.warn('LocalStorage not available');
    }
}

/**
 * Get local storage item
 */
function getStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (e) {
        console.warn('LocalStorage not available');
        return null;
    }
}

/**
 * Format number with commas
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate phone number (Indian format)
 */
function isValidPhone(phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

/* ============================================
   3. PRELOADER
   ============================================ */
function initPreloader() {
    if (!DOM.preloader) return;
    
    window.addEventListener('load', () => {
        // Add a minimum display time for better UX
        setTimeout(() => {
            addClass(DOM.preloader, 'hidden');
            removeClass(document.body, 'preloader-active');
            
            // Remove preloader from DOM after transition
            setTimeout(() => {
                if (DOM.preloader && DOM.preloader.parentNode) {
                    DOM.preloader.parentNode.removeChild(DOM.preloader);
                }
            }, 500);
        }, 1500);
    });
    
    // Fallback: Hide preloader after 5 seconds even if not fully loaded
    setTimeout(() => {
        if (DOM.preloader && !hasClass(DOM.preloader, 'hidden')) {
            addClass(DOM.preloader, 'hidden');
            removeClass(document.body, 'preloader-active');
        }
    }, 5000);
}

/* ============================================
   4. ANNOUNCEMENT BAR
   ============================================ */
function initAnnouncementBar() {
    if (!DOM.announcementBar || !DOM.closeAnnouncement) return;
    
    // Check if user has closed the announcement before
    const isClosed = getStorage('announcementClosed');
    
    if (isClosed) {
        addClass(DOM.announcementBar, 'hidden');
        return;
    }
    
    // Close announcement on button click
    DOM.closeAnnouncement.addEventListener('click', () => {
        addClass(DOM.announcementBar, 'hidden');
        setStorage('announcementClosed', true);
        
        // Update header position
        if (DOM.header) {
            DOM.header.style.top = '0';
        }
    });
}

/* ============================================
   5. HEADER & NAVIGATION
   ============================================ */
function initHeader() {
    if (!DOM.header) return;
    
    // Check announcement bar status on load
    const announcementHidden = DOM.announcementBar ? hasClass(DOM.announcementBar, 'hidden') : true;
    
    if (announcementHidden) {
        DOM.header.style.top = '0';
    }
}

/* ============================================
   6. MOBILE MENU
   ============================================ */
function initMobileMenu() {
    if (!DOM.navToggle || !DOM.navMenu) return;
    
    // Toggle mobile menu
    DOM.navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleClass(DOM.navToggle, 'active');
        toggleClass(DOM.navMenu, 'active');
        toggleClass(document.body, 'no-scroll');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (hasClass(DOM.navMenu, 'active')) {
            if (!DOM.navMenu.contains(e.target) && !DOM.navToggle.contains(e.target)) {
                removeClass(DOM.navToggle, 'active');
                removeClass(DOM.navMenu, 'active');
                removeClass(document.body, 'no-scroll');
            }
        }
    });
    
    // Close menu when clicking on nav links
    DOM.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Only close if it's not a dropdown toggle
            if (!hasClass(link.parentElement, 'dropdown')) {
                removeClass(DOM.navToggle, 'active');
                removeClass(DOM.navMenu, 'active');
                removeClass(document.body, 'no-scroll');
            }
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && hasClass(DOM.navMenu, 'active')) {
            removeClass(DOM.navToggle, 'active');
            removeClass(DOM.navMenu, 'active');
            removeClass(document.body, 'no-scroll');
        }
    });
    
    // Close menu on window resize (if going to desktop)
    window.addEventListener('resize', debounce(() => {
        if (window.innerWidth > 991 && hasClass(DOM.navMenu, 'active')) {
            removeClass(DOM.navToggle, 'active');
            removeClass(DOM.navMenu, 'active');
            removeClass(document.body, 'no-scroll');
        }
    }, 250));
}

/* ============================================
   7. DROPDOWN NAVIGATION (Mobile)
   ============================================ */
function initDropdownNav() {
    if (!DOM.dropdowns.length) return;
    
    DOM.dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        
        if (!toggle) return;
        
        toggle.addEventListener('click', (e) => {
            // Only handle click on mobile
            if (window.innerWidth <= 991) {
                e.preventDefault();
                e.stopPropagation();
                
                // Close other dropdowns
                DOM.dropdowns.forEach(other => {
                    if (other !== dropdown) {
                        removeClass(other, 'active');
                    }
                });
                
                // Toggle current dropdown
                toggleClass(dropdown, 'active');
            }
        });
    });
}

/* ============================================
   8. SMOOTH SCROLLING
   ============================================ */
function initSmoothScroll() {
    // Get all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerHeight = DOM.header ? DOM.header.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight - 20;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without triggering scroll
                history.pushState(null, null, href);
            }
        });
    });
}

/* ============================================
   9. STICKY HEADER
   ============================================ */
function initStickyHeader() {
    if (!DOM.header) return;
    
    const handleScroll = () => {
        if (window.scrollY > CONFIG.headerScrollOffset) {
            addClass(DOM.header, 'scrolled');
        } else {
            removeClass(DOM.header, 'scrolled');
        }
    };
    
    // Initial check
    handleScroll();
    
    // Listen for scroll events
    window.addEventListener('scroll', throttle(handleScroll, 100));
}

/* ============================================
   10. ACTIVE LINK HIGHLIGHTING
   ============================================ */
function initActiveLinks() {
    if (!DOM.navLinks.length) return;
    
    const sections = document.querySelectorAll('section[id]');
    
    const highlightActiveLink = () => {
        const scrollPosition = window.scrollY + DOM.header.offsetHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                DOM.navLinks.forEach(link => {
                    removeClass(link, 'active');
                    
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        addClass(link, 'active');
                    }
                });
            }
        });
    };
    
    window.addEventListener('scroll', throttle(highlightActiveLink, 100));
}

/* ============================================
   11. TYPING EFFECT
   ============================================ */
function initTypingEffect() {
    if (!DOM.typingText || !typingWords.length) return;
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    function type() {
        const currentWord = typingWords[wordIndex];
        
        if (isPaused) {
            setTimeout(type, CONFIG.typingPauseTime);
            isPaused = false;
            isDeleting = true;
            return;
        }
        
        if (isDeleting) {
            // Deleting characters
            DOM.typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % typingWords.length;
                setTimeout(type, 500);
                return;
            }
        } else {
            // Typing characters
            DOM.typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentWord.length) {
                isPaused = true;
            }
        }
        
        const speed = isDeleting ? CONFIG.typingDeleteSpeed : CONFIG.typingSpeed;
        setTimeout(type, speed);
    }
    
    // Start typing after a short delay
    setTimeout(type, 1000);
}

/* ============================================
   12. ANIMATED COUNTERS
   ============================================ */
function initCounters() {
    if (!DOM.counters.length) return;
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = CONFIG.counterDuration;
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            
            if (current < target) {
                counter.textContent = formatNumber(Math.floor(current));
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = formatNumber(target);
            }
        };
        
        updateCounter();
    };
    
    // Use Intersection Observer for triggering counters
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                
                if (!hasClass(counter, 'counted')) {
                    addClass(counter, 'counted');
                    animateCounter(counter);
                }
                
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);
    
    DOM.counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

/* ============================================
   13. COURSE FILTERS
   ============================================ */
function initCourseFilters() {
    if (!DOM.filterBtns.length || !DOM.courseCards.length) return;
    
    DOM.filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            DOM.filterBtns.forEach(b => removeClass(b, 'active'));
            
            // Add active class to clicked button
            addClass(btn, 'active');
            
            // Get filter value
            const filterValue = btn.getAttribute('data-filter');
            
            // Filter courses with animation
            DOM.courseCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // First, hide all cards
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'block';
                        
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, CONFIG.animationDuration);
            });
        });
    });
}

/* ============================================
   14. FAQ ACCORDION
   ============================================ */
function initFAQAccordion() {
    if (!DOM.faqItems.length) return;
    
    DOM.faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (!question || !answer) return;
        
        question.addEventListener('click', () => {
            const isActive = hasClass(item, 'active');
            
            // Close all other FAQ items (accordion behavior)
            DOM.faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    removeClass(otherItem, 'active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = '0';
                    }
                }
            });
            
            // Toggle current item
            if (isActive) {
                removeClass(item, 'active');
                answer.style.maxHeight = '0';
            } else {
                addClass(item, 'active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
    
    // Open first FAQ item by default
    if (DOM.faqItems[0]) {
        addClass(DOM.faqItems[0], 'active');
        const firstAnswer = DOM.faqItems[0].querySelector('.faq-answer');
        if (firstAnswer) {
            firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
        }
    }
}

/* ============================================
   15. MODAL FUNCTIONS
   ============================================ */
function initModal() {
    if (!DOM.enquiryModal) return;
    
    // Open modal
    const openModal = () => {
        addClass(DOM.enquiryModal, 'active');
        addClass(document.body, 'no-scroll');
    };
    
    // Close modal
    const closeModal = () => {
        removeClass(DOM.enquiryModal, 'active');
        removeClass(document.body, 'no-scroll');
    };
    
    // Open modal button
    if (DOM.openEnquiryModal) {
        DOM.openEnquiryModal.addEventListener('click', openModal);
    }
    
    // Also open modal for all elements with class 'open-enquiry-modal'
    document.querySelectorAll('.open-enquiry-modal').forEach(btn => {
        btn.addEventListener('click', openModal);
    });
    
    // Close modal button
    if (DOM.closeEnquiryModal) {
        DOM.closeEnquiryModal.addEventListener('click', closeModal);
    }
    
    // Close modal on overlay click
    DOM.enquiryModal.addEventListener('click', (e) => {
        if (e.target === DOM.enquiryModal) {
            closeModal();
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && hasClass(DOM.enquiryModal, 'active')) {
            closeModal();
        }
    });
}

/* ============================================
   16. SWIPER SLIDERS
   ============================================ */
function initSwipers() {
    // Testimonials Swiper
    const testimonialsSwiper = document.querySelector('.testimonials-swiper');
    
    if (testimonialsSwiper && typeof Swiper !== 'undefined') {
        new Swiper('.testimonials-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            pagination: {
                el: '.testimonial-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.testimonial-next',
                prevEl: '.testimonial-prev'
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 25
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            },
            grabCursor: true,
            effect: 'slide'
        });
    }
    
    // Partners Swiper
    const partnersSwiper = document.querySelector('.partners-swiper');
    
    if (partnersSwiper && typeof Swiper !== 'undefined') {
        new Swiper('.partners-swiper', {
            slidesPerView: 2,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false
            },
            speed: 800,
            breakpoints: {
                480: {
                    slidesPerView: 3,
                    spaceBetween: 20
                },
                640: {
                    slidesPerView: 4,
                    spaceBetween: 25
                },
                768: {
                    slidesPerView: 5,
                    spaceBetween: 30
                },
                1024: {
                    slidesPerView: 6,
                    spaceBetween: 30
                }
            },
            grabCursor: true
        });
    }
}

/* ============================================
   17. GLIGHTBOX GALLERY
   ============================================ */
function initGLightbox() {
    if (typeof GLightbox !== 'undefined') {
        const lightbox = GLightbox({
            selector: '.glightbox',
            touchNavigation: true,
            loop: true,
            autoplayVideos: true,
            closeOnOutsideClick: true,
            openEffect: 'zoom',
            closeEffect: 'fade',
            cssEfects: {
                fade: { in: 'fadeIn', out: 'fadeOut' },
                zoom: { in: 'zoomIn', out: 'zoomOut' }
            }
        });
    }
}

/* ============================================
   18. COUNTDOWN TIMER
   ============================================ */
function initCountdown() {
    if (!DOM.countdownTimer) return;
    
    const targetDate = DOM.countdownTimer.getAttribute('data-target-date');
    
    if (!targetDate) return;
    
    const countdownDate = new Date(targetDate).getTime();
    
    const daysEl = document.getElementById('countdown-days');
    const hoursEl = document.getElementById('countdown-hours');
    const minutesEl = document.getElementById('countdown-minutes');
    const secondsEl = document.getElementById('countdown-seconds');
    
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        if (distance < 0) {
            // Countdown finished
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        daysEl.textContent = days.toString().padStart(2, '0');
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
    }
    
    // Initial update
    updateCountdown();
    
    // Update every second
    setInterval(updateCountdown, 1000);
}
/* ============================================
   19. FORM VALIDATION
   ============================================ */
function initFormValidation() {
    // Get all forms that need validation
    const forms = [DOM.heroForm, DOM.quickEnquiryForm, DOM.contactForm];
    
    forms.forEach(form => {
        if (!form) return;
        
        form.addEventListener('submit', handleFormSubmit);
        
        // Real-time validation on input
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (hasClass(input.parentElement, 'error')) {
                    validateField(input);
                }
            });
        });
    });
}

/**
 * Validate individual form field
 */
function validateField(field) {
    const formGroup = field.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    let isValid = true;
    let message = '';
    
    // Remove previous error state
    removeClass(formGroup, 'error');
    removeClass(formGroup, 'success');
    
    // Check if required
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        message = 'This field is required';
    }
    
    // Email validation
    if (field.type === 'email' && field.value.trim()) {
        if (!isValidEmail(field.value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && field.value.trim()) {
        const cleanPhone = field.value.replace(/\D/g, '');
        if (!isValidPhone(cleanPhone)) {
            isValid = false;
            message = 'Please enter a valid 10-digit mobile number';
        }
    }
    
    // Name validation (minimum 2 characters)
    if (field.name === 'name' && field.value.trim()) {
        if (field.value.trim().length < 2) {
            isValid = false;
            message = 'Name must be at least 2 characters';
        }
    }
    
    // Select validation
    if (field.tagName === 'SELECT' && field.hasAttribute('required')) {
        if (!field.value) {
            isValid = false;
            message = 'Please select an option';
        }
    }
    
    // Message validation (minimum 10 characters if required)
    if (field.name === 'message' && field.hasAttribute('required') && field.value.trim()) {
        if (field.value.trim().length < 10) {
            isValid = false;
            message = 'Message must be at least 10 characters';
        }
    }
    
    // Update UI based on validation
    if (!isValid) {
        addClass(formGroup, 'error');
        if (errorMessage) {
            errorMessage.textContent = message;
        }
    } else if (field.value.trim()) {
        addClass(formGroup, 'success');
    }
    
    return isValid;
}

/**
 * Handle form submission
 */
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    let isFormValid = true;
    
    // Validate all fields
    inputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });
    
    if (!isFormValid) {
        // Scroll to first error
        const firstError = form.querySelector('.form-group.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        
        // Shake the submit button
        addClass(submitBtn, 'shake');
        setTimeout(() => removeClass(submitBtn, 'shake'), 500);
        
        return;
    }
    
    // Disable submit button and show loading state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    addClass(submitBtn, 'btn-loading');
    submitBtn.innerHTML = '<span>Sending...</span>';
    
    // Collect form data
    const formData = new FormData(form);
    const formAction = form.getAttribute('action');
    
    // Check if form action is a valid URL
    if (!formAction || formAction === 'https://formspree.io/mldqkqyy') {
        // Simulate form submission for demo
        simulateFormSubmission(form, submitBtn, originalBtnText);
        return;
    }
    
    // Submit form via fetch (for Formspree, Google Forms, etc.)
    fetch(formAction, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            showFormSuccess(form, submitBtn, originalBtnText);
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        console.error('Form Error:', error);
        showFormError(form, submitBtn, originalBtnText);
    });
}

/**
 * Simulate form submission (for demo purposes)
 */
function simulateFormSubmission(form, submitBtn, originalBtnText) {
    setTimeout(() => {
        showFormSuccess(form, submitBtn, originalBtnText);
    }, 2000);
}

/**
 * Show form success message
 */
function showFormSuccess(form, submitBtn, originalBtnText) {
    // Reset button
    submitBtn.disabled = false;
    removeClass(submitBtn, 'btn-loading');
    submitBtn.innerHTML = '<span>✓ Submitted Successfully!</span>';
    addClass(submitBtn, 'btn-success');
    
    // Show success notification
    showNotification('success', 'Thank you! Your message has been sent successfully. We will contact you soon.');
    
    // Reset form after delay
    setTimeout(() => {
        form.reset();
        submitBtn.innerHTML = originalBtnText;
        removeClass(submitBtn, 'btn-success');
        
        // Remove all success/error classes
        form.querySelectorAll('.form-group').forEach(group => {
            removeClass(group, 'success');
            removeClass(group, 'error');
        });
        
        // Close modal if it's the enquiry form
        if (form.id === 'quickEnquiryForm' && DOM.enquiryModal) {
            removeClass(DOM.enquiryModal, 'active');
            removeClass(document.body, 'no-scroll');
        }
    }, 3000);
}

/**
 * Show form error message
 */
function showFormError(form, submitBtn, originalBtnText) {
    // Reset button
    submitBtn.disabled = false;
    removeClass(submitBtn, 'btn-loading');
    submitBtn.innerHTML = originalBtnText;
    
    // Show error notification
    showNotification('error', 'Oops! Something went wrong. Please try again or contact us directly.');
}

/**
 * Show notification toast
 */
function showNotification(type, message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification-toast');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification-toast notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class='bx ${type === 'success' ? 'bxs-check-circle' : 'bxs-error-circle'}'></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class='bx bx-x'></i></button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        max-width: 400px;
        padding: 16px 20px;
        background: ${type === 'success' ? '#10B981' : '#EF4444'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        z-index: 9999;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Close button handler
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: rgba(255,255,255,0.2);
        border: none;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: white;
        font-size: 1.2rem;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations to document
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    .notification-toast .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .notification-toast .notification-content i {
        font-size: 1.5rem;
    }
    .notification-toast .notification-content span {
        font-size: 14px;
        line-height: 1.4;
    }
    .btn-success {
        background: linear-gradient(135deg, #10B981 0%, #34D399 100%) !important;
        border-color: #10B981 !important;
    }
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-5px); }
        40%, 80% { transform: translateX(5px); }
    }
    .shake { animation: shake 0.5s ease; }
`;
document.head.appendChild(notificationStyles);

/* ============================================
   20. BACK TO TOP BUTTON
   ============================================ */
function initBackToTop() {
    if (!DOM.backToTop) return;
    
    // Show/hide button based on scroll position
    const toggleBackToTop = () => {
        if (window.scrollY > 500) {
            addClass(DOM.backToTop, 'visible');
        } else {
            removeClass(DOM.backToTop, 'visible');
        }
    };
    
    // Initial check
    toggleBackToTop();
    
    // Listen for scroll
    window.addEventListener('scroll', throttle(toggleBackToTop, 100));
    
    // Scroll to top on click
    DOM.backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ============================================
   21. AOS INITIALIZATION
   ============================================ */
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100,
            delay: 0,
            disable: function() {
                // Disable on mobile if needed for performance
                return window.innerWidth < 768 && false; // Set to true to disable on mobile
            }
        });
        
        // Refresh AOS on window resize
        window.addEventListener('resize', debounce(() => {
            AOS.refresh();
        }, 250));
    }
}

/* ============================================
   22. LAZY LOADING IMAGES
   ============================================ */
function initLazyLoading() {
    // Check for native lazy loading support
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    img.removeAttribute('loading');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

/* ============================================
   23. RAZORPAY PAYMENT INTEGRATION
   ============================================ */
function initRazorpay() {
    // Get all payment buttons
    const paymentButtons = document.querySelectorAll('.btn-payment, [data-payment]');
    
    paymentButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const amount = btn.getAttribute('data-amount') || '1000';
            const courseName = btn.getAttribute('data-course') || 'Course Enrollment';
            const description = btn.getAttribute('data-description') || 'Payment for course enrollment';
            
            initiatePayment(amount, courseName, description);
        });
    });
}

/**
 * Initiate Razorpay payment
 */
function initiatePayment(amount, courseName, description) {
    // Check if Razorpay is loaded
    if (typeof Razorpay === 'undefined') {
        showNotification('error', 'Payment system is not available. Please try again later.');
        return;
    }
    
    // Razorpay options
    const options = {
        key: 'rzp_test_YOUR_KEY_HERE', // Replace with your Razorpay Key ID
        amount: parseInt(amount) * 100, // Amount in paise
        currency: 'INR',
        name: 'UB Institute & Training',
        description: description,
        image: 'https://via.placeholder.com/150x150/1E3A8A/FFFFFF?text=UB',
        handler: function(response) {
            // Payment successful
            handlePaymentSuccess(response, courseName, amount);
        },
        prefill: {
            name: '',
            email: '',
            contact: ''
        },
        notes: {
            course_name: courseName,
            address: 'UB Institute & Training'
        },
        theme: {
            color: '#1E3A8A'
        },
        modal: {
            ondismiss: function() {
                showNotification('info', 'Payment cancelled. You can try again anytime.');
            }
        }
    };
    
    // Create Razorpay instance and open payment modal
    try {
        const rzp = new Razorpay(options);
        rzp.open();
        
        rzp.on('payment.failed', function(response) {
            handlePaymentFailure(response);
        });
    } catch (error) {
        console.error('Razorpay Error:', error);
        showNotification('error', 'Could not initialize payment. Please try again.');
    }
}

/**
 * Handle successful payment
 */
function handlePaymentSuccess(response, courseName, amount) {
    console.log('Payment Success:', response);
    
    // Show success message
    showNotification('success', `Payment successful! Payment ID: ${response.razorpay_payment_id}`);
    
    // You can send this data to your server for verification
    const paymentData = {
        payment_id: response.razorpay_payment_id,
        course_name: courseName,
        amount: amount,
        timestamp: new Date().toISOString()
    };
    
    // Store in localStorage for demo (In production, send to server)
    const payments = getStorage('ub_payments') || [];
    payments.push(paymentData);
    setStorage('ub_payments', payments);
    
    // Optionally redirect to success page
    // window.location.href = 'payment-success.html?payment_id=' + response.razorpay_payment_id;
}

/**
 * Handle payment failure
 */
function handlePaymentFailure(response) {
    console.error('Payment Failed:', response.error);
    
    showNotification('error', `Payment failed: ${response.error.description}. Please try again.`);
}

/* ============================================
   24. NEWSLETTER FORM HANDLER
   ============================================ */
function initNewsletterForms() {
    if (!DOM.newsletterForms.length) return;
    
    DOM.newsletterForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = form.querySelector('input[type="email"]');
            const submitBtn = form.querySelector('button[type="submit"]');
            
            if (!emailInput || !submitBtn) return;
            
            const email = emailInput.value.trim();
            
            // Validate email
            if (!email || !isValidEmail(email)) {
                showNotification('error', 'Please enter a valid email address.');
                emailInput.focus();
                return;
            }
            
            // Show loading state
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Subscribing...</span>';
            
            // Simulate subscription (replace with actual API call)
            setTimeout(() => {
                // Store email in localStorage (demo)
                const subscribers = getStorage('ub_newsletter') || [];
                
                if (subscribers.includes(email)) {
                    showNotification('info', 'You are already subscribed to our newsletter.');
                } else {
                    subscribers.push(email);
                    setStorage('ub_newsletter', subscribers);
                    showNotification('success', 'Thank you for subscribing! You\'ll receive our latest updates.');
                }
                
                // Reset form
                form.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                
            }, 1500);
        });
    });
}

/* ============================================
   25. DOWNLOAD BROCHURE
   ============================================ */
function initBrochureDownload() {
    const downloadBtn = document.getElementById('downloadBrochure');
    const brochureLinks = document.querySelectorAll('.download-brochure, [data-brochure]');
    
    const handleDownload = (e) => {
        e.preventDefault();
        
        // Check if user info exists in localStorage
        const userInfo = getStorage('ub_user_info');
        
        if (userInfo) {
            // User already provided info, proceed with download
            proceedWithDownload();
        } else {
            // Show form to collect user info before download
            showDownloadForm();
        }
    };
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', handleDownload);
    }
    
    brochureLinks.forEach(link => {
        link.addEventListener('click', handleDownload);
    });
}

/**
 * Show download form modal
 */
function showDownloadForm() {
    // Create modal for collecting user info
    const modal = document.createElement('div');
    modal.className = 'download-modal-overlay';
    modal.innerHTML = `
        <div class="download-modal">
            <button class="download-modal-close"><i class='bx bx-x'></i></button>
            <div class="download-modal-header">
                <i class='bx bxs-file-pdf'></i>
                <h3>Download Brochure</h3>
                <p>Please provide your details to download the brochure</p>
            </div>
            <form class="download-form" id="brochureDownloadForm">
                <div class="form-group">
                    <input type="text" name="name" placeholder="Your Name *" required>
                </div>
                <div class="form-group">
                    <input type="tel" name="phone" placeholder="Mobile Number *" required pattern="[0-9]{10}">
                </div>
                <div class="form-group">
                    <input type="email" name="email" placeholder="Email Address *" required>
                </div>
                <button type="submit" class="btn btn-primary btn-full">
                    <i class='bx bx-download'></i>
                    <span>Download Now</span>
                </button>
            </form>
        </div>
    `;
    
    // Add styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        padding: 20px;
        animation: fadeIn 0.3s ease;
    `;
    
    const modalContent = modal.querySelector('.download-modal');
    modalContent.style.cssText = `
        background: white;
        border-radius: 16px;
        padding: 30px;
        max-width: 400px;
        width: 100%;
        position: relative;
        animation: zoomIn 0.3s ease;
    `;
    
    // Add to DOM
    document.body.appendChild(modal);
    addClass(document.body, 'no-scroll');
    
    // Close button
    const closeBtn = modal.querySelector('.download-modal-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: 15px;
        right: 15px;
        background: #f3f4f6;
        border: none;
        border-radius: 50%;
        width: 35px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 1.3rem;
        color: #666;
    `;
    
    closeBtn.addEventListener('click', () => {
        modal.remove();
        removeClass(document.body, 'no-scroll');
    });
    
    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            removeClass(document.body, 'no-scroll');
        }
    });
    
    // Handle form submission
    const form = modal.querySelector('#brochureDownloadForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const userData = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            timestamp: new Date().toISOString()
        };
        
        // Store user info
        setStorage('ub_user_info', userData);
        
        // Store lead
        const leads = getStorage('ub_leads') || [];
        leads.push({ ...userData, source: 'brochure_download' });
        setStorage('ub_leads', leads);
        
        // Close modal and proceed with download
        modal.remove();
        removeClass(document.body, 'no-scroll');
        
        proceedWithDownload();
    });
}

/**
 * Proceed with brochure download
 */
function proceedWithDownload() {
    showNotification('success', 'Your brochure download is starting...');
    
    // Replace with actual brochure URL
    const brochureUrl = 'assets/documents/UB-Institute-Brochure.pdf';
    
    // Create temporary link and trigger download
    const link = document.createElement('a');
    link.href = brochureUrl;
    link.download = 'UB-Institute-Brochure.pdf';
    link.target = '_blank';
    
    // For demo, just open placeholder
    // In production, this would download the actual PDF
    window.open('https://drive.google.com/file/d/1eC5n6pDM2CFJ3we-YBBLT7009ou-xGvq/view?usp=sharing', '_blank');
    
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
}

/* ============================================
   26. CURRENT YEAR UPDATE
   ============================================ */
function initCurrentYear() {
    if (DOM.currentYear) {
        DOM.currentYear.textContent = new Date().getFullYear();
    }
}

/* ============================================
   27. SCROLL REVEAL ANIMATIONS
   ============================================ */
function initScrollReveal() {
    // Elements to animate on scroll
    const revealElements = document.querySelectorAll('.reveal, [data-reveal]');
    
    if (!revealElements.length) return;
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                addClass(entry.target, 'revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
}

/* ============================================
   28. PHONE NUMBER FORMATTER
   ============================================ */
function initPhoneFormatter() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            // Remove non-numeric characters
            let value = e.target.value.replace(/\D/g, '');
            
            // Limit to 10 digits
            if (value.length > 10) {
                value = value.slice(0, 10);
            }
            
            e.target.value = value;
        });
        
        // Prevent non-numeric input
        input.addEventListener('keypress', (e) => {
            if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
                e.preventDefault();
            }
        });
    });
}

/* ============================================
   29. COURSE ENROLLMENT HANDLER
   ============================================ */
function initCourseEnrollment() {
    const enrollButtons = document.querySelectorAll('.btn-enroll, [data-enroll]');
    
    enrollButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const courseName = btn.getAttribute('data-course') || 'Unknown Course';
            const coursePrice = btn.getAttribute('data-price') || '0';
            
            // Store selected course
            setStorage('ub_selected_course', {
                name: courseName,
                price: coursePrice,
                timestamp: new Date().toISOString()
            });
            
            // Open enquiry modal or redirect to enrollment page
            if (DOM.enquiryModal) {
                addClass(DOM.enquiryModal, 'active');
                addClass(document.body, 'no-scroll');
                
                // Pre-select course in modal form
                const courseSelect = DOM.enquiryModal.querySelector('select[name="course"]');
                if (courseSelect) {
                    const option = Array.from(courseSelect.options).find(opt => 
                        opt.value.toLowerCase().includes(courseName.toLowerCase())
                    );
                    if (option) {
                        courseSelect.value = option.value;
                    }
                }
            }
        });
    });
}

/* ============================================
   30. WHATSAPP CHAT HANDLER
   ============================================ */
function initWhatsAppChat() {
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    
    if (!whatsappBtn) return;
    
    // Track WhatsApp clicks
    whatsappBtn.addEventListener('click', () => {
        const clicks = getStorage('ub_whatsapp_clicks') || 0;
        setStorage('ub_whatsapp_clicks', clicks + 1);
    });
}

/* ============================================
   31. PRINT PAGE HANDLER
   ============================================ */
function initPrintHandler() {
    const printButtons = document.querySelectorAll('.btn-print, [data-print]');
    
    printButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.print();
        });
    });
}

/* ============================================
   32. KEYBOARD ACCESSIBILITY
   ============================================ */
function initKeyboardAccessibility() {
    // Add keyboard navigation for custom elements
    const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    // Handle Enter key on clickable elements
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.matches('[role="button"]')) {
            e.target.click();
        }
    });
    
    // Skip to main content link
    const skipLink = document.querySelector('.skip-to-main');
    if (skipLink) {
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            const main = document.querySelector('main, #main, .main-content');
            if (main) {
                main.focus();
                main.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

/* ============================================
   33. ERROR HANDLING
   ============================================ */
function initErrorHandling() {
    // Global error handler
    window.onerror = function(message, source, lineno, colno, error) {
        console.error('Global Error:', { message, source, lineno, colno, error });
        return false;
    };
    
    // Promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled Promise Rejection:', event.reason);
    });
}

/* ============================================
   34. PERFORMANCE MONITORING
   ============================================ */
function initPerformanceMonitoring() {
    // Log page load performance
    window.addEventListener('load', () => {
        if (window.performance) {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            const domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
            
            console.log('Performance Metrics:', {
                pageLoadTime: `${pageLoadTime}ms`,
                domReadyTime: `${domReadyTime}ms`
            });
        }
    });
}

/* ============================================
   MASTER INITIALIZATION
   ============================================ */
function init() {
    console.log('🚀 UB Institute Website Initializing...');
    
    // Core functionality
    initPreloader();
    initAnnouncementBar();
    initHeader();
    initMobileMenu();
    initDropdownNav();
    initSmoothScroll();
    initStickyHeader();
    initActiveLinks();
    
    // Interactive features
    initTypingEffect();
    initCounters();
    initCourseFilters();
    initFAQAccordion();
    initModal();
    
    // Third-party libraries
    initSwipers();
    initGLightbox();
    initAOS();
    
    // Forms and validation
    initFormValidation();
    initNewsletterForms();
    initPhoneFormatter();
    
    // Special features
    initCountdown();
    initBackToTop();
    initLazyLoading();
    initRazorpay();
    initBrochureDownload();
    initCourseEnrollment();
    initWhatsAppChat();
    
    // Accessibility and utilities
    initKeyboardAccessibility();
    initCurrentYear();
    initScrollReveal();
    initPrintHandler();
    
    // Error handling and monitoring
    initErrorHandling();
    initPerformanceMonitoring();
    
    console.log('✅ UB Institute Website Initialized Successfully!');
}

/* ============================================
   DOM CONTENT LOADED
   ============================================ */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    // DOM already loaded
    init();
}

/* ============================================
   WINDOW LOAD (for images and resources)
   ============================================ */
window.addEventListener('load', () => {
    // Additional initialization after all resources loaded
    console.log('📦 All resources loaded');
    
    // Refresh AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
});

/* ============================================
   EXPOSE FUNCTIONS GLOBALLY (if needed)
   ============================================ */
window.UBInstitute = {
    showNotification,
    initiatePayment,
    openModal: () => {
        if (DOM.enquiryModal) {
            addClass(DOM.enquiryModal, 'active');
            addClass(document.body, 'no-scroll');
        }
    },
    closeModal: () => {
        if (DOM.enquiryModal) {
            removeClass(DOM.enquiryModal, 'active');
            removeClass(document.body, 'no-scroll');
        }
    }
};

/* ============================================
   END OF MAIN.JS
   ============================================ */

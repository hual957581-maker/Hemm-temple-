// Main JavaScript for Khedapati Sarkar Mandir Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initGallery();
    initScrollEffects();
    initDonationButtons();
    initLiveDarshan();
    initContactForm();
    initAnimations();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Gallery functionality
function initGallery() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const galleryGrid = document.getElementById('gallery-grid');

    // Gallery data
    const galleryData = {
        deity: [
            { title: 'श्री हनुमान जी', subtitle: 'Shri Hanuman Ji', icon: '🙏' },
            { title: 'मंदिर दर्शन', subtitle: 'Temple Darshan', icon: '🏛️' },
            { title: 'आरती दृश्य', subtitle: 'Aarti View', icon: '🕯️' },
            { title: 'मूर्ति विशेष', subtitle: 'Special Idol', icon: '✨' },
            { title: 'पूजा कक्ष', subtitle: 'Prayer Hall', icon: '🕌' },
            { title: 'श्रृंगार', subtitle: 'Decoration', icon: '🌸' }
        ],
        festivals: [
            { title: 'नवरात्रि', subtitle: 'Navratri', icon: '🪔' },
            { title: 'राम नवमी', subtitle: 'Ram Navami', icon: '🌸' },
            { title: 'हनुमान जयंती', subtitle: 'Hanuman Jayanti', icon: '🙏' },
            { title: 'दीपावली', subtitle: 'Diwali', icon: '🪔' },
            { title: 'होली', subtitle: 'Holi', icon: '🎨' },
            { title: 'जन्माष्टमी', subtitle: 'Janmashtami', icon: '🎉' }
        ],
        community: [
            { title: 'भक्त समुदाय', subtitle: 'Devotee Community', icon: '👥' },
            { title: 'सेवा कार्य', subtitle: 'Service Activities', icon: '🤝' },
            { title: 'युवा समूह', subtitle: 'Youth Group', icon: '👨‍👩‍👧‍👦' },
            { title: 'महिला मंडल', subtitle: 'Women Group', icon: '👩' },
            { title: 'बच्चे', subtitle: 'Children', icon: '👶' },
            { title: 'वृद्धजन', subtitle: 'Elderly', icon: '👴' }
        ]
    };

    // Function to render gallery items
    function renderGallery(category) {
        const items = galleryData[category] || [];
        galleryGrid.innerHTML = items.map(item => `
            <div class="gallery-item">
                <div>
                    <div style="font-size: 2rem; margin-bottom: 0.5rem;">${item.icon}</div>
                    <div style="font-size: 0.9rem; font-weight: 600;">${item.title}</div>
                    <div style="font-size: 0.8rem; opacity: 0.8;">${item.subtitle}</div>
                </div>
            </div>
        `).join('');
    }

    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get category and render gallery
            const category = this.getAttribute('data-tab');
            renderGallery(category);
        });
    });

    // Initialize with first tab
    renderGallery('deity');
}

// Scroll effects
function initScrollEffects() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.quick-link, .timing-item, .event-card, .seva-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Donation buttons functionality
function initDonationButtons() {
    const donationButtons = document.querySelectorAll('.btn-donation');
    
    donationButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sevaCard = this.closest('.seva-card');
            const sevaName = sevaCard.querySelector('h3').textContent;
            
            // Show donation modal or redirect to payment
            showDonationModal(sevaName);
        });
    });
}

// Donation modal
function showDonationModal(sevaName) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'donation-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${sevaName} - दान सेवा</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>आपकी भक्ति और दान सेवा के लिए धन्यवाद। कृपया दान राशि चुनें:</p>
                    <div class="donation-amounts">
                        <button class="amount-btn" data-amount="101">₹101</button>
                        <button class="amount-btn" data-amount="251">₹251</button>
                        <button class="amount-btn" data-amount="501">₹501</button>
                        <button class="amount-btn" data-amount="1001">₹1001</button>
                        <button class="amount-btn" data-amount="2501">₹2501</button>
                        <button class="amount-btn" data-amount="5001">₹5001</button>
                    </div>
                    <div class="custom-amount">
                        <label for="custom-amount">अन्य राशि:</label>
                        <input type="number" id="custom-amount" placeholder="Enter amount">
                    </div>
                    <div class="donor-info">
                        <input type="text" placeholder="नाम / Name" required>
                        <input type="email" placeholder="ईमेल / Email">
                        <input type="tel" placeholder="फोन / Phone">
                    </div>
                    <button class="btn btn-primary proceed-payment">दान करें / Donate</button>
                </div>
            </div>
        </div>
    `;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .donation-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
        }
        .modal-overlay {
            background: rgba(0, 0, 0, 0.5);
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .modal-content {
            background: white;
            border-radius: 15px;
            max-width: 500px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 1px solid #e5e7eb;
        }
        .modal-header h3 {
            color: #FF6B35;
            margin: 0;
        }
        .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #6b7280;
        }
        .modal-body {
            padding: 1.5rem;
        }
        .donation-amounts {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0.5rem;
            margin: 1rem 0;
        }
        .amount-btn {
            padding: 0.75rem;
            border: 2px solid #e5e7eb;
            background: white;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s;
        }
        .amount-btn:hover,
        .amount-btn.selected {
            border-color: #FF6B35;
            background: #FF6B35;
            color: white;
        }
        .custom-amount {
            margin: 1rem 0;
        }
        .custom-amount input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            margin-top: 0.5rem;
        }
        .donor-info {
            margin: 1rem 0;
        }
        .donor-info input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            margin: 0.5rem 0;
        }
        .proceed-payment {
            width: 100%;
            margin-top: 1rem;
        }
    `;
    document.head.appendChild(style);

    // Add modal to page
    document.body.appendChild(modal);

    // Amount selection
    const amountButtons = modal.querySelectorAll('.amount-btn');
    amountButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            amountButtons.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Close modal
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        document.head.removeChild(style);
    });
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        }
    });

    // Proceed payment
    const proceedBtn = modal.querySelector('.proceed-payment');
    proceedBtn.addEventListener('click', function() {
        const selectedAmount = modal.querySelector('.amount-btn.selected')?.dataset.amount || 
                             modal.querySelector('#custom-amount').value;
        
        if (!selectedAmount) {
            alert('कृपया दान राशि चुनें / Please select donation amount');
            return;
        }

        // Simulate payment processing
        this.innerHTML = '<span class="loading"></span> Processing...';
        this.disabled = true;

        setTimeout(() => {
            alert(`धन्यवाद! ₹${selectedAmount} का दान सफलतापूर्वक प्राप्त हुआ।\nThank you! Donation of ₹${selectedAmount} received successfully.`);
            document.body.removeChild(modal);
            document.head.removeChild(style);
        }, 2000);
    });
}

// Live Darshan functionality
function initLiveDarshan() {
    const reminderBtn = document.querySelector('.live-darshan .btn-primary');
    
    if (reminderBtn) {
        reminderBtn.addEventListener('click', function() {
            // Check if browser supports notifications
            if ('Notification' in window) {
                if (Notification.permission === 'granted') {
                    showReminderOptions();
                } else if (Notification.permission !== 'denied') {
                    Notification.requestPermission().then(permission => {
                        if (permission === 'granted') {
                            showReminderOptions();
                        }
                    });
                } else {
                    alert('Notifications are blocked. Please enable them in your browser settings.');
                }
            } else {
                alert('Your browser does not support notifications.');
            }
        });
    }
}

// Show reminder options
function showReminderOptions() {
    const modal = document.createElement('div');
    modal.className = 'reminder-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>🔔 Aarti Reminder</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Select which aarti you want to be reminded about:</p>
                    <div class="reminder-options">
                        <label><input type="checkbox" value="mangala"> मंगला आरती (5:30 AM)</label>
                        <label><input type="checkbox" value="rajbhog"> राजभोग आरती (12:00 PM)</label>
                        <label><input type="checkbox" value="sandhya"> संध्या आरती (7:00 PM)</label>
                        <label><input type="checkbox" value="shayan"> शयन आरती (9:00 PM)</label>
                    </div>
                    <button class="btn btn-primary set-reminder">Set Reminder</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal
    modal.querySelector('.modal-close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    // Set reminder
    modal.querySelector('.set-reminder').addEventListener('click', function() {
        const selected = Array.from(modal.querySelectorAll('input:checked')).map(cb => cb.value);
        
        if (selected.length === 0) {
            alert('Please select at least one aarti time.');
            return;
        }

        // Set up notifications (simplified version)
        selected.forEach(aarti => {
            const times = {
                'mangala': '05:30',
                'rajbhog': '12:00',
                'sandhya': '19:00',
                'shayan': '21:00'
            };
            
            // In a real implementation, you would use a service worker or web push API
            console.log(`Reminder set for ${aarti} aarti at ${times[aarti]}`);
        });

        alert('Reminders set successfully! You will be notified before each selected aarti time.');
        document.body.removeChild(modal);
    });
}

// Contact form functionality
function initContactForm() {
    // Add contact form if needed
    const contactSection = document.querySelector('#contact');
    
    // Add WhatsApp click tracking
    const whatsappBtn = document.querySelector('.whatsapp-float a');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            // Track WhatsApp clicks (analytics)
            console.log('WhatsApp contact clicked');
        });
    }
}

// Initialize animations
function initAnimations() {
    // Add entrance animations to elements
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.section-title, .about-text, .timing-item, .event-card');
        
        elements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                el.classList.add('animate-in');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
}

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount);
}

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Service Worker registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Performance monitoring
window.addEventListener('load', function() {
    // Log page load time
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
});

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // ESC key closes modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.donation-modal, .reminder-modal');
        modals.forEach(modal => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        });
    }
});

// Add focus management for modals
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Initialize focus trapping for any modals
document.addEventListener('DOMContentLoaded', function() {
    const modals = document.querySelectorAll('.modal-content');
    modals.forEach(trapFocus);
});

// Add loading states for buttons
function addLoadingState(button, text = 'Loading...') {
    const originalText = button.innerHTML;
    button.innerHTML = `<span class="loading"></span> ${text}`;
    button.disabled = true;
    
    return function removeLoadingState() {
        button.innerHTML = originalText;
        button.disabled = false;
    };
}

// Export functions for global use
window.KhedapatiMandir = {
    formatCurrency,
    formatTime,
    addLoadingState,
    showDonationModal
};
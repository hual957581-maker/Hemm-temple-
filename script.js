// Temple Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(255, 153, 51, 0.1)';
        }

        lastScrollTop = scrollTop;
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll to top button
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Gallery tabs functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const galleryGrids = document.querySelectorAll('.gallery-grid');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all gallery grids
            galleryGrids.forEach(grid => {
                grid.style.display = 'none';
            });
            
            // Show target gallery grid
            const targetGrid = document.getElementById(targetTab + '-gallery');
            if (targetGrid) {
                targetGrid.style.display = 'grid';
            }
        });
    });

    // Form submission handling
    const pujaBookingForm = document.getElementById('puja-booking-form');
    
    pujaBookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const bookingData = Object.fromEntries(formData);
        
        // Show success message (in a real implementation, this would send data to server)
        showNotification('🙏 Your puja booking request has been submitted successfully! We will contact you soon.', 'success');
        
        // Reset form
        this.reset();
    });

    // Donation button handlers
    const donationButtons = document.querySelectorAll('.seva-card .btn');
    
    donationButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const sevaName = this.closest('.seva-card').querySelector('h3').textContent;
            showNotification(`🙏 Thank you for your interest in ${sevaName}. Payment gateway integration coming soon!`, 'info');
        });
    });

    // Set reminder for live darshan
    const reminderBtn = document.querySelector('.live-darshan .btn');
    if (reminderBtn) {
        reminderBtn.addEventListener('click', function() {
            showNotification('🔔 Reminder set! We will notify you when live darshan is available.', 'success');
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add to body
        document.body.appendChild(notification);

        // Position and show
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Auto remove after 5 seconds
        setTimeout(() => {
            removeNotification(notification);
        }, 5000);

        // Close button handler
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            removeNotification(notification);
        });
    }

    function removeNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // Add notification styles to head
    const notificationStyles = `
        <style>
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            max-width: 400px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 10000;
            transform: translateX(450px);
            transition: all 0.3s ease;
            border-left: 4px solid #FF9933;
        }

        .notification.show {
            transform: translateX(0);
        }

        .notification-success {
            border-left-color: #28a745;
        }

        .notification-info {
            border-left-color: #17a2b8;
        }

        .notification-warning {
            border-left-color: #ffc107;
        }

        .notification-error {
            border-left-color: #dc3545;
        }

        .notification-content {
            padding: 1rem 1.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }

        .notification-message {
            flex: 1;
            font-size: 0.9rem;
            line-height: 1.4;
        }

        .notification-close {
            background: none;
            border: none;
            font-size: 1.2rem;
            color: #999;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .notification-close:hover {
            color: #333;
        }

        @media (max-width: 480px) {
            .notification {
                right: 10px;
                left: 10px;
                max-width: none;
                transform: translateY(-120px);
            }

            .notification.show {
                transform: translateY(0);
            }
        }
        </style>
    `;

    document.head.insertAdjacentHTML('beforeend', notificationStyles);

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.quick-link, .about-card, .timing-card, .event-card, .seva-card, .contact-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Add animation styles
    const animationStyles = `
        <style>
        .quick-link, .about-card, .timing-card, .event-card, .seva-card, .contact-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }

        .quick-link.animate-in, .about-card.animate-in, .timing-card.animate-in, 
        .event-card.animate-in, .seva-card.animate-in, .contact-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }

        .quick-link:nth-child(2).animate-in {
            transition-delay: 0.1s;
        }

        .quick-link:nth-child(3).animate-in {
            transition-delay: 0.2s;
        }

        .quick-link:nth-child(4).animate-in {
            transition-delay: 0.3s;
        }
        </style>
    `;

    document.head.insertAdjacentHTML('beforeend', animationStyles);

    // Current time display for aarti timings
    function updateCurrentTime() {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentTime = currentHour * 60 + currentMinute;

        const aartiTimes = [
            { name: 'Mangala Aarti', time: 5 * 60 + 30, element: null },
            { name: 'Rajbhog Aarti', time: 12 * 60, element: null },
            { name: 'Sandhya Aarti', time: 19 * 60, element: null },
            { name: 'Shayan Aarti', time: 21 * 60, element: null }
        ];

        // Find timing cards
        const timingCards = document.querySelectorAll('.timing-card');
        timingCards.forEach((card, index) => {
            if (index < aartiTimes.length) {
                aartiTimes[index].element = card;
            }
        });

        // Check if any aarti is happening now (within 30 minutes)
        aartiTimes.forEach(aarti => {
            if (aarti.element) {
                const timeDiff = Math.abs(currentTime - aarti.time);
                
                if (timeDiff <= 30) {
                    aarti.element.classList.add('current-aarti');
                    aarti.element.style.borderColor = 'var(--secondary)';
                    aarti.element.style.background = 'linear-gradient(135deg, rgba(220, 20, 60, 0.1), white)';
                } else {
                    aarti.element.classList.remove('current-aarti');
                    aarti.element.style.borderColor = '';
                    aarti.element.style.background = '';
                }
            }
        });
    }

    // Update time every minute
    updateCurrentTime();
    setInterval(updateCurrentTime, 60000);

    // Festival countdown (example for next major festival)
    function updateFestivalCountdown() {
        // Example: Diwali 2024 (you can update this date)
        const festivalDate = new Date('2024-11-01T00:00:00');
        const now = new Date();
        const timeDiff = festivalDate - now;

        if (timeDiff > 0) {
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            
            const countdownElement = document.createElement('div');
            countdownElement.className = 'festival-countdown';
            countdownElement.innerHTML = `
                <div class="countdown-content">
                    <span class="countdown-icon">🪔</span>
                    <span class="countdown-text">Next Festival in: ${days} days, ${hours} hours</span>
                </div>
            `;

            // Add countdown styles
            const countdownStyles = `
                <style>
                .festival-countdown {
                    position: fixed;
                    bottom: 200px;
                    left: 20px;
                    background: linear-gradient(135deg, #FF9933, #E6721A);
                    color: white;
                    padding: 0.8rem 1.2rem;
                    border-radius: 25px;
                    box-shadow: 0 5px 15px rgba(255, 153, 51, 0.3);
                    font-size: 0.9rem;
                    font-weight: 600;
                    z-index: 1000;
                    animation: slideIn 0.5s ease;
                }

                .countdown-content {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .countdown-icon {
                    font-size: 1.2rem;
                }

                @keyframes slideIn {
                    from {
                        transform: translateX(-100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }

                @media (max-width: 768px) {
                    .festival-countdown {
                        bottom: 170px;
                        left: 10px;
                        font-size: 0.8rem;
                    }
                }
                </style>
            `;

            document.head.insertAdjacentHTML('beforeend', countdownStyles);
            document.body.appendChild(countdownElement);

            // Remove after 10 seconds
            setTimeout(() => {
                countdownElement.style.animation = 'slideOut 0.5s ease forwards';
                setTimeout(() => {
                    if (countdownElement.parentNode) {
                        countdownElement.parentNode.removeChild(countdownElement);
                    }
                }, 500);
            }, 10000);
        }
    }

    // Show festival countdown after 3 seconds
    setTimeout(updateFestivalCountdown, 3000);

    // Add CSS for slideOut animation
    document.head.insertAdjacentHTML('beforeend', `
        <style>
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(-100%);
                opacity: 0;
            }
        }
        </style>
    `);

    // Lazy loading for placeholder images (when real images are added)
    function lazyLoadImages() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    lazyLoadImages();

    // Console welcome message
    console.log('%c🙏 Welcome to Shri Khedapati Sarkar Mandir Website', 'color: #FF9933; font-size: 16px; font-weight: bold;');
    console.log('%cMay Lord Hanuman bless you with strength and devotion! 🚩', 'color: #DC143C; font-size: 14px;');
});

// PWA Service Worker Registration (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful');
        }, function(err) {
            console.log('ServiceWorker registration failed');
        });
    });
}

// Add some temple-specific utilities
window.TempleUtils = {
    // Convert English numbers to Devanagari
    toDevanagariNumbers: function(num) {
        const devanagari = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
        return num.toString().split('').map(digit => devanagari[parseInt(digit)] || digit).join('');
    },

    // Get current Hindu calendar info (simplified)
    getHinduCalendarInfo: function() {
        const date = new Date();
        const hinduMonths = [
            'चैत्र', 'वैशाख', 'ज्येष्ठ', 'आषाढ़', 'श्रावण', 'भाद्रपद',
            'आश्विन', 'कार्तिक', 'मार्गशीर्ष', 'पौष', 'माघ', 'फाल्गुन'
        ];
        
        // Simplified calculation (in a real app, use proper Hindu calendar library)
        const monthIndex = (date.getMonth() + 10) % 12;
        return {
            month: hinduMonths[monthIndex],
            year: this.toDevanagariNumbers(date.getFullYear() + 57) + ' विक्रम संवत्'
        };
    },

    // Format time in Indian style
    formatIndianTime: function(date) {
        return date.toLocaleString('hi-IN', {
            timeZone: 'Asia/Kolkata',
            hour12: true,
            hour: '2-digit',
            minute: '2-digit'
        });
    }
};

// Initialize Hindu calendar display
document.addEventListener('DOMContentLoaded', function() {
    const calendarInfo = window.TempleUtils.getHinduCalendarInfo();
    
    // Add Hindu calendar info to footer if desired
    const footerBottom = document.querySelector('.footer-bottom');
    if (footerBottom) {
        const calendarDiv = document.createElement('div');
        calendarDiv.className = 'hindu-calendar-info';
        calendarDiv.style.cssText = 'margin-top: 0.5rem; font-size: 0.9rem; opacity: 0.8;';
        calendarDiv.innerHTML = `${calendarInfo.month} | ${calendarInfo.year}`;
        footerBottom.appendChild(calendarDiv);
    }
});
# 🙏 श्री खेड़ापति सरकार मंदिर | Shri Khedapati Sarkar Mandir Website

A beautiful, modern, and spiritually enriching website for Shri Khedapati Sarkar Mandir, Madhya Pradesh. Built with devotion using modern web technologies while preserving traditional Indian aesthetics.

## ✨ Features

### 🏛️ Core Features
- **Responsive Design**: Mobile-first approach with beautiful UI on all devices
- **Live Darshan**: Embedded video streaming capability for virtual temple visits
- **Aarti Timings**: Real-time display of daily prayer schedules with current time highlighting
- **Puja Booking**: Online form for booking various seva and puja services
- **Donations**: Comprehensive seva options with secure payment integration ready
- **Event Calendar**: Upcoming festivals and special celebrations
- **Gallery**: Photo collection organized by categories (Deity, Festivals, Community)
- **Contact Information**: Complete temple details with map integration ready

### 🎨 Design Elements
- **Traditional Color Palette**: Saffron (#FF9933), Red (#DC143C), Gold (#FFD700), White
- **Typography**: Combination of modern Poppins and traditional Kalam fonts
- **Cultural Icons**: Om symbol, Diyas, Lotus, Bells, and other Hindu motifs
- **Spiritual Quotes**: Hindi/Sanskrit quotes for emotional connection
- **Smooth Animations**: Elegant transitions and scroll-based animations

### 📱 Technical Features
- **Progressive Web App (PWA)** ready
- **SEO Optimized** with proper meta tags and schema
- **Fast Loading** with optimized images and lazy loading
- **Accessibility** compliant with WCAG guidelines
- **Cross-browser** compatibility
- **WhatsApp Integration** for instant communication
- **Hindu Calendar** integration with Devanagari numbers

## 🛠️ Technologies Used

- **HTML5**: Semantic markup with proper accessibility
- **CSS3**: Modern styling with Flexbox, Grid, and custom properties
- **Vanilla JavaScript**: No frameworks, pure performance
- **Font Awesome**: Professional icons
- **Google Fonts**: Poppins & Kalam font families
- **Progressive Web App**: Service Worker ready

## 📂 Project Structure

```
/
├── index.html          # Main HTML file with all sections
├── styles.css          # Comprehensive CSS with Indian theme
├── script.js           # Interactive JavaScript functionality
├── sw.js              # Service Worker for PWA (optional)
└── README.md          # This documentation
```

## 🚀 Quick Start

1. **Clone or Download** the project files
2. **Open `index.html`** in a modern web browser
3. **Customize Content**:
   - Update temple address and contact information
   - Add real images to replace placeholders
   - Configure payment gateway integration
   - Add Google Maps embed code
   - Update social media links

## 📋 Customization Guide

### 🏷️ Basic Information
- **Temple Name**: Update in HTML title and throughout the content
- **Address**: Modify in the contact section
- **Phone Numbers**: Update WhatsApp and contact numbers
- **Email**: Add temple email addresses

### 🎨 Styling
- **Colors**: Modify CSS custom properties in `:root`
- **Fonts**: Change font families in CSS or HTML head
- **Layout**: Adjust grid and flexbox properties
- **Animations**: Customize transition durations and effects

### 📸 Images
Replace placeholder sections with real images:
- Hero background image
- Deity photos in gallery
- Festival celebration photos
- Temple exterior/interior images

### 💰 Payment Integration

Ready for integration with popular Indian payment gateways:

```javascript
// Example Razorpay integration (script.js)
function initializeRazorpay(amount, description) {
    var options = {
        "key": "YOUR_RAZORPAY_KEY",
        "amount": amount * 100, // Convert to paise
        "currency": "INR",
        "name": "श्री खेड़ापति सरकार मंदिर",
        "description": description,
        "handler": function (response) {
            // Handle successful payment
            showNotification('🙏 Payment successful! Thank you for your donation.', 'success');
        }
    };
    var rzp = new Razorpay(options);
    rzp.open();
}
```

### 🗺️ Google Maps Integration

Replace the map placeholder with real Google Maps embed:

```html
<!-- Replace in contact section -->
<iframe 
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d..."
    width="100%" 
    height="400" 
    style="border:0;" 
    allowfullscreen="" 
    loading="lazy" 
    referrerpolicy="no-referrer-when-downgrade">
</iframe>
```

## 🔧 Advanced Features

### 📱 PWA Configuration
The website is ready for Progressive Web App features:
- Service Worker for offline functionality
- Manifest file for app-like experience
- Push notifications for aarti reminders

### 🌐 Multi-language Support
Easily extend for additional languages:
- Hindi (already included)
- English (primary)
- Local regional languages (customizable)

### 📊 Analytics Integration
Ready for Google Analytics or other tracking:

```html
<!-- Add before </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 📋 Seva & Donation Options

The website includes these traditional seva options:
- **Annadan Seva** (अन्नदान सेवा) - Food donation
- **Prasad Seva** (प्रसादी सेवा) - Prasad sponsorship
- **Deepdan Seva** (दीपदान सेवा) - Lamp lighting
- **Shrungar Seva** (श्रृंगार सेवा) - Deity decoration
- **Akhand Ramayan Path** (अखंड रामायण जी पाठ) - Continuous Ramayan recitation
- **Sundarkand Path** (श्री सुंदरकांड पाठ बुकिंग) - Sundarkand recitation
- **Bhandara Seva** (भंडारा सेवा) - Community feast
- **Mahaprasad Vitaran** (महाप्रसादी वितरण सेवा) - Prasad distribution

## 🎯 SEO Optimization

The website includes:
- Proper meta tags and descriptions
- Open Graph tags for social sharing
- Structured data markup
- Semantic HTML for better indexing
- Optimized images with alt texts
- Fast loading performance

## 📱 Mobile Features

- Touch-friendly navigation
- Swipe gestures ready
- Mobile-optimized forms
- Responsive images
- Fast mobile loading
- App-like experience with PWA

## 🔒 Security & Privacy

- No external dependencies that compromise privacy
- HTTPS ready
- Form validation and sanitization
- Privacy policy ready template
- GDPR compliance considerations

## 🤝 Contributing

To contribute to this temple website:
1. Fork the repository
2. Create a feature branch
3. Make your improvements
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For technical support or customization requests:
- Create an issue in the repository
- Contact the development team
- Check documentation for common solutions

## 🙏 Credits

**Developed with devotion for:**
- Shri Khedapati Sarkar Mandir, Madhya Pradesh
- The global community of devotees
- Spreading digital darshan worldwide

**Technologies & Resources:**
- Font Awesome for icons
- Google Fonts for typography
- Modern CSS Grid and Flexbox
- Vanilla JavaScript for performance

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**🕉️ May Lord Hanuman bless all who visit this digital temple with strength, devotion, and peace. Jai Shri Ram! 🚩**

---

*For the latest updates and features, visit the project repository.*
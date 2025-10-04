# 🚀 Deployment Guide - Khedapati Sarkar Mandir Website

This guide will help you deploy the temple website to various hosting platforms.

## 📋 Pre-deployment Checklist

### ✅ Required Customizations
- [ ] Update temple address in contact section
- [ ] Add real phone numbers and WhatsApp contact
- [ ] Replace placeholder images with actual temple photos
- [ ] Configure Google Maps embed with temple location
- [ ] Set up payment gateway integration (Razorpay/PayU/etc.)
- [ ] Add real social media links
- [ ] Update meta tags with actual temple information
- [ ] Test all forms and functionality

### 🔧 Technical Requirements
- Modern web browser support (Chrome, Firefox, Safari, Edge)
- HTTPS for PWA functionality and payment integration
- Domain name (recommended: templename.org or similar)

## 🌐 Hosting Options

### Option 1: GitHub Pages (Free)
1. Create a GitHub repository
2. Upload all project files
3. Enable GitHub Pages in repository settings
4. Your site will be available at: `https://username.github.io/repository-name`

### Option 2: Netlify (Free tier available)
1. Create account at [netlify.com](https://netlify.com)
2. Drag and drop project folder to Netlify
3. Configure custom domain if needed
4. Automatic HTTPS and global CDN included

### Option 3: Vercel (Free tier available)
1. Create account at [vercel.com](https://vercel.com)
2. Connect GitHub repository or upload files
3. Automatic deployment and optimization
4. Perfect for static websites

### Option 4: Traditional Web Hosting
1. Purchase hosting from providers like:
   - Hostinger (India-specific)
   - GoDaddy
   - Bluehost
   - SiteGround
2. Upload files via FTP/cPanel File Manager
3. Configure domain and SSL certificate

## 🔧 Configuration Steps

### 1. Google Maps Integration
Replace the map placeholder in the contact section:

```html
<!-- In index.html, contact section -->
<div class="map-container">
    <iframe 
        src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE"
        width="100%" 
        height="400" 
        style="border:0;" 
        allowfullscreen="" 
        loading="lazy">
    </iframe>
</div>
```

To get embed code:
1. Go to [Google Maps](https://maps.google.com)
2. Search for your temple location
3. Click "Share" → "Embed a map"
4. Copy the iframe code

### 2. Payment Gateway Setup (Razorpay Example)

Add this to your HTML before closing `</body>`:
```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```

Update the donation button handlers in `script.js`:
```javascript
function initializePayment(amount, description, sevaType) {
    var options = {
        "key": "YOUR_RAZORPAY_KEY_ID", // Enter the Key ID generated from the Dashboard
        "amount": amount * 100, // Amount in paise
        "currency": "INR",
        "name": "श्री खेड़ापति सरकार मंदिर",
        "description": description,
        "image": "temple-logo-url",
        "handler": function (response) {
            alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
            // Send payment details to your server
            handleSuccessfulPayment(response, sevaType);
        },
        "prefill": {
            "name": "",
            "email": "",
            "contact": ""
        },
        "theme": {
            "color": "#FF9933"
        }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
}
```

### 3. WhatsApp Integration
Update the WhatsApp button with your temple's number:

```html
<!-- In index.html -->
<div class="whatsapp-float">
    <a href="https://wa.me/91XXXXXXXXXX?text=🙏%20Jai%20Shri%20Ram!%20I%20would%20like%20to%20know%20about%20temple%20services." target="_blank" class="whatsapp-btn">
        <i class="fab fa-whatsapp"></i>
    </a>
</div>
```

### 4. Email Form Integration
For the puja booking form, you can integrate with:

#### EmailJS (Free tier available)
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
emailjs.init("YOUR_PUBLIC_KEY");
</script>
```

#### Formspree (Free tier available)
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
    <!-- Your form fields -->
</form>
```

### 5. Live Streaming Setup
For live darshan, you can use:

#### YouTube Live Embed
```html
<iframe 
    src="https://www.youtube.com/embed/LIVE_STREAM_ID" 
    frameborder="0" 
    allowfullscreen>
</iframe>
```

#### Facebook Live Embed
```html
<iframe 
    src="https://www.facebook.com/plugins/video.php?href=YOUR_LIVE_VIDEO_URL"
    allowfullscreen>
</iframe>
```

## 📊 Analytics & Monitoring

### Google Analytics
Add before closing `</head>` tag:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Google Search Console
1. Verify ownership of your domain
2. Submit sitemap: `https://yourdomain.com/sitemap.xml`
3. Monitor search performance

## 🔒 Security Checklist

- [ ] Enable HTTPS (SSL certificate)
- [ ] Regular backups of website files
- [ ] Update dependencies regularly
- [ ] Use secure payment processing (never store card details)
- [ ] Implement form validation and sanitization
- [ ] Set up basic security headers

## 📱 Mobile Optimization

The website is already mobile-optimized, but ensure:
- [ ] Test on actual mobile devices
- [ ] Verify PWA installation works
- [ ] Check touch interactions
- [ ] Validate form usability on mobile

## 🚀 Performance Optimization

### Image Optimization
1. Compress images using tools like TinyPNG
2. Use appropriate image formats (WebP where supported)
3. Implement lazy loading for gallery images

### Caching
Add these headers via hosting provider or .htaccess:
```apache
# .htaccess for Apache servers
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
</IfModule>
```

## 📈 SEO Optimization

### Create sitemap.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://yourdomain.com/</loc>
        <lastmod>2024-10-04</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
</urlset>
```

### robots.txt
```
User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml
```

## 🆘 Troubleshooting

### Common Issues

**Forms not working:**
- Check EmailJS/Formspree configuration
- Verify API keys and endpoints

**PWA not installing:**
- Ensure HTTPS is enabled
- Verify manifest.json is accessible
- Check service worker registration

**Payment gateway errors:**
- Verify API keys (test vs live environment)
- Check webhook configurations
- Validate SSL certificate

**Mobile display issues:**
- Clear browser cache
- Test in different browsers
- Verify viewport meta tags

## 📞 Support Resources

### Technical Support
- HTML/CSS: [MDN Web Docs](https://developer.mozilla.org)
- JavaScript: [JavaScript.info](https://javascript.info)
- PWA: [web.dev/progressive-web-apps](https://web.dev/progressive-web-apps/)

### Payment Gateway Support
- Razorpay: [razorpay.com/docs](https://razorpay.com/docs/)
- PayU: [payumoney.com/dev-guide](https://payumoney.com/dev-guide/)
- Instamojo: [instamojo.com/developers](https://instamojo.com/developers/)

### Hosting Support
- Contact your hosting provider's support team
- Check hosting provider documentation
- Use their community forums

## ✅ Go Live Checklist

Before making the website public:

- [ ] All placeholder content replaced with real information
- [ ] All forms tested and working
- [ ] Payment gateway tested in sandbox mode
- [ ] Mobile responsiveness verified
- [ ] All links working correctly
- [ ] Contact information accurate
- [ ] Social media links updated
- [ ] Analytics tracking configured
- [ ] SSL certificate installed
- [ ] Domain configured correctly
- [ ] Basic SEO setup complete

---

**🙏 May Lord Hanuman bless your digital temple with success and help you serve devotees worldwide! Jai Shri Ram! 🚩**
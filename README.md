# Tech Meetup Munich Website

A modern, responsive static website for the Tech Meetup Munich event, built with pure HTML, CSS, and vanilla JavaScript following modern web development best practices.

## 🌟 Features

- **Modern Design**: Clean, professional layout with gradient backgrounds and smooth animations
- **Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- **Accessibility**: WCAG compliant with proper semantic HTML and ARIA attributes
- **Performance**: Lightweight with no external dependencies
- **Interactive Elements**: Smooth scrolling, form validation, and animated sections
- **Progressive Enhancement**: Core functionality works without JavaScript

## 📋 Event Information

- **Event**: Tech Meetup Munich - October 2025
- **Date**: Friday, October 25th, 2025
- **Time**: 6:00 PM - 9:30 PM (Doors open at 5:30 PM)
- **Location**: Munich Tech Hub, Maximilianstraße 13, 80539 München
- **Capacity**: max 50 attendees
- **Cost**: Free event with registration required

## 🗓️ Agenda

1. **5:30 PM** - Registration & Welcome
2. **6:00 PM** - Opening Keynote: "The Future of AI in Software Development"
3. **6:45 PM** - Tech Talk: "Building Scalable Microservices with Kubernetes"
4. **7:15 PM** - Networking Break
5. **7:45 PM** - Tech Talk: "Modern Frontend Architecture with Web Components"
6. **8:15 PM** - Panel Discussion: "The Evolution of Software Development"
7. **9:00 PM** - Closing & Networking

## 🚀 Quick Start

1. Clone or download the project
2. Open `index.html` in a web browser
3. For development, serve the files using a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

## 📁 Project Structure

```
meetup-website/
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   └── main.css        # All CSS styles
│   ├── js/
│   │   ├── main.js         # Main JavaScript file
│   │   └── modules/        # JavaScript modules
│   │       ├── navigation.js
│   │       ├── smooth-scroll.js
│   │       ├── registration-form.js
│   │       └── animation-observer.js
│   └── images/
│       └── hero-tech-meetup.svg  # Hero background image
└── README.md               # This file
```

## 🎨 Design Features

### Modern CSS Techniques
- CSS Custom Properties (variables) for consistent theming
- CSS Grid and Flexbox for responsive layouts
- Modern CSS units (rem, vw, vh, ch) for scalability
- CSS animations and transitions
- Mobile-first responsive design

### Color Scheme
- **Primary**: #2563eb (Blue)
- **Secondary**: #64748b (Slate)
- **Accent**: #f59e0b (Amber)
- **Success**: #10b981 (Emerald)
- **Text**: #1e293b (Dark Slate)

### Typography
- **Headings**: Inter (system font fallback)
- **Body**: System UI font stack
- Responsive font sizes using CSS custom properties

## ⚡ JavaScript Functionality

### Core Features
- **Navigation**: Smooth scrolling with active state indicators
- **Form Validation**: Real-time validation with user feedback
- **Animations**: Intersection Observer for scroll-triggered animations
- **Mobile Menu**: Responsive navigation toggle
- **Scroll to Top**: Floating action button
- **Interactive Map**: Click to open in Google Maps
- **Client-Side Logging**: Comprehensive logging system with multiple log levels

### Module Architecture
- ES6 modules for clean code organization
- Separation of concerns with dedicated modules
- Event delegation and efficient DOM manipulation
- Progressive enhancement approach
- Centralized logging for debugging and monitoring

### Logging System
The application includes a sophisticated client-side logging module (`logger.js`) that provides:
- **Multiple Log Levels**: DEBUG, INFO, WARN, ERROR
- **Console Output**: Formatted logs with timestamps and context
- **Optional Storage**: Persist logs to localStorage for debugging
- **Child Loggers**: Create context-specific loggers for each module
- **Development Mode**: Global logger access on localhost for debugging

Example usage in browser console (localhost only):
```javascript
logger.info('Test message');
logger.setLevel(logger.constructor.LogLevel.DEBUG);
logger.getLogs(); // Get stored logs
logger.exportLogs(); // Download logs as JSON
```

For detailed documentation, see [JavaScript Modules README](assets/js/modules/README.md).

## 🔧 Customization

### Colors
Update the CSS custom properties in `:root` to change the color scheme:

```css
:root {
    --color-primary: #your-color;
    --color-secondary: #your-color;
    /* ... */
}
```

### Content
- Event details: Update the HTML content in each section
- Speakers: Modify the agenda section with new speaker information
- Location: Change address and map coordinates

### Styling
- Fonts: Update the font family variables
- Spacing: Modify the spacing scale in CSS custom properties
- Animations: Adjust transition durations and effects

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## ♿ Accessibility Features

- Semantic HTML5 elements
- Proper heading hierarchy
- ARIA labels and attributes
- Focus management
- Keyboard navigation support
- Color contrast compliance
- Screen reader friendly

## 🚀 Performance

- No external dependencies
- Optimized CSS and JavaScript
- Efficient animations using CSS transforms
- Lazy loading of animations
- Minimal HTTP requests

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the project
2. Create a feature branch
3. Make your changes
4. Test across browsers
5. Submit a pull request

## 📞 Contact

For questions about the event or website:
- Email: info@techmeetup-munich.de
- Twitter: @TechMeetupMunich
- LinkedIn: TechMeetup Munich

---

Built with ❤️ using modern web standards and best practices.
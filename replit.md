# Garten & Landschaftsbau Portfolio Website

## Overview
A professional portfolio website for a landscaping and garden design business, showcasing services, projects, and contact information with multi-language support (German/English).

## Recent Changes (October 26, 2025)

### Mobile Responsiveness Enhanced (Latest)
Completely optimized the website for mobile devices:
- **Compact Header**: Logo reduced to 36px on mobile (32px on small phones), header no longer takes half the screen
- **Mobile Menu**: Added hamburger menu (☰) with slide-in navigation drawer
- **Typography Scaling**: All text sizes optimized for mobile readability
  - Hero h1: 2.2rem on tablet, 1.8rem on mobile
  - Section headers: 2rem on tablet, 1.75rem on mobile
- **Reduced Spacing**: All section paddings optimized (50px on tablet, 40px on mobile)
- **Gallery Modal**: Properly responsive with 1 column on mobile, smaller padding
- **Navigation**: Desktop nav hidden on mobile, replaced with hamburger menu
- **Language Toggle**: Compact buttons on mobile (smaller padding and font)
- **Image Heights**: Hero carousel 320px on tablet, 280px on mobile
- **Form Optimization**: Contact form padding reduced for better mobile fit

### Project Gallery Images Updated & Optimized
Added and optimized comprehensive project image galleries from user-provided ZIP file:
- **Terrassen (Terrace)**: 19 professional images of terrace/patio projects
- **Rasen (Lawn)**: 6 images showcasing perfect lawn installations
- **Naturstein (Stone)**: 5 images featuring natural stone work and paving
- **Poolbau (Pool)**: 3 images of pool construction projects
- **Total**: 33 new project images organized by category
- All images extracted to `/attached_assets/[category]/` folders
- **Image Optimization**: All images compressed to 80% quality, reducing file sizes by 47-53%
- **Responsive Gallery Modal**: 3 columns on desktop, 2 on tablet, 1 on mobile
- Project galleries now display real completed work instead of placeholder images

## Recent Changes (October 26, 2025)

### Complete Landing Page Redesign - Modern 2025 UI (Latest)
Completely redesigned the entire landing page with cutting-edge 2025 design trends:

#### Modern Typography & Fonts
- **Primary Font**: Inter - Clean, professional sans-serif for body text
- **Display Font**: Syne - Bold, modern font for headings and titles
- **Oversized Headlines**: Large, attention-grabbing typography (up to 5.5rem)
- **Gradient Text Effects**: Gradient backgrounds clipped to text for visual impact
- **Perfect Hierarchy**: Clear font sizes and weights throughout

#### Full-Screen Hero Section
- **100vh Full-Screen**: Hero takes entire viewport height
- **Dark Gradient Background**: Deep green gradient (0a1f0d → 1a3a1f → 2d5016)
- **Animated Radial Overlays**: Subtle pulsing gradient effects
- **Two-Column Grid**: Content left, image slider right
- **Modern Image Slider**: Rounded corners with smooth transitions
- **Interactive Dots**: Modern slider navigation controls
- **Bold CTA Button**: Pill-shaped with arrow and hover effects

#### Card-Based Modern Sections
- **Services Cards**: Clean white cards with hover lift effects
- **Minimal Borders**: Subtle borders with accent top bars on hover
- **Icon + Content Layout**: Large emoji icons with descriptive text
- **Transform Animations**: Cards lift and scale on hover
- **Grid Layout**: Auto-fit responsive grid system

#### Modern Projects Gallery
- **Image Cards**: Modern card design with rounded corners
- **Hover Overlays**: Gradient overlays appear on hover
- **Image Zoom**: Images scale smoothly on hover
- **Two-Layer Content**: Overlay text + card footer
- **Deep Shadows**: Enhanced depth with layered shadows

#### Dark About Section
- **Full-Width Dark Background**: Deep black background for contrast
- **Gradient Text**: White-to-green gradient on headings
- **Split Layout**: Content left, image right
- **Ambient Glow**: Subtle green gradient overlay
- **Modern Image Frame**: Rounded corners with hover zoom

#### Redesigned Contact Form
- **Single Card Design**: Unified white card with rounded corners
- **Gradient Header**: Dark green gradient header section
- **Glassmorphic Info Cards**: Frosted glass effect contact cards
- **Clean Form Inputs**: Modern rounded inputs with focus states
- **Full-Width Submit**: Modern dark button with arrow
- **Loading States**: Animated spinner during submission

#### Enhanced UI/UX
- **Smooth Scroll**: Native smooth scrolling throughout
- **Micro-Animations**: Subtle animations on all interactions
- **Hover Effects**: Transform, scale, and color transitions
- **High Contrast**: Strong visual hierarchy with color and spacing
- **Modern Shadows**: Layered box-shadows for depth
- **Responsive Design**: Perfect on mobile, tablet, and desktop
- **Clean Minimalism**: Whitespace-driven design
- **Professional Spacing**: Consistent padding and margins

#### Backend Server (Unchanged)
- **Node.js + Express** server running on port 3000
- **Nodemailer** integration with Gmail SMTP
- **Security features**:
  - Server-side validation and input sanitization
  - Rate limiting (5 requests per 15 minutes)
  - Honeypot anti-spam field
  - Email validation with regex
  - No credential exposure in error messages
- **API endpoint**: `/api/contact` for form submissions
- **Environment configuration**: `.env` file for Gmail credentials

#### Workflows
- **Development Server** (Frontend - Port 5000)
- **Backend Server** (API - Port 3000)

### Website Beautification (Earlier)
The entire website has been modernized with enhanced visual design:

#### Typography Enhancements
- **Primary Font**: Upgraded to 'Poppins' (modern sans-serif) for body text
- **Heading Font**: Added 'Playfair Display' (elegant serif) for titles and headings
- Better font weights and sizes for improved hierarchy
- Enhanced line-height for better readability

#### Color & Visual Improvements
- **Gradients**: Added modern gradient backgrounds throughout
  - Hero section: Multi-tone green gradient
  - Services section: Subtle white to gray gradient
  - Contact section: Rich dark green gradient with subtle patterns
- **Shadows**: Enhanced box-shadows for depth (cards, images, modals)
- **Accent Lines**: Decorative gradient underlines for section titles

#### Animation & Interaction
- Smooth hover effects on all interactive elements
- Fade-in-up animations for cards with staggered delays
- Floating background elements in hero section
- Scale and transform effects on images and buttons
- Ripple effect on CTA buttons
- Rotating close button on modals

#### Component Enhancements
- **Header**: Glassmorphism effect with backdrop blur
- **Navigation**: Animated underline effect on hover
- **Language Toggle**: Pill-shaped buttons with gradient on active state
- **Hero Section**: Enhanced with floating decorative elements
- **Service Cards**: 
  - Animated progress circles
  - Hover lift effects
  - Gradient backgrounds on hover
  - Enlarged icons on interaction
- **Project Cards**: 
  - Smooth image zoom on hover
  - Gradient overlay color transition
  - Enhanced shadows
- **About Section**: Decorative border frame effect on image
- **Contact Section**: Glassmorphism cards with backdrop blur
- **Modals**: Slide-up animation with smooth transitions
- **Forms**: Focus states with glow effects

#### Responsive Design
- Improved mobile layouts
- Better spacing and sizing for tablets
- Optimized font sizes across breakpoints

#### Additional Polish
- Custom scrollbar styling
- Smooth scroll behavior
- Better border radius (more rounded, modern feel)
- Enhanced spacing and padding throughout

## Tech Stack
- **Framework**: React 18 with Vite
- **Styling**: Custom CSS with 2025 modern design patterns
- **Fonts**: Google Fonts (Inter, Syne)
- **Design System**: Modern minimalist with card-based layouts
- **Color Palette**: Dark greens (#0a1f0d, #1a3a1f, #2d5016, #7cb342)
- **Backend**: Node.js + Express with Nodemailer
- **Features**: 
  - Image carousel with smooth transitions
  - Modal dialogs for contact form and project galleries
  - Multi-language support (German/English)
  - Responsive design
  - Smooth animations and transitions

## Project Architecture
```
├── src/
│   ├── App.jsx          # Main React component with all functionality
│   ├── App.css          # Comprehensive styles with modern design
│   └── index.jsx        # React entry point
├── public/              # Static assets
├── attached_assets/     # Project images and logo
├── vite.config.js       # Vite configuration (port 5000)
└── package.json         # Dependencies
```

## Running the Project
1. The development server runs automatically via the "Development Server" workflow
2. Access at: http://localhost:5000
3. Hot module reloading is enabled for instant updates

## Features
- **Multi-language Support**: Toggle between German (DE) and English (EN)
- **Hero Carousel**: Auto-rotating image gallery with manual controls
- **Services Section**: Four service categories with animated progress indicators
- **Projects Gallery**: Clickable project categories that open image galleries in modals
- **About Section**: Company information with decorative image presentation
- **Contact Form Section**: Dedicated landing page section with smooth scroll navigation
- **Modern Form UI**: Glassmorphism effects, animated inputs, and loading states
- **Functional Email**: Backend integration with Gmail SMTP for email delivery
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop

## Design Philosophy
The 2025 redesign creates a bold, modern, professional appearance that reflects premium landscaping services:
- **Bold Typography**: Oversized headlines with modern font pairing (Inter + Syne)
- **High Contrast**: Dark hero sections with white text create visual impact
- **Minimalist Aesthetic**: Clean layouts with strategic whitespace
- **Card-Based Design**: Modern card components with hover effects
- **Gradient Accents**: Subtle gradients for depth and visual interest
- **Nature-Inspired Colors**: Professional dark green palette (#0a1f0d → #7cb342)
- **Micro-Interactions**: Smooth animations and hover effects throughout
- **Mobile-First**: Fully responsive design across all devices
- **Professional Spacing**: Generous padding and margins for breathing room
- **Visual Hierarchy**: Clear content structure with size, weight, and color

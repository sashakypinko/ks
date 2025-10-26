# Garten & Landschaftsbau - Modern Portfolio Website

A professional, modern portfolio website for a landscaping and garden design business with multi-language support (German/English) and a fully functional contact form backed by Gmail SMTP.

## ✨ Features

- **Modern, Responsive Design**: Beautiful gradient-based UI with smooth animations
- **Multi-language Support**: Toggle between German (DE) and English (EN)
- **Image Carousel**: Auto-rotating hero section with manual controls
- **Services Showcase**: Animated service cards with progress indicators
- **Project Gallery**: Interactive project categories with modal image galleries
- **Functional Contact Form**: 
  - Real-time form validation
  - Email delivery via Gmail SMTP
  - Anti-spam protection (honeypot + rate limiting)
  - Success/error feedback
  - Loading states

## 🚀 Tech Stack

### Frontend
- **React 18** with Vite
- **Custom CSS** with modern design patterns
- **Google Fonts** (Poppins, Playfair Display)

### Backend
- **Node.js** + **Express**
- **Nodemailer** for email delivery
- **Express Rate Limit** for spam protection
- **CORS** enabled for development

## 📋 Prerequisites

- Node.js 18+ installed
- A Gmail account with 2-Step Verification enabled
- Gmail App Password (see setup instructions below)

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Gmail App Password

To send emails via Gmail SMTP, you need to create an App Password:

1. Go to your [Google Account settings](https://myaccount.google.com/)
2. Navigate to **Security**
3. Enable **2-Step Verification** if not already enabled
4. Go to **Security** > **2-Step Verification** > **App passwords**
5. Select **Mail** and your device
6. Click **Generate**
7. Copy the 16-character password (without spaces)

### 3. Create Environment File

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Then edit `.env` and add your credentials:

```env
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-character-app-password
MAIL_TO=your-email@gmail.com
PORT=3000
```

**Important**: Never commit the `.env` file to version control. It's already in `.gitignore`.

### 4. Run the Application

#### Development Mode

You need to run both the frontend and backend servers:

**Terminal 1 - Frontend (Vite)**:
```bash
npm run dev
```
This starts the frontend on http://localhost:5000

**Terminal 2 - Backend (Express)**:
```bash
npm run server
```
This starts the backend on http://localhost:3000

The frontend automatically proxies `/api` requests to the backend.

#### On Replit

Replit automatically runs both workflows:
- **Development Server** (Frontend) - Port 5000
- **Backend Server** (API) - Port 3000

Just ensure your `.env` file is configured with valid credentials.

## 📧 Testing the Contact Form

1. Open the website in your browser
2. Click the "Projekt anfragen" / "Request Project" button
3. Fill out the form with:
   - Your name
   - Your email address
   - Optional phone number
   - Your message (minimum 10 characters)
4. Click "Anfrage senden" / "Send Request"
5. You should receive an email at the address specified in `MAIL_TO`

## 🔒 Security Features

- **Server-side Validation**: All inputs are validated and sanitized
- **Rate Limiting**: Maximum 5 requests per 15 minutes per IP
- **Honeypot Field**: Hidden field to catch spam bots
- **Input Sanitization**: Prevents XSS attacks
- **Email Validation**: Proper regex-based email validation
- **CORS Configuration**: Controlled cross-origin requests
- **No Credential Exposure**: Errors don't leak sensitive information

## 📁 Project Structure

```
├── src/
│   ├── App.jsx          # Main React component
│   ├── App.css          # Modern styles with animations
│   └── index.jsx        # React entry point
├── attached_assets/     # Project images and logo
├── public/              # Static assets
├── server.js            # Express backend server
├── .env.example         # Environment template
├── .env                 # Your credentials (not in git)
├── vite.config.js       # Vite configuration + API proxy
├── package.json         # Dependencies and scripts
└── README.md            # This file
```

## 🎨 Customization

### Colors

The website uses a green color palette. Main colors are defined in `src/App.css`:
- Primary: `#2d5016`
- Secondary: `#4a7c59`
- Accent: `#7cb342`

### Contact Email

To change where contact form submissions are sent:
1. Edit `.env`
2. Update `MAIL_TO=new-email@example.com`
3. Restart the backend server

### Form Fields

To add/remove form fields:
1. Edit `src/App.jsx` - Update `formData` state and form JSX
2. Edit `server.js` - Update validation and email template

### Languages

To add more languages or modify text:
1. Edit `src/App.jsx`
2. Add new language object in the `texts` state
3. Update language toggle buttons

## 📦 Building for Production

```bash
npm run build
```

This creates optimized static files in the `dist/` directory.

For production deployment:
1. Serve the `dist/` folder with a static file server
2. Run the backend server (`node server.js`)
3. Configure environment variables on your hosting platform
4. Ensure both servers can communicate (update CORS if needed)

## 🐛 Troubleshooting

### Contact form not sending emails

1. **Check backend logs**: Look for error messages in the Backend Server console
2. **Verify credentials**: Make sure your Gmail credentials in `.env` are correct
3. **App Password**: Ensure you're using an App Password, not your regular Gmail password
4. **2-Step Verification**: Must be enabled for App Passwords to work
5. **Test endpoint**: Visit `http://localhost:3000/api/health` - should return `{"status":"ok"}`

### Frontend can't connect to backend

1. **Check both servers are running**: Frontend (5000) and Backend (3000)
2. **Verify proxy**: Check `vite.config.js` has the correct proxy configuration
3. **Clear browser cache**: Try a hard refresh (Ctrl+Shift+R)

### "Too many requests" error

The rate limiter allows 5 requests per 15 minutes. Wait or restart the backend server to reset.

## 📝 Development Notes

- The backend runs on port **3000**
- The frontend runs on port **5000**
- API requests are proxied from `/api` on the frontend to the backend
- Hot Module Reloading (HMR) is enabled for instant frontend updates
- The backend uses ES modules (`"type": "module"` in package.json)

## 📄 License

This project is for personal/commercial use.

## 🤝 Support

For issues or questions about setup, please check:
1. This README
2. The `.env.example` file for configuration reference
3. Console logs for error messages

---

Made with ❤️ for professional landscaping services

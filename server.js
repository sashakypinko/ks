import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return input.trim().slice(0, 5000);
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, phone, message, honeypot } = req.body;

    if (honeypot) {
      return res.status(400).json({ success: false, message: 'Invalid submission' });
    }

    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPhone = sanitizeInput(phone);
    const sanitizedMessage = sanitizeInput(message);

    if (!sanitizedName || sanitizedName.length < 2) {
      return res.status(400).json({ success: false, message: 'Please provide a valid name' });
    }

    if (!validateEmail(sanitizedEmail)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
    }

    if (!sanitizedMessage || sanitizedMessage.length < 10) {
      return res.status(400).json({ success: false, message: 'Please provide a message (at least 10 characters)' });
    }

    const escapedName = escapeHtml(sanitizedName);
    const escapedEmail = escapeHtml(sanitizedEmail);
    const escapedPhone = escapeHtml(sanitizedPhone);
    const escapedMessage = escapeHtml(sanitizedMessage);

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.MAIL_TO || process.env.SMTP_USER,
      replyTo: sanitizedEmail,
      subject: `New Contact Form Submission from ${escapedName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fdf4; border: 2px solid #2d5016; border-radius: 10px;">
          <h2 style="color: #2d5016; border-bottom: 3px solid #7cb342; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong style="color: #2d5016;">Name:</strong> ${escapedName}</p>
            <p style="margin: 10px 0;"><strong style="color: #2d5016;">Email:</strong> <a href="mailto:${escapedEmail}" style="color: #4a7c59;">${escapedEmail}</a></p>
            ${escapedPhone ? `<p style="margin: 10px 0;"><strong style="color: #2d5016;">Phone:</strong> ${escapedPhone}</p>` : ''}
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2d5016; margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6; color: #333;">${escapedMessage}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #e8f5e8; border-radius: 8px; font-size: 12px; color: #555;">
            <p style="margin: 5px 0;">This message was sent from your website's contact form.</p>
            <p style="margin: 5px 0;">Reply directly to this email to respond to the sender.</p>
          </div>
        </div>
      `,
    };

    console.log('Mail Options:', mailOptions);

    await transporter.sendMail(mailOptions);

    console.log(`Contact form submission from ${sanitizedName} (${sanitizedEmail})`);

    res.json({ 
      success: true, 
      message: 'Thank you for your message! We will get back to you soon.' 
    });

  } catch (error) {
    console.error('Error sending email:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Unable to send message at this time. Please try again later.' 
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server running on port ${PORT}`);
  console.log(`SMTP configured: ${process.env.SMTP_USER ? 'Yes' : 'No'}`);
});

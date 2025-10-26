import nodemailer from 'nodemailer';
import rateLimit from 'lambda-rate-limiter';
import { env } from '$amplify/env/email';
import 'dotenv/config';

const contactLimiter = rateLimit({
    interval: 15 * 60 * 1000, // 15 minutes
    uniqueTokenPerInterval: 500,
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: env.SMTP_USERNAME,
        pass: env.SMTP_PASS,
    },
});

function validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function sanitizeInput(input: any): string {
    if (typeof input !== 'string') return '';
    return input.trim().slice(0, 5000);
}

function escapeHtml(text: string): string {
    const map: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

export const handler = async (event: any) => {
    try {
        if (event.httpMethod === 'GET' && event.path === '/api/health') {
            return {
                statusCode: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }),
            };
        }

        if (event.httpMethod !== 'POST' || !event.path.includes('/api/contact')) {
            return {
                statusCode: 404,
                body: JSON.stringify({ success: false, message: 'Not found' }),
            };
        }

        const ip = event.requestContext?.identity?.sourceIp || 'unknown';

        try {
            await contactLimiter.check(5, ip);
        } catch {
            return {
                statusCode: 429,
                body: JSON.stringify({
                    success: false,
                    message: 'Too many requests. Please try again later.',
                }),
            };
        }

        const body = JSON.parse(event.body || '{}');
        const { name, email, phone, message, honeypot } = body;

        if (honeypot) {
            return {
                statusCode: 400,
                body: JSON.stringify({ success: false, message: 'Invalid submission' }),
            };
        }

        const sanitizedName = sanitizeInput(name);
        const sanitizedEmail = sanitizeInput(email);
        const sanitizedPhone = sanitizeInput(phone);
        const sanitizedMessage = sanitizeInput(message);

        if (!sanitizedName || sanitizedName.length < 2) {
            return {
                statusCode: 400,
                body: JSON.stringify({ success: false, message: 'Please provide a valid name' }),
            };
        }

        if (!validateEmail(sanitizedEmail)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ success: false, message: 'Please provide a valid email address' }),
            };
        }

        if (!sanitizedMessage || sanitizedMessage.length < 10) {
            return {
                statusCode: 400,
                body: JSON.stringify({ success: false, message: 'Please provide a message (at least 10 characters)' }),
            };
        }

        const escapedName = escapeHtml(sanitizedName);
        const escapedEmail = escapeHtml(sanitizedEmail);
        const escapedPhone = escapeHtml(sanitizedPhone);
        const escapedMessage = escapeHtml(sanitizedMessage);

        const mailOptions = {
            from: env.SMTP_USERNAME,
            to: env.MAIL_TO || env.SMTP_USERNAME,
            replyTo: sanitizedEmail,
            subject: `New Contact Form Submission from ${escapedName}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fdf4; border: 2px solid #2d5016; border-radius: 10px;">
          <h2 style="color: #2d5016; border-bottom: 3px solid #7cb342; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${escapedName}</p>
            <p><strong>Email:</strong> <a href="mailto:${escapedEmail}">${escapedEmail}</a></p>
            ${escapedPhone ? `<p><strong>Phone:</strong> ${escapedPhone}</p>` : ''}
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Message:</h3>
            <p style="white-space: pre-wrap;">${escapedMessage}</p>
          </div>
        </div>
      `,
        };

        await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                message: 'Thank you for your message! We will get back to you soon.',
            }),
        };
    } catch (error: any) {
        console.error('Error sending email:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                message: 'Unable to send message at this time. Please try again later.',
            }),
        };
    }
};

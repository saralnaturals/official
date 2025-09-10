import nodemailer from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

const GMAIL_USER = process.env.SMTP_USER;
const GMAIL_APP_PASSWORD = process.env.SMTP_PASS;

if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn('Gmail credentials not configured (GMAIL_USER / GMAIL_APP_PASSWORD). Email sending will fail.');
  }
}

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
});

export async function sendEmail(to: string, subject: string, text: string, html?: string) {
  const from = GMAIL_USER || `no-reply@saralnaturals.com`;
  const mailOptions: SMTPTransport.Options & Record<string, unknown> = { from, to, subject, text };
  if (html) mailOptions.html = html;
  try {
    const info = await transporter.sendMail(mailOptions);
    if (process.env.NODE_ENV !== 'production') console.log('[email] sent', info.response || info.messageId);
    return info;
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') console.error('[email] send error', e);
    throw e;
  }
}

export default sendEmail;

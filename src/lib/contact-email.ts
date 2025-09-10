interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface EmailContent {
  subject: string;
  textContent: string;
  htmlContent: string;
  replyTo: string;
}

/**
 * Escapes HTML characters to prevent injection attacks
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Sanitizes text input by trimming whitespace and limiting length
 */
function sanitizeText(text: string, maxLength: number = 1000): string {
  return text.trim().substring(0, maxLength);
}

/**
 * Validates and sanitizes email address
 */
function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Validates and sanitizes phone number
 */
function sanitizePhone(phone: string): string {
  // Remove any non-digit characters except + and spaces for international format
  return phone.trim().replace(/[^\d+\s()-]/g, '');
}

/**
 * Formats contact form data into email subject line
 */
export function formatEmailSubject(formData: ContactFormData): string {
  return `New Contact Form Submission - ${formData.name}`;
}

/**
 * Formats contact form data into plain text email content
 */
export function formatTextContent(formData: ContactFormData): string {
  const timestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return `
New Contact Form Submission

Submitted on: ${timestamp}

Contact Details:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Message:
${formData.message}

---
This message was sent through the Saral Naturals contact form.
You can reply directly to this email to respond to the customer.
`.trim();
}

/**
 * Formats contact form data into HTML email content
 */
export function formatHtmlContent(formData: ContactFormData): string {
  const timestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const escapedName = escapeHtml(formData.name);
  const escapedEmail = escapeHtml(formData.email);
  const escapedPhone = escapeHtml(formData.phone);
  const escapedMessage = escapeHtml(formData.message).replace(/\n/g, '<br>');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Contact Form Submission</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #16a34a; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
    .footer { background-color: #f1f1f1; padding: 15px; border-radius: 0 0 8px 8px; font-size: 12px; color: #666; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #16a34a; }
    .value { margin-top: 5px; }
    .message-box { background-color: white; padding: 15px; border-left: 4px solid #16a34a; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">New Contact Form Submission</h2>
      <p style="margin: 5px 0 0 0; opacity: 0.9;">Saral Naturals Website</p>
    </div>
    
    <div class="content">
      <p><strong>Submitted on:</strong> ${timestamp}</p>
      
      <div class="field">
        <div class="label">Name:</div>
        <div class="value">${escapedName}</div>
      </div>
      
      <div class="field">
        <div class="label">Email:</div>
        <div class="value"><a href="mailto:${escapedEmail}">${escapedEmail}</a></div>
      </div>
      
      <div class="field">
        <div class="label">Phone:</div>
        <div class="value"><a href="tel:${escapedPhone}">${escapedPhone}</a></div>
      </div>
      
      <div class="field">
        <div class="label">Message:</div>
        <div class="message-box">${escapedMessage}</div>
      </div>
    </div>
    
    <div class="footer">
      <p>This message was sent through the Saral Naturals contact form.<br>
      You can reply directly to this email to respond to the customer.</p>
    </div>
  </div>
</body>
</html>
`.trim();
}

/**
 * Sanitizes contact form data
 */
export function sanitizeContactFormData(formData: ContactFormData): ContactFormData {
  return {
    name: sanitizeText(formData.name, 100),
    email: sanitizeEmail(formData.email),
    phone: sanitizePhone(formData.phone),
    message: sanitizeText(formData.message, 2000),
  };
}

/**
 * Formats complete email content for contact form submission
 */
export function formatContactEmail(formData: ContactFormData): EmailContent {
  // Sanitize the form data before formatting
  const sanitizedData = sanitizeContactFormData(formData);
  
  return {
    subject: formatEmailSubject(sanitizedData),
    textContent: formatTextContent(sanitizedData),
    htmlContent: formatHtmlContent(sanitizedData),
    replyTo: sanitizedData.email,
  };
}
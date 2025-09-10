import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { formatContactEmail } from "@/lib/contact-email";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

function validateContactFormData(data: any): data is ContactFormData {
  if (!data || typeof data !== 'object') {
    return false;
  }

  // Check required fields exist and are strings
  if (
    typeof data.name !== 'string' ||
    typeof data.email !== 'string' ||
    typeof data.phone !== 'string' ||
    typeof data.message !== 'string'
  ) {
    return false;
  }

  // Trim and validate lengths
  const name = data.name.trim();
  const email = data.email.trim();
  const phone = data.phone.trim();
  const message = data.message.trim();

  // Validate name (2-100 characters)
  if (name.length < 2 || name.length > 100) {
    return false;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email) || email.length > 254) {
    return false;
  }

  // Validate phone (7-20 characters, allow digits, spaces, +, -, ())
  const phoneRegex = /^[\d+\s()-]{7,20}$/;
  if (!phoneRegex.test(phone)) {
    return false;
  }

  // Validate message (10-2000 characters)
  if (message.length < 10 || message.length > 2000) {
    return false;
  }

  return true;
}

export async function POST(request: Request) {
  try {
    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error("Invalid JSON in contact form request:", parseError);
      return NextResponse.json(
        { ok: false, error: "Invalid request format" },
        { status: 400 }
      );
    }

    // Validate form data
    if (!validateContactFormData(body)) {
      console.error("Invalid contact form data:", body);
      return NextResponse.json(
        { ok: false, error: "Missing or invalid form fields" },
        { status: 400 }
      );
    }
    
    // Format email content
    const emailContent = formatContactEmail(body);
    
    // Send email to business address
    try {
      await sendEmail(
        "saralnaturals68@gmail.com",
        emailContent.subject,
        emailContent.textContent,
        emailContent.htmlContent
      );
      
      console.log("Contact form email sent successfully for:", body.name);
      return NextResponse.json({ ok: true });
      
    } catch (emailError) {
      // Log specific error for debugging
      console.error("Failed to send contact form email:", emailError);
      
      // Check if it's an SMTP configuration error
      const errorMessage = emailError instanceof Error ? emailError.message : String(emailError);
      if (errorMessage.includes('auth') || errorMessage.includes('credential')) {
        console.error("SMTP authentication error - check email configuration");
      }
      
      // Return generic error to user
      return NextResponse.json(
        { ok: false, error: "Failed to send message. Please try again or contact us directly." },
        { status: 500 }
      );
    }
    
  } catch (error) {
    // Catch any unexpected errors
    console.error("Unexpected error in contact form handler:", error);
    return NextResponse.json(
      { ok: false, error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}



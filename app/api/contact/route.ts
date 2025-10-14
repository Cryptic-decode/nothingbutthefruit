import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail, ContactFormData } from '../../lib/emailService';

export async function POST(request: NextRequest) {
  try {
    console.log('Contact API called');
    console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
    console.log('CONTACT_EMAIL:', process.env.CONTACT_EMAIL);
    
    const body: ContactFormData = await request.json();
    console.log('Form data received:', { ...body, message: body.message.substring(0, 50) + '...' });
    
    // Basic validation
    if (!body.fullName || !body.email || !body.messageType || !body.message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Sanitize input (basic protection)
    const sanitizedData: ContactFormData = {
      fullName: body.fullName.trim().substring(0, 100),
      email: body.email.trim().toLowerCase(),
      messageType: body.messageType.trim(),
      message: body.message.trim().substring(0, 2000)
    };

    // Send email
    const result = await sendContactEmail(sanitizedData);
    
    console.log('Email sent successfully:', result.messageId);
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message! We\'ll get back to you soon.',
        messageId: result.messageId 
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

import { NextRequest, NextResponse } from 'next/server';
import { sendPreorderEmail, PreorderFormData } from '../../lib/emailService';

export async function POST(request: NextRequest) {
  try {
    console.log('Preorder API called');
    console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
    console.log('CONTACT_EMAIL:', process.env.CONTACT_EMAIL);
    
    const body: PreorderFormData = await request.json();
    console.log('Preorder data received:', { ...body, quantity: body.quantity });
    
    // Basic validation
    if (!body.fullName || !body.email || !body.phone || !body.quantity) {
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

    // Quantity validation
    const quantity = parseInt(String(body.quantity), 10);
    if (isNaN(quantity) || quantity < 1 || quantity > 100) {
      return NextResponse.json(
        { error: 'Please enter a valid quantity (1-100)' },
        { status: 400 }
      );
    }

    // Phone validation (basic - just check it's not empty)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(body.phone.trim())) {
      return NextResponse.json(
        { error: 'Please enter a valid phone number' },
        { status: 400 }
      );
    }

    // Sanitize input (basic protection)
    const sanitizedData: PreorderFormData = {
      fullName: body.fullName.trim().substring(0, 100),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim().substring(0, 20),
      quantity: quantity
    };

    // Send email
    const result = await sendPreorderEmail(sanitizedData);
    
    console.log('Preorder email sent successfully:', result.messageId);
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your preorder! Pastor Dee will contact you soon with next steps.',
        messageId: result.messageId 
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Preorder API error:', error);
    return NextResponse.json(
      { error: 'Failed to submit preorder. Please try again or contact us directly.' },
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

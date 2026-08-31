import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail, ContactFormData } from '../../lib/emailService';
import { getClientIp, isRateLimited } from '../../lib/rateLimit';

export const runtime = 'nodejs';

interface ContactRequestBody extends ContactFormData {
  website?: string;
}

export async function POST(request: NextRequest) {
  const requestId =
    request.headers.get('x-request-id') ||
    (globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : `${Date.now()}`);

  try {
    const clientIp = getClientIp(request);
    if (isRateLimited({ key: clientIp, scope: 'contact' })) {
      console.warn(`[contact:${requestId}] Rate limit exceeded`);
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'x-request-id': requestId } }
      );
    }

    const body: ContactRequestBody = await request.json();

    if (body.website && body.website.trim() !== '') {
      console.warn(`[contact:${requestId}] Honeypot triggered`);
      return NextResponse.json(
        { success: true, message: 'Thank you for your message!' },
        { status: 200, headers: { 'x-request-id': requestId } }
      );
    }
    
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
    
    console.log(`[contact:${requestId}] Email sent successfully:`, result.messageId);
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message! We\'ll get back to you soon.',
        messageId: result.messageId 
      },
      { status: 200, headers: { 'x-request-id': requestId } }
    );
    
  } catch (error) {
    const details =
      error instanceof Error
        ? { name: error.name, message: error.message }
        : { message: String(error) };
    console.error(`[contact:${requestId}] API error:`, details);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again or contact us directly.' },
      { status: 500, headers: { 'x-request-id': requestId } }
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

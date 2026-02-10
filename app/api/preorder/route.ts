import { NextRequest, NextResponse } from 'next/server';
import { sendPreorderEmail, PreorderFormData } from '../../lib/emailService';

// In-memory rate limiting (simple, no external dependencies)
// In production, consider using Redis or a proper rate limiting service
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 3; // Max 3 requests per 15 minutes per IP

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  return forwarded?.split(',')[0]?.trim() || realIP || 'unknown';
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    // Create new entry or reset expired one
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false; // Rate limit exceeded
  }

  entry.count++;
  return true;
}

// Clean up old entries periodically (simple cleanup)
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of rateLimitMap.entries()) {
      if (now > entry.resetTime) {
        rateLimitMap.delete(ip);
      }
    }
  }, 5 * 60 * 1000); // Clean every 5 minutes
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const clientIP = getClientIP(request);
    if (!checkRateLimit(clientIP)) {
      console.warn(`Rate limit exceeded for IP: ${clientIP}`);
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    console.log('Preorder API called');
    console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
    console.log('CONTACT_EMAIL:', process.env.CONTACT_EMAIL);
    
    const body: any = await request.json();
    
    // Honeypot check - if this field is filled, it's likely a bot
    if (body.website && body.website.trim() !== '') {
      console.warn('Honeypot triggered - possible bot submission');
      // Return success to avoid revealing the honeypot
      return NextResponse.json(
        { success: true, message: 'Thank you for your preorder!' },
        { status: 200 }
      );
    }
    
    // Type assertion for PreorderFormData
    const formData: PreorderFormData = {
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      quantity: body.quantity
    };
    
    console.log('Preorder data received:', { ...formData, quantity: formData.quantity });
    
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.quantity) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Quantity validation
    const quantity = parseInt(String(formData.quantity), 10);
    if (isNaN(quantity) || quantity < 1 || quantity > 100) {
      return NextResponse.json(
        { error: 'Please enter a valid quantity (1-100)' },
        { status: 400 }
      );
    }

    // Phone validation (basic - just check it's not empty)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      return NextResponse.json(
        { error: 'Please enter a valid phone number' },
        { status: 400 }
      );
    }

    // Sanitize input (basic protection)
    const sanitizedData: PreorderFormData = {
      fullName: formData.fullName.trim().substring(0, 100),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim().substring(0, 20),
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

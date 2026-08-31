import { NextRequest, NextResponse } from 'next/server';
import { sendBookOrderEmail } from '../../lib/emailService';
import { getBookBySlug } from '../../lib/books';
import { getClientIp, isRateLimited } from '../../lib/rateLimit';

export const runtime = 'nodejs';

interface BookOrderRequestBody {
  fullName: string;
  email: string;
  phone: string;
  quantity: number;
  bookSlug: string;
  bookTitle: string;
  bookPrice: number;
  website?: string;
}

export async function POST(request: NextRequest) {
  const requestId =
    request.headers.get('x-request-id') ||
    (globalThis.crypto?.randomUUID
      ? globalThis.crypto.randomUUID()
      : `${Date.now()}`);

  try {
    const clientIp = getClientIp(request);
    if (isRateLimited({ key: clientIp, scope: 'book-order' })) {
      console.warn(`[book-order:${requestId}] Rate limit exceeded`);
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body: BookOrderRequestBody = await request.json();

    // Honeypot check
    if (body.website && body.website.trim() !== '') {
      console.warn(`[book-order:${requestId}] Honeypot triggered`);
      return NextResponse.json(
        { success: true, message: 'Thank you for your order!' },
        { status: 200, headers: { 'x-request-id': requestId } }
      );
    }

    // Basic validation
    if (!body.fullName || !body.email || !body.phone || !body.quantity || !body.bookSlug) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate book slug
    const bookExists = getBookBySlug(body.bookSlug);
    if (!bookExists) {
      return NextResponse.json(
        { error: 'Invalid book selection' },
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

    // Phone validation
    const phoneRegex = /^[\d\s\-+()]+$/;
    if (!phoneRegex.test(body.phone.trim())) {
      return NextResponse.json(
        { error: 'Please enter a valid phone number' },
        { status: 400 }
      );
    }

    // Sanitize input
    const sanitizedData = {
      fullName: body.fullName.trim().substring(0, 100),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim().substring(0, 20),
      quantity,
      bookTitle: body.bookTitle,
      bookPrice: body.bookPrice,
    };

    // Send email
    const result = await sendBookOrderEmail(sanitizedData);

    console.log(`[book-order:${requestId}] Email sent successfully:`, result.messageId);

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your order! Pastor Dee will contact you soon with payment and delivery details.',
        messageId: result.messageId,
      },
      { status: 200, headers: { 'x-request-id': requestId } }
    );
  } catch (error) {
    const details =
      error instanceof Error
        ? { name: error.name, message: error.message }
        : { message: String(error) };
    console.error(`[book-order:${requestId}] API error:`, details);
    return NextResponse.json(
      { error: 'Failed to submit order. Please try again or contact us directly.' },
      { status: 500, headers: { 'x-request-id': requestId } }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

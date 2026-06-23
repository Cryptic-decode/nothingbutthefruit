import { NextRequest, NextResponse } from 'next/server';
import { sendBulkBookOrderEmail } from '../../lib/emailService';
import { getBookBySlug } from '../../lib/books';

export const runtime = 'nodejs';

interface BulkOrderItem {
  bookSlug: string;
  bookTitle: string;
  bookPrice: number;
  quantity: number;
}

interface BulkOrderRequestBody {
  fullName: string;
  email: string;
  phone: string;
  items: BulkOrderItem[];
  website?: string;
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 3;

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  return forwarded?.split(',')[0]?.trim() || realIP || 'unknown';
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  entry.count++;
  return true;
}

if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of rateLimitMap.entries()) {
      if (now > entry.resetTime) {
        rateLimitMap.delete(ip);
      }
    }
  }, 5 * 60 * 1000);
}

export async function POST(request: NextRequest) {
  const requestId =
    request.headers.get('x-request-id') ||
    (globalThis.crypto?.randomUUID
      ? globalThis.crypto.randomUUID()
      : `${Date.now()}`);

  try {
    const clientIP = getClientIP(request);
    if (!checkRateLimit(clientIP)) {
      console.warn(`[bulk-book-order:${requestId}] Rate limit exceeded for IP: ${clientIP}`);
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    console.log(`[bulk-book-order:${requestId}] API called`);

    const body: BulkOrderRequestBody = await request.json();

    // Honeypot check
    if (body.website && body.website.trim() !== '') {
      console.warn(`[bulk-book-order:${requestId}] Honeypot triggered`);
      return NextResponse.json(
        { success: true, message: 'Thank you for your order!' },
        { status: 200, headers: { 'x-request-id': requestId } }
      );
    }

    // Basic validation
    if (!body.fullName || !body.email || !body.phone || !body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: 'All fields are required and at least one item must be selected.' },
        { status: 400 }
      );
    }

    // Validate all book slugs
    for (const item of body.items) {
      if (!getBookBySlug(item.bookSlug)) {
        return NextResponse.json(
          { error: `Invalid book: ${item.bookTitle}` },
          { status: 400 }
        );
      }
      const qty = parseInt(String(item.quantity), 10);
      if (isNaN(qty) || qty < 1 || qty > 1000) {
        return NextResponse.json(
          { error: `Invalid quantity for ${item.bookTitle}` },
          { status: 400 }
        );
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
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

    // Sanitize
    const sanitizedData = {
      fullName: body.fullName.trim().substring(0, 100),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim().substring(0, 20),
      items: body.items.map((item) => ({
        bookTitle: item.bookTitle,
        bookPrice: item.bookPrice,
        quantity: Math.min(parseInt(String(item.quantity), 10), 1000),
      })),
    };

    const result = await sendBulkBookOrderEmail(sanitizedData);

    console.log(`[bulk-book-order:${requestId}] Email sent successfully:`, result.messageId);

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your bulk order! Pastor Dee will contact you soon with payment and delivery details.',
        messageId: result.messageId,
      },
      { status: 200, headers: { 'x-request-id': requestId } }
    );
  } catch (error) {
    const details =
      error instanceof Error
        ? { name: error.name, message: error.message }
        : { message: String(error) };
    console.error(`[bulk-book-order:${requestId}] API error:`, details);
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

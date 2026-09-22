import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import type { Database } from '@/app/lib/supabase/database.types';
import { getSupabaseEnvironment } from '@/app/lib/supabase/env';
import { getClientIp, isRateLimited } from '@/app/lib/rateLimit';

export const runtime = 'nodejs';

const resourceSlug = '7-day-fruit-check';
const downloadUrl = '/resources/7-day-fruit-check.pdf';
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FreeResourceRequestBody {
  email?: string;
  fullName?: string;
  website?: string;
}

function successResponse(requestId: string) {
  return NextResponse.json(
    {
      success: true,
      downloadUrl,
      message: 'Your free guide is ready to download.',
    },
    {
      status: 200,
      headers: {
        'cache-control': 'no-store',
        'x-request-id': requestId,
      },
    }
  );
}

export async function POST(request: NextRequest) {
  const requestId =
    request.headers.get('x-request-id') ||
    (globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : `${Date.now()}`);

  try {
    const clientIp = getClientIp(request);
    if (
      isRateLimited({
        key: clientIp,
        scope: 'free-resource',
        maxRequests: 5,
      })
    ) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'x-request-id': requestId } }
      );
    }

    const body: FreeResourceRequestBody = await request.json();

    if (body.website?.trim()) {
      return successResponse(requestId);
    }

    const fullName = body.fullName?.trim().replace(/\s+/g, ' ') ?? '';
    const email = body.email?.trim().toLowerCase() ?? '';

    if (fullName.length < 2 || fullName.length > 100) {
      return NextResponse.json(
        { error: 'Enter your name using 2 to 100 characters.' },
        { status: 400, headers: { 'x-request-id': requestId } }
      );
    }

    if (email.length > 254 || !emailPattern.test(email)) {
      return NextResponse.json(
        { error: 'Enter a valid email address.' },
        { status: 400, headers: { 'x-request-id': requestId } }
      );
    }

    const { supabaseUrl, supabasePublishableKey } = getSupabaseEnvironment();
    const supabase = createClient<Database>(supabaseUrl, supabasePublishableKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
    const { error } = await supabase.from('free_resource_downloads').insert({
      resource_slug: resourceSlug,
      full_name: fullName,
      email,
    });

    if (error && error.code !== '23505') {
      console.error(`[free-resource:${requestId}] Request could not be recorded`, {
        code: error.code,
      });
      return NextResponse.json(
        { error: 'We could not prepare the download. Please try again.' },
        { status: 503, headers: { 'x-request-id': requestId } }
      );
    }

    return successResponse(requestId);
  } catch (error) {
    console.error(`[free-resource:${requestId}] API error`, {
      message: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json(
      { error: 'We could not prepare the download. Please try again.' },
      { status: 500, headers: { 'x-request-id': requestId } }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

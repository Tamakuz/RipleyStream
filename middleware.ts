import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
}

export const config = {
  matcher: ['/api/:path*', "/"],
};

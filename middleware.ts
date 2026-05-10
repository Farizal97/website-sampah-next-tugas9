import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Ambil cookie 'session' (simulasi)
  const session = request.cookies.get('session')

  // Jika mencoba akses dashboard tapi gak ada session, tendang ke /login
  if (request.nextUrl.pathname.startsWith('/dashboard') && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

// Tentukan rute mana saja yang mau dijaga
export const config = {
  matcher: '/dashboard/:path*',
}

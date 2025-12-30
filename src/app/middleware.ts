import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  // الصفحات المسموح بيها
  const allowedRoutes = [
    '/forgetpassword',
    '/resetpassword',
    '/resetcode',
  ]

  // لو الصفحة مش منهم → /
  if (!allowedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // لو فيه أي query params → /
  if (search && search.length > 0) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/forgetpassword',
    '/resetpassword',
    '/resetcode',
  ],
}

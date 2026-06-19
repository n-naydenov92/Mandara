import { NextResponse, type NextRequest } from 'next/server'
import { DEFAULT_LOCALE, LOCALE_COOKIE } from '@/lib/i18n/settings'

const EN = 'en'

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === `/${EN}` || pathname.startsWith(`/${EN}/`)) {
    const response = NextResponse.next()
    response.cookies.set(LOCALE_COOKIE, EN)
    return response
  }

  const url = request.nextUrl.clone()
  url.pathname = `/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`
  const response = NextResponse.rewrite(url)
  response.cookies.set(LOCALE_COOKIE, DEFAULT_LOCALE)
  return response
}

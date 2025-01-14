import { NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
	const token = request.cookies.get('token')?.value

	if (!token) {
		const login = new URL('/auth/login', request.url)
		if (request.nextUrl.pathname !== '/auth/login' && request.nextUrl.pathname !== '/auth/register') {
			return NextResponse.redirect(login)
		}
	}

	return NextResponse.next()
}

export const config = { matcher: ['/(:path*)', '/((?!_next/static|_next/image|favicon.ico).*)'] }

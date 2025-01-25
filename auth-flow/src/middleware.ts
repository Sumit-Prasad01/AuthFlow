// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname

//   // Define which paths are public (accessible without authentication)
//   const isPublicPath = path === '/login' || '/signup' || '/verifyemail'

//   // Retrieve the token from cookies (authentication token)
//   const token = request.cookies.get('token')?.value || ''

//   // Case 1: Logged-in user accessing public pages (like /login, /signup)
//   if (isPublicPath && token) {
//     // Redirect to the homepage if a user is logged in and tries to access public pages
//     return NextResponse.redirect(new URL('/', request.nextUrl)) // Redirect to the homepage
//   }

//   // Case 2: Unauthenticated user trying to access protected pages (like /profile, /)
//   if (!isPublicPath && !token) {
//     // Redirect to the login page if the user is not authenticated
//     return NextResponse.redirect(new URL('/login', request.nextUrl)) // Redirect to login page
//   }

//   // If no redirect is needed, proceed to the next middleware or request handler
//   return NextResponse.next()
// }

// // Define paths that this middleware should match
// export const config = {
//   matcher: [
//     '/',           // Homepage (requires authentication)
//     '/profile',     // Profile page (requires authentication)
//     '/login',       // Login page (public)
//     '/signup',      // Signup page (public)
//     // '/verifyemail', // Email verification page (public)
//   ]
// }


import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define the public paths that don't require authentication
  const publicPaths = ['/login', '/signup', '/verifyemail']
  
  // Check if the path is public
  const isPublicPath = publicPaths.includes(path)

  // Retrieve the token from cookies
  const token = request.cookies.get('token')?.value

  // If it's a public path and the user doesn't have a token, redirect to home
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  // If it's a protected path and there's no token, redirect to login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  // If the token exists, but the user tries to access login/signup pages, redirect to home
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }
  
  // Allow the request to continue if the conditions above are not met
  return NextResponse.next()
}

// Configuration to apply middleware to specific paths
export const config = {
  matcher: [
    '/',          // Home
    '/profile',    // Profile page (protected)
    '/login',      // Login page (public)
    '/signup',     // Signup page (public)
    '/verifyemail' // Verify email page (public)
  ]
}

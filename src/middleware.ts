import { NextRequest, NextResponse } from "next/server";
import { decrypt, TOKEN_NAME } from "@/lib/auth";

// Protected routes that require authentication
const protectedRoutes = ["/profile", "/admin"];
// Admin-only routes
const adminRoutes = ["/admin", "/api/admin"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // 1. Check if the path is protected
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  const isAdminRoute = adminRoutes.some(route => path.startsWith(route));

  if (!isProtectedRoute && !isAdminRoute) {
    return NextResponse.next();
  }

  // 2. Get and verify the session
  const cookie = request.cookies.get(TOKEN_NAME)?.value;
  let session = null;
  
  if (cookie) {
    try {
      session = await decrypt(cookie);
    } catch (error) {
      // Invalid or expired token
      console.error("[MIDDLEWARE] Token verification failed:", error);
    }
  }

  // 3. Redirect to login if no session and trying to access protected route
  if (!session && isProtectedRoute) {
    const url = new URL("/login", request.nextUrl.origin);
    // Optional: add a redirect parameter to return to the original page
    // url.searchParams.set("redirect", path);
    return NextResponse.redirect(url);
  }

  // 4. Check admin privileges
  if (isAdminRoute) {
    if (!session || !session.user?.isAdmin) {
      console.warn(`[MIDDLEWARE] Unauthorized admin access attempt to ${path} by ${session?.user?.email || "unknown"}`);
      // If it's an API route, return 401/403
      if (path.startsWith("/api/")) {
        return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
      }
      // If it's a page, redirect to home or login
      return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth endpoints)
     * - api/public (public endpoints if any)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/admin/:path*",
    "/profile/:path*",
    "/api/admin/:path*",
  ],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /admin, /admin/users)
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = path === "/login" || path === "/signup";

  // Get the token from the cookies
  const token = request.cookies.get("token")?.value || "";

  // Redirect logic
  if (path.startsWith("/admin") && !token) {
    // Redirect to login if trying to access admin without token
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isPublicPath && token) {
    // Redirect to admin dashboard if trying to access login/signup with token
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: ["/admin/:path*", "/login", "/signup"],
};

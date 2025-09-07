import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";


// Restrict specific pages
const protectedRoutes = {
  "/dashboard/add-listing": ["SUPER_ADMIN", "ADMIN"],
  "/dashboard/settings": ["SUPER_ADMIN", "ADMIN"],
  "/dashboard/my-listings": ["SUPER_ADMIN", "ADMIN", "MEMBER"],
  "/dashboard/messages": ["SUPER_ADMIN", "ADMIN", "MEMBER"],
  "/dashboard/profile": ["SUPER_ADMIN", "ADMIN", "MEMBER", "USER"],
  "/dashboard": ["SUPER_ADMIN", "ADMIN", "MEMBER", "USER"],
};

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Not authenticated → redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const userRole = token.role || "USER";

  // Find matching protected route
  const routeKey = Object.keys(protectedRoutes).find((route) =>
    pathname.startsWith(route)
  );

  // If route is protected, check role
  if (routeKey) {
    const allowedRoles = protectedRoutes[routeKey];
    if (!allowedRoles.includes(userRole)) {
      // 🚫 No access → redirect to access-denied, you can add different page where user should redirect
      return NextResponse.redirect(new URL("/access-denied", req.url));
    }
  }

  return NextResponse.next();
}

// Apply middleware to all dashboard routes
export const config = {
  matcher: ["/dashboard/:path*"],
};

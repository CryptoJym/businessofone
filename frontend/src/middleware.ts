import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Add custom logic here if needed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        // `/dashboard` requires authentication
        if (req.nextUrl.pathname.startsWith("/dashboard")) {
          return !!token;
        }
        
        // `/admin` requires admin role
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return token?.role === "ADMIN";
        }
        
        // Other paths are allowed
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/api/consultations/:path*",
    "/api/user/:path*",
  ],
};
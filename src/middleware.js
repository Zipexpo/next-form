import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const protectedRoutes = ["/manage-form", "/account"]; // Add routes to protect

  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    // If no token, redirect to the sign-in page
    if (!token) {
      const signInUrl = new URL("/api/auth/signin", req.url);
      signInUrl.searchParams.set("callbackUrl", req.url); // Redirect back after login
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next(); // Allow request to continue
}

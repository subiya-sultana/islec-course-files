import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
    const token = req.cookies.get("token")?.value || req.headers.get("Authorization")?.split(" ")[1];

    console.log("Token retrieved from cookies:", token); // Log the token

    if (!token) return NextResponse.redirect(new URL("/login", req.url));

    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
        console.log("Decoded token:", payload); // Log the decoded token

        const path = req.nextUrl.pathname;
        const userRole = payload.role.toLowerCase(); // Ensure role is lowercase

        // If user is trying to access an unauthorized dashboard, redirect them to their own dashboard
        if (path.startsWith("/dashboard") && !path.startsWith(`/dashboard/${userRole}`)) {
            return NextResponse.redirect(new URL(`/dashboard/${userRole}`, req.url));
        }

        return NextResponse.next();
    } catch (err) {
        console.error("JWT verification failed:", err.message); // Log the error message
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

// Apply middleware only to dashboard routes
export const config = {
  matcher: ["/dashboard/:path*"],
};

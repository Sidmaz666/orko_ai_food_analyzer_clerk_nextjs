import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const notProtectedRoute = createRouteMatcher(["/auth/sign-up(.*)", "/auth/sign-in(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (!notProtectedRoute(req)) await auth.protect();
  // Redirect to / on /auth
  if (req.nextUrl.pathname === "/auth") {
    return NextResponse.redirect(`${req.nextUrl.origin}/`);
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
// Skip Next.js internals and all static files, unless found in search params
"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

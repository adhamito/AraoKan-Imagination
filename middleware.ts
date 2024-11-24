import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/api/webhook/clerk"]);

export default clerkMiddleware(async (auth, request) => {
  // Check if route is public
  if (isPublicRoute(request)) {
    return; // Allow public route access
  }

  // Protect non-public routes
  await auth.protect();
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/api/(.*)"],
};

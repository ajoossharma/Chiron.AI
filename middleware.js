import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getUserSession, saveUserSession } from "@/lib/redis";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/resume(.*)",
  "/interview(.*)",
  "/ai-cover-letter(.*)",
  "/onboarding(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (userId) {
    try {
      let session = await getUserSession(userId);
      
      if (!session) {
        const sessionData = {
          userId,
          createdAt: new Date().toISOString(),
          lastActive: new Date().toISOString(),
        };
        
        await saveUserSession(userId, sessionData);
      } else {
        session.lastActive = new Date().toISOString();
        await saveUserSession(userId, session);
      }
    } catch (error) {
      console.error("Redis session error:", error);
    }
  }


  if (!userId && isProtectedRoute(req)) {
    const { redirectToSignIn } = await auth();
    return redirectToSignIn();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',

    '/(api|trpc)(.*)',
  ],
};
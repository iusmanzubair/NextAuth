import authConfig from "./auth.config";
import NextAuth from "next-auth";

import {
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
  authRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthPrefix = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoutes = authRoutes.includes(nextUrl.pathname);
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);

  if (isApiAuthPrefix) return null;

  if (isAuthRoutes) {
    if (isLoggedIn)
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    return null;
  }

  if(!isLoggedIn && !isPublicRoutes) return Response.redirect(new URL('/auth/login', nextUrl));

  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

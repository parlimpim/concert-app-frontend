import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const protectedPaths = ["/home", "/history"];

  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path),
  );

  // check if user have access token or not
  const accessToken = request.cookies.get("access_token");

  if (isProtectedPath && !accessToken) {
    // redirect to landing
    const url = new URL("/", request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/history"],
};

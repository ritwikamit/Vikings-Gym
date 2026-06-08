import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const publicRoutes = ["/", "/about", "/plans", "/trainers", "/transformations", "/gallery", "/blog", "/contact", "/join", "/login", "/register"];
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith("/blog/")
  );
  const isApiAuthRoute = pathname.startsWith("/api/auth");
  const isPublicApi = pathname.startsWith("/api/public");
  const isStaticAsset = pathname.startsWith("/_next") || pathname.startsWith("/images") || pathname.startsWith("/logo") || pathname.includes(".");

  if (isPublicRoute || isApiAuthRoute || isPublicApi || isStaticAsset) {
    return NextResponse.next();
  }

  const token = request.cookies.get("authjs.session-token")?.value ||
    request.cookies.get("__Secure-authjs.session-token")?.value;

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|logo|images).*)",
  ],
};

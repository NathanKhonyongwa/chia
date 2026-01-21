import { NextResponse } from "next/server";

const COOKIE_NAME = "chiaview_admin_token";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect all /Admin routes except /Admin/Login
  if (pathname.startsWith("/Admin") && pathname !== "/Admin/Login") {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = "/Admin/Login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Admin/:path*"],
};


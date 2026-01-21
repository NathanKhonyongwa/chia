/**
 * Admin logout
 * POST /api/admin/logout
 */

import { cookies } from "next/headers";

const COOKIE_NAME = "chiaview_admin_token";

export async function POST() {
  const jar = await cookies();
  jar.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return Response.json({ success: true });
}


/**
 * Admin logout
 * POST /api/admin/logout
 */

import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";

const COOKIE_NAME = "chiaview_admin_token";
const SESSION_COOKIE_NAME = "chiaview_admin_session";
const DB_PROVIDER = process.env.NEXT_PUBLIC_DB_PROVIDER || "supabase";

export async function POST() {
  const jar = await cookies();

  // Clear both possible session cookies
  jar.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  jar.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  // If using Supabase, also sign out from Supabase
  if (DB_PROVIDER === "supabase") {
    try {
      const token = jar.get(COOKIE_NAME)?.value;
      if (token) {
        await supabase.auth.signOut();
      }
    } catch (error) {
      // Ignore Supabase errors during logout
    }
  }

  return Response.json({ success: true });
}


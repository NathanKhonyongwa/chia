/**
 * Admin login (Supabase Auth)
 * POST /api/admin/login { email, password }
 *
 * Sets an httpOnly cookie with Supabase access token for middleware/API auth.
 */

import { cookies } from "next/headers";
import { requireSupabaseConfigured, supabase } from "@/lib/supabase";

const COOKIE_NAME = "chiaview_admin_token";

function isEmailAllowed(email) {
  const allow = process.env.ADMIN_ALLOWLIST_EMAILS;
  if (!allow) return true; // allow all by default
  const allowed = allow
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return allowed.includes(String(email || "").toLowerCase());
}

export async function POST(request) {
  try {
    requireSupabaseConfigured();
    const body = await request.json();
    const email = (body?.email || "").trim();
    const password = body?.password || "";

    if (!email || !password) {
      return Response.json({ error: "Missing email or password" }, { status: 400 });
    }

    if (!isEmailAllowed(email)) {
      return Response.json({ error: "Not authorized" }, { status: 403 });
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = data?.session?.access_token;
    const user = data?.user;

    if (!token || !user) {
      return Response.json({ error: "Login failed" }, { status: 500 });
    }

    const jar = await cookies();
    jar.set(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 12, // 12h
    });

    return Response.json({
      success: true,
      admin: {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || user.email?.split("@")[0] || "Admin",
        role: "admin",
      },
    });
  } catch (error) {
    return Response.json(
      { error: "Failed to login", details: error.message },
      { status: 500 }
    );
  }
}


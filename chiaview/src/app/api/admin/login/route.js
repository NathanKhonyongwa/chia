/**
 * Admin login (Supabase Auth or localStorage)
 * POST /api/admin/login { email, password }
 *
 * Sets an httpOnly cookie with session data for middleware/API auth.
 */

import { cookies } from "next/headers";
import { requireSupabaseConfigured, supabase } from "@/lib/supabase";

const COOKIE_NAME = "chiaview_admin_token";
const SESSION_COOKIE_NAME = "chiaview_admin_session";
const DB_PROVIDER = process.env.NEXT_PUBLIC_DB_PROVIDER || "supabase";

// Default admin credentials for localStorage mode
const DEFAULT_ADMIN_EMAIL = "admin@chiaview.org";
const DEFAULT_ADMIN_PASSWORD = "admin123";

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
    const body = await request.json();
    const email = (body?.email || "").trim();
    const password = body?.password || "";

    if (!email || !password) {
      return Response.json({ error: "Missing email or password" }, { status: 400 });
    }

    // Check database provider
    if (DB_PROVIDER === "localStorage") {
      // Simple authentication for localStorage mode
      if (email === DEFAULT_ADMIN_EMAIL && password === DEFAULT_ADMIN_PASSWORD) {
        const sessionData = {
          admin: {
            id: "admin-1",
            email: DEFAULT_ADMIN_EMAIL,
            name: "Admin",
            role: "admin",
          },
          expires: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
        };

        const jar = await cookies();
        jar.set(SESSION_COOKIE_NAME, JSON.stringify(sessionData), {
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          path: "/",
          maxAge: 60 * 60 * 24, // 24h
        });

        return Response.json({
          success: true,
          admin: sessionData.admin,
        });
      } else {
        return Response.json({ error: "Invalid credentials" }, { status: 401 });
      }
    }

    // Supabase authentication
    requireSupabaseConfigured();

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


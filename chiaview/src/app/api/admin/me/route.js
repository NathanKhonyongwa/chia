/**
 * Admin session check
 * GET /api/admin/me
 */

import { cookies } from "next/headers";
import { requireSupabaseConfigured, supabase } from "@/lib/supabase";

const COOKIE_NAME = "chiaview_admin_token";
const DB_PROVIDER = process.env.NEXT_PUBLIC_DB_PROVIDER || "supabase";

export async function GET() {
  try {
    // Check database provider
    if (DB_PROVIDER === "localStorage") {
      // For localStorage, check for a simple admin session cookie
      const jar = await cookies();
      const adminSession = jar.get("chiaview_admin_session")?.value;

      if (!adminSession) {
        return Response.json({ success: true, admin: null });
      }

      // Parse session data
      try {
        const sessionData = JSON.parse(adminSession);
        if (sessionData.admin && sessionData.expires > Date.now()) {
          return Response.json({
            success: true,
            admin: {
              id: sessionData.admin.id,
              email: sessionData.admin.email,
              name: sessionData.admin.name || "Admin",
              role: "admin",
            },
          });
        }
      } catch (error) {
        // Invalid session data
      }

      return Response.json({ success: true, admin: null });
    }

    // Supabase authentication
    requireSupabaseConfigured();
    const jar = await cookies();
    const token = jar.get(COOKIE_NAME)?.value;
    if (!token) {
      return Response.json({ success: true, admin: null });
    }

    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data?.user) {
      return Response.json({ success: true, admin: null });
    }

    const user = data.user;
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
      { error: "Failed to check session", details: error.message },
      { status: 500 }
    );
  }
}


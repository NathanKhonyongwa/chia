/**
 * Admin session check
 * GET /api/admin/me
 */

import { cookies } from "next/headers";
import { requireSupabaseConfigured, supabase } from "@/lib/supabase";

const COOKIE_NAME = "chiaview_admin_token";

export async function GET() {
  try {
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


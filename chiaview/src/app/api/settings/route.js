/**
 * Website Settings API Route
 * GET /api/settings - Get all settings
 * POST /api/settings - Create or update a setting
 */

import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("website_settings")
      .select("key, value, description, updated_at");
    if (error) throw error;
    return Response.json({ success: true, settings: data });
  } catch (error) {
    return Response.json({ error: "Failed to load settings", details: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { key, value, description } = await request.json();
    if (!key || value === undefined) {
      return Response.json({ error: "Missing key or value" }, { status: 400 });
    }
    const { data, error } = await supabase
      .from("website_settings")
      .upsert([
        { key, value, description: description || null, updated_at: new Date().toISOString() },
      ], { onConflict: ["key"] })
      .select();
    if (error) throw error;
    return Response.json({ success: true, setting: data[0] });
  } catch (error) {
    return Response.json({ error: "Failed to save setting", details: error.message }, { status: 500 });
  }
}

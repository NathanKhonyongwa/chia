/**
 * Website Setting (Single) API Route
 * GET /api/settings/[key] - Get a setting
 * PATCH /api/settings/[key] - Update a setting
 * DELETE /api/settings/[key] - Delete a setting
 */

import { supabase } from "@/lib/supabase";

export async function GET(request, { params }) {
  try {
    const { key } = params;
    const { data, error } = await supabase
      .from("website_settings")
      .select("key, value, description, updated_at")
      .eq("key", key)
      .single();
    if (error) throw error;
    return Response.json({ success: true, setting: data });
  } catch (error) {
    return Response.json({ error: "Failed to load setting", details: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const { key } = params;
    const { value, description } = await request.json();
    const { data, error } = await supabase
      .from("website_settings")
      .update({ value, description: description || null, updated_at: new Date().toISOString() })
      .eq("key", key)
      .select();
    if (error) throw error;
    return Response.json({ success: true, setting: data[0] });
  } catch (error) {
    return Response.json({ error: "Failed to update setting", details: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { key } = params;
    const { error } = await supabase
      .from("website_settings")
      .delete()
      .eq("key", key);
    if (error) throw error;
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: "Failed to delete setting", details: error.message }, { status: 500 });
  }
}

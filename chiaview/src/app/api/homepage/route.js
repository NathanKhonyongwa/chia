/**
 * Homepage Content API Route
 * GET /api/homepage - Get all homepage sections
 * POST /api/homepage - Create or update a section
 */

import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("homepage_content")
      .select("id, section, content, order_index, visible, updated_at")
      .order("order_index", { ascending: true });
    if (error) throw error;
    return Response.json({ success: true, sections: data });
  } catch (error) {
    return Response.json({ error: "Failed to load homepage content", details: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { section, content, order_index, visible } = await request.json();
    if (!section || !content) {
      return Response.json({ error: "Missing section or content" }, { status: 400 });
    }
    const { data, error } = await supabase
      .from("homepage_content")
      .upsert([
        { section, content, order_index: order_index || 0, visible: visible !== false, updated_at: new Date().toISOString() },
      ], { onConflict: ["section"] })
      .select();
    if (error) throw error;
    return Response.json({ success: true, section: data[0] });
  } catch (error) {
    return Response.json({ error: "Failed to save homepage content", details: error.message }, { status: 500 });
  }
}

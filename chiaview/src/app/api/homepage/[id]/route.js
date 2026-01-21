/**
 * Homepage Content (Single Section) API Route
 * GET /api/homepage/[id] - Get a section
 * PATCH /api/homepage/[id] - Update a section
 * DELETE /api/homepage/[id] - Delete a section
 */

import { supabase } from "@/lib/supabase";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const { data, error } = await supabase
      .from("homepage_content")
      .select("id, section, content, order_index, visible, updated_at")
      .eq("id", id)
      .single();
    if (error) throw error;
    return Response.json({ success: true, section: data });
  } catch (error) {
    return Response.json({ error: "Failed to load section", details: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const { content, order_index, visible } = await request.json();
    const { data, error } = await supabase
      .from("homepage_content")
      .update({ content, order_index, visible, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select();
    if (error) throw error;
    return Response.json({ success: true, section: data[0] });
  } catch (error) {
    return Response.json({ error: "Failed to update section", details: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const { error } = await supabase
      .from("homepage_content")
      .delete()
      .eq("id", id);
    if (error) throw error;
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: "Failed to delete section", details: error.message }, { status: 500 });
  }
}

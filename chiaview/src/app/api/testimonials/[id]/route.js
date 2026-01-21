/**
 * Single Testimonial API Route
 * GET /api/testimonials/[id] - Get a testimonial
 * PATCH /api/testimonials/[id] - Update a testimonial
 * DELETE /api/testimonials/[id] - Delete a testimonial
 */

import { supabase } from "@/lib/supabase";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const { data, error } = await supabase
      .from("testimonials")
      .select("id, name, role, quote, category, created_at, updated_at")
      .eq("id", id)
      .single();
    if (error) throw error;
    return Response.json({ success: true, testimonial: data });
  } catch (error) {
    return Response.json({ error: "Failed to load testimonial", details: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const { name, role, quote, category } = await request.json();
    const { data, error } = await supabase
      .from("testimonials")
      .update({ name, role, quote, category, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select();
    if (error) throw error;
    return Response.json({ success: true, testimonial: data[0] });
  } catch (error) {
    return Response.json({ error: "Failed to update testimonial", details: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const { error } = await supabase
      .from("testimonials")
      .delete()
      .eq("id", id);
    if (error) throw error;
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: "Failed to delete testimonial", details: error.message }, { status: 500 });
  }
}

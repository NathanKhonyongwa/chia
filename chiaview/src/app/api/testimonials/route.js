/**
 * Testimonials API Route
 * GET /api/testimonials - Get all testimonials
 * POST /api/testimonials - Create a new testimonial
 */

import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("testimonials")
      .select("id, name, role, quote, category, created_at, updated_at")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return Response.json({ success: true, testimonials: data });
  } catch (error) {
    return Response.json({ error: "Failed to load testimonials", details: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { name, role, quote, category } = await request.json();
    if (!name || !quote) {
      return Response.json({ error: "Missing name or quote" }, { status: 400 });
    }
    const { data, error } = await supabase
      .from("testimonials")
      .insert([{ name, role, quote, category }])
      .select();
    if (error) throw error;
    return Response.json({ success: true, testimonial: data[0] });
  } catch (error) {
    return Response.json({ error: "Failed to add testimonial", details: error.message }, { status: 500 });
  }
}

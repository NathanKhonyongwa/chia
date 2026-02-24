/**
 * Volunteer Opportunity (Single) API Route (Supabase)
 * GET /api/opportunities/[id]
 * PATCH /api/opportunities/[id]
 * DELETE /api/opportunities/[id]
 */

import { isSupabaseConfigured, supabase } from "@/lib/supabase";

const SELECT_COLUMNS =
  "id, title, time, description, category, published, created_at, updated_at";

function sanitizeText(value) {
  if (value === null || value === undefined) return value;
  const s = String(value);
  return s.replaceAll(/<\s*script/gi, "&lt;script").replaceAll("\u0000", "");
}

export async function GET(request, { params }) {
  try {
    if (!isSupabaseConfigured) {
      return Response.json({ error: "Database not configured" }, { status: 500 });
    }

    const { id } = params;
    const { data, error } = await supabase
      .from("volunteer_opportunities")
      .select(SELECT_COLUMNS)
      .eq("id", id)
      .single();
    if (error) throw error;
    return Response.json({ success: true, opportunity: data });
  } catch (error) {
    return Response.json(
      { error: "Failed to load opportunity", details: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    if (!isSupabaseConfigured) {
      return Response.json({ error: "Database not configured" }, { status: 500 });
    }

    const { id } = params;
    const body = await request.json();
    const { title, time, description, category, published } = body || {};

    const update = { updated_at: new Date().toISOString() };
    if (title !== undefined) update.title = sanitizeText(title?.trim?.() ?? title);
    if (time !== undefined) update.time = sanitizeText(time?.trim?.() ?? time);
    if (description !== undefined) update.description = sanitizeText(description?.trim?.() ?? description);
    if (category !== undefined) update.category = sanitizeText(category?.trim?.() ?? category);
    if (published !== undefined) update.published = !!published;

    const { data, error } = await supabase
      .from("volunteer_opportunities")
      .update(update)
      .eq("id", id)
      .select(SELECT_COLUMNS);

    if (error) throw error;

    return Response.json({ success: true, opportunity: data?.[0] });
  } catch (error) {
    return Response.json(
      { error: "Failed to update opportunity", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    if (!isSupabaseConfigured) {
      return Response.json({ error: "Database not configured" }, { status: 500 });
    }

    const { id } = params;
    const { error } = await supabase
      .from("volunteer_opportunities")
      .delete()
      .eq("id", id);
    if (error) throw error;
    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { error: "Failed to delete opportunity", details: error.message },
      { status: 500 }
    );
  }
}


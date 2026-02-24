/**
 * Blog Post (Single) API Route (Supabase)
 * GET /api/blogposts/[id]
 * PATCH /api/blogposts/[id]
 * DELETE /api/blogposts/[id]
 */

import { isSupabaseConfigured, supabase } from "@/lib/supabase";

const SELECT_COLUMNS =
  "id, title, category, excerpt, content, image_url, featured, published, created_at, updated_at";

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
      .from("blog_posts")
      .select(SELECT_COLUMNS)
      .eq("id", id)
      .single();
    if (error) throw error;
    return Response.json({ success: true, post: data });
  } catch (error) {
    return Response.json(
      { error: "Failed to load blog post", details: error.message },
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
    const {
      title,
      category,
      excerpt,
      content,
      image_url,
      featured,
      published,
    } = body || {};

    const update = {
      updated_at: new Date().toISOString(),
    };
    if (title !== undefined) update.title = sanitizeText(title?.trim?.() ?? title);
    if (category !== undefined) update.category = sanitizeText(category?.trim?.() ?? category);
    if (excerpt !== undefined) update.excerpt = sanitizeText(excerpt?.trim?.() ?? excerpt);
    if (content !== undefined) update.content = sanitizeText(content?.trim?.() ?? content);
    if (image_url !== undefined) update.image_url = image_url?.trim?.() ?? image_url;
    if (featured !== undefined) update.featured = !!featured;
    if (published !== undefined) update.published = !!published;

    const { data, error } = await supabase
      .from("blog_posts")
      .update(update)
      .eq("id", id)
      .select(SELECT_COLUMNS);

    if (error) throw error;
    return Response.json({ success: true, post: data?.[0] });
  } catch (error) {
    return Response.json(
      { error: "Failed to update blog post", details: error.message },
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
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) throw error;
    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { error: "Failed to delete blog post", details: error.message },
      { status: 500 }
    );
  }
}


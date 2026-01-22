/**
 * Blog Posts API Route (Supabase)
 * GET /api/blogposts?query=&category=&published=&limit=&offset=
 * POST /api/blogposts
 */

import { isSupabaseConfigured, supabase } from "@/lib/supabase";

const SELECT_COLUMNS =
  "id, title, category, excerpt, content, image_url, featured, published, created_at, updated_at";

function sanitizeText(value) {
  if (value === null || value === undefined) return value;
  const s = String(value);
  // Minimal hardening: prevent accidental script injection if this is ever rendered as HTML later.
  return s.replaceAll(/<\s*script/gi, "&lt;script").replaceAll("\u0000", "");
}

export async function GET(request) {
  try {
    if (!isSupabaseConfigured) {
      return Response.json({ error: "Database not configured" }, { status: 500 });
    }

    const url = new URL(request.url);
    const query = (url.searchParams.get("query") || "").trim();
    const category = (url.searchParams.get("category") || "").trim();
    const publishedParam = (url.searchParams.get("published") || "").trim();
    const featuredParam = (url.searchParams.get("featured") || "").trim();
    const limit = Math.min(parseInt(url.searchParams.get("limit") || "20", 10), 100);
    const offset = Math.max(parseInt(url.searchParams.get("offset") || "0", 10), 0);

    let q = supabase
      .from("blog_posts")
      .select(SELECT_COLUMNS, { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (query) {
      // Basic search across title + excerpt (kept simple to avoid adding full-text search setup)
      const escaped = query.replaceAll(",", " ").trim();
      q = q.or(`title.ilike.%${escaped}%,excerpt.ilike.%${escaped}%`);
    }
    if (category && category !== "All") {
      q = q.eq("category", category);
    }
    if (publishedParam === "true" || publishedParam === "false") {
      q = q.eq("published", publishedParam === "true");
    }
    if (featuredParam === "true" || featuredParam === "false") {
      q = q.eq("featured", featuredParam === "true");
    }

    const { data, error, count } = await q;
    if (error) throw error;

    return Response.json({
      success: true,
      posts: data || [],
      total: count || 0,
      offset,
      limit,
    });
  } catch (error) {
    return Response.json(
      { error: "Failed to load blog posts", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    if (!isSupabaseConfigured) {
      return Response.json({ error: "Database not configured" }, { status: 500 });
    }

    const body = await request.json();
    const {
      title,
      category,
      excerpt,
      content,
      image_url = null,
      featured = false,
      published = false,
    } = body || {};

    if (!title?.trim() || !excerpt?.trim() || !content?.trim()) {
      return Response.json(
        { error: "Missing required fields: title, excerpt, content" },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from("blog_posts")
      .insert([
        {
          title: sanitizeText(title.trim()),
          category: sanitizeText((category || "Testimonies").trim()),
          excerpt: sanitizeText(excerpt.trim()),
          content: sanitizeText(content.trim()),
          image_url: image_url?.trim?.() || image_url || null,
          featured: !!featured,
          published: !!published,
          created_at: now,
          updated_at: now,
        },
      ])
      .select(SELECT_COLUMNS);

    if (error) throw error;

    return Response.json({ success: true, post: data?.[0] }, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: "Failed to create blog post", details: error.message },
      { status: 500 }
    );
  }
}


/**
 * Volunteer Opportunities API Route (Supabase)
 * GET /api/opportunities?query=&category=&published=&limit=&offset=
 * POST /api/opportunities
 */

import { isSupabaseConfigured, supabase } from "@/lib/supabase";

const SELECT_COLUMNS =
  "id, title, time, description, category, published, created_at, updated_at";

function sanitizeText(value) {
  if (value === null || value === undefined) return value;
  const s = String(value);
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
    const limit = Math.min(parseInt(url.searchParams.get("limit") || "20", 10), 100);
    const offset = Math.max(parseInt(url.searchParams.get("offset") || "0", 10), 0);

    let q = supabase
      .from("volunteer_opportunities")
      .select(SELECT_COLUMNS, { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (query) {
      const escaped = query.replaceAll(",", " ").trim();
      q = q.or(`title.ilike.%${escaped}%,description.ilike.%${escaped}%`);
    }
    if (category && category !== "All") {
      q = q.eq("category", category);
    }
    if (publishedParam === "true" || publishedParam === "false") {
      q = q.eq("published", publishedParam === "true");
    }

    const { data, error, count } = await q;
    if (error) throw error;

    return Response.json({
      success: true,
      opportunities: data || [],
      total: count || 0,
      offset,
      limit,
    });
  } catch (error) {
    return Response.json(
      { error: "Failed to load opportunities", details: error.message },
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
    const { title, time, description, category, published = true } = body || {};

    if (!title?.trim() || !time?.trim() || !description?.trim()) {
      return Response.json(
        { error: "Missing required fields: title, time, description" },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from("volunteer_opportunities")
      .insert([
        {
          title: sanitizeText(title.trim()),
          time: sanitizeText(time.trim()),
          description: sanitizeText(description.trim()),
          category: sanitizeText((category || "Outreach").trim()),
          published: !!published,
          created_at: now,
          updated_at: now,
        },
      ])
      .select(SELECT_COLUMNS);

    if (error) throw error;

    return Response.json(
      { success: true, opportunity: data?.[0] },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { error: "Failed to create opportunity", details: error.message },
      { status: 500 }
    );
  }
}


/**
 * Supabase Import/Restore Route
 * POST /api/supabase/import - Import/restore data
 */

import { supabase } from "@/lib/supabase";

export async function POST(request) {
  try {
    const body = await request.json();
    const { backup } = body;

    if (!backup || !backup.data) {
      return Response.json(
        { error: "Invalid backup format" },
        { status: 400 }
      );
    }

    const { data } = backup;
    const records = [];

    // Transform backup data to table format
    for (const [key, value] of Object.entries(data)) {
      records.push({
        key,
        value,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }

    if (records.length === 0) {
      return Response.json({
        success: true,
        message: "No data to restore",
        itemsRestored: 0,
      });
    }

    // Upsert data (insert or update)
    const { error } = await supabase.from("data_store").upsert(records, {
      onConflict: "key",
    });

    if (error) throw error;

    return Response.json({
      success: true,
      message: "Data restored successfully",
      itemsRestored: records.length,
    });
  } catch (error) {
    console.error("Supabase import error:", error);
    return Response.json(
      { error: "Failed to import data", details: error.message },
      { status: 500 }
    );
  }
}

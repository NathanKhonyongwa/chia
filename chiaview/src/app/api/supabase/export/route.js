/**
 * Supabase Export/Backup Route
 * GET /api/supabase/export - Export all data
 */

import { supabase } from "@/lib/supabase";

export async function GET(request) {
  try {
    // Fetch all data from data_store table
    const { data, error } = await supabase.from("data_store").select("*");

    if (error) throw error;

    // Transform data to backup format
    const allData = {};
    if (data && Array.isArray(data)) {
      data.forEach((item) => {
        allData[item.key] = item.value;
      });
    }

    // Create backup object with timestamp
    const backup = {
      timestamp: new Date().toISOString(),
      version: "1.0",
      provider: "supabase",
      data: allData,
    };

    return Response.json({
      success: true,
      backup,
      fileName: `backup-supabase-${Date.now()}.json`,
    });
  } catch (error) {
    console.error("Supabase export error:", error);
    return Response.json(
      { error: "Failed to export data", details: error.message },
      { status: 500 }
    );
  }
}

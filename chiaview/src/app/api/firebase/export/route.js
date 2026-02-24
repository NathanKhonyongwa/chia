/**
 * Firebase Export/Backup Route
 * GET /api/firebase/data/export - Export all data
 */

import { database } from "@/lib/firebase";
import { ref, get } from "firebase/database";

export async function GET(request) {
  try {
    // Fetch all data from root
    const snapshot = await get(ref(database, "/"));
    const allData = snapshot.val() || {};

    // Create backup object with timestamp
    const backup = {
      timestamp: new Date().toISOString(),
      version: "1.0",
      data: allData,
    };

    return Response.json({
      success: true,
      backup,
      fileName: `backup-${Date.now()}.json`,
    });
  } catch (error) {
    console.error("Firebase export error:", error);
    return Response.json(
      { error: "Failed to export data", details: error.message },
      { status: 500 }
    );
  }
}

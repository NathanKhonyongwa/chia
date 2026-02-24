/**
 * Firebase Import/Restore Route
 * POST /api/firebase/data/import - Import/restore data
 */

import { database } from "@/lib/firebase";
import { ref, set } from "firebase/database";

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

    // Restore data to Firebase
    // Option 1: Merge with existing data
    const { data } = backup;
    for (const [key, value] of Object.entries(data)) {
      await set(ref(database, key), value);
    }

    return Response.json({
      success: true,
      message: "Data restored successfully",
      itemsRestored: Object.keys(data).length,
    });
  } catch (error) {
    console.error("Firebase import error:", error);
    return Response.json(
      { error: "Failed to import data", details: error.message },
      { status: 500 }
    );
  }
}

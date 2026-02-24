/**
 * Firebase API Route for CRUD operations
 * GET /api/firebase/data/[key] - Retrieve data
 * POST /api/firebase/data/[key] - Save/Update data
 * DELETE /api/firebase/data/[key] - Delete data
 */

import { database } from "@/lib/firebase";
import { ref, set, get, remove, update } from "firebase/database";

export async function GET(request, { params }) {
  try {
    const { key } = params;

    if (!key) {
      return Response.json(
        { error: "Missing key parameter" },
        { status: 400 }
      );
    }

    const snapshot = await get(ref(database, key));
    const data = snapshot.val();

    return Response.json({ success: true, data });
  } catch (error) {
    console.error("Firebase GET error:", error);
    return Response.json(
      { error: "Failed to retrieve data", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  try {
    const { key } = params;
    const body = await request.json();

    if (!key || !body) {
      return Response.json(
        { error: "Missing key or data" },
        { status: 400 }
      );
    }

    // Determine if it's an update (has merge flag) or full replace
    if (body.merge === true) {
      await update(ref(database, key), body.data);
    } else {
      await set(ref(database, key), body.data);
    }

    return Response.json({
      success: true,
      message: "Data saved successfully",
    });
  } catch (error) {
    console.error("Firebase POST error:", error);
    return Response.json(
      { error: "Failed to save data", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { key } = params;

    if (!key) {
      return Response.json(
        { error: "Missing key parameter" },
        { status: 400 }
      );
    }

    await remove(ref(database, key));

    return Response.json({
      success: true,
      message: "Data deleted successfully",
    });
  } catch (error) {
    console.error("Firebase DELETE error:", error);
    return Response.json(
      { error: "Failed to delete data", details: error.message },
      { status: 500 }
    );
  }
}

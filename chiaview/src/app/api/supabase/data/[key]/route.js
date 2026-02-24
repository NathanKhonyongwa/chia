/**
 * Supabase API Route for CRUD operations
 * GET /api/supabase/data/[key] - Retrieve data
 * POST /api/supabase/data/[key] - Save/Update data
 * DELETE /api/supabase/data/[key] - Delete data
 */

import { supabase } from "@/lib/supabase";

export async function GET(request, { params }) {
  try {
    const { key } = params;

    if (!key) {
      return Response.json(
        { error: "Missing key parameter" },
        { status: 400 }
      );
    }

    // Query the data table
    const { data, error } = await supabase
      .from("data_store")
      .select("*")
      .eq("key", key)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 = no rows returned
      throw error;
    }

    return Response.json({
      success: true,
      data: data ? data.value : null,
    });
  } catch (error) {
    console.error("Supabase GET error:", error);
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

    if (!key || body.data === undefined) {
      return Response.json(
        { error: "Missing key or data" },
        { status: 400 }
      );
    }

    // Check if record exists
    const { data: existing } = await supabase
      .from("data_store")
      .select("id")
      .eq("key", key)
      .single();

    let result;
    if (existing) {
      // Update existing record
      const { data, error } = await supabase
        .from("data_store")
        .update({
          value: body.data,
          updated_at: new Date().toISOString(),
        })
        .eq("key", key)
        .select();

      if (error) throw error;
      result = data;
    } else {
      // Insert new record
      const { data, error } = await supabase
        .from("data_store")
        .insert([
          {
            key,
            value: body.data,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select();

      if (error) throw error;
      result = data;
    }

    return Response.json({
      success: true,
      message: "Data saved successfully",
      data: result,
    });
  } catch (error) {
    console.error("Supabase POST error:", error);
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

    const { error } = await supabase
      .from("data_store")
      .delete()
      .eq("key", key);

    if (error) throw error;

    return Response.json({
      success: true,
      message: "Data deleted successfully",
    });
  } catch (error) {
    console.error("Supabase DELETE error:", error);
    return Response.json(
      { error: "Failed to delete data", details: error.message },
      { status: 500 }
    );
  }
}

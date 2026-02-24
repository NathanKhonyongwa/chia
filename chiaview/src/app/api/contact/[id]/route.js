/**
 * Contact Management API Route (Admin)
 * PATCH /api/contact/[id] - Update contact status
 * GET /api/contact/[id] - Get single contact
 * DELETE /api/contact/[id] - Delete contact
 */

import { supabase } from "@/lib/supabase";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return Response.json(
        { error: "Missing contact ID" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return Response.json({
      success: true,
      contact: data,
    });
  } catch (error) {
    console.error("Error fetching contact:", error);
    return Response.json(
      { error: "Failed to fetch contact", details: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status, priority, response } = body;

    if (!id) {
      return Response.json(
        { error: "Missing contact ID" },
        { status: 400 }
      );
    }

    // Build update object with only provided fields
    const updateData = {};
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;
    if (response !== undefined) updateData.response = response;
    if (response) {
      updateData.replied_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from("contacts")
      .update(updateData)
      .eq("id", id)
      .select();

    if (error) {
      throw error;
    }

    return Response.json({
      success: true,
      message: "Contact updated successfully",
      contact: data[0],
    });
  } catch (error) {
    console.error("Error updating contact:", error);
    return Response.json(
      { error: "Failed to update contact", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return Response.json(
        { error: "Missing contact ID" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("contacts")
      .delete()
      .eq("id", id);

    if (error) {
      throw error;
    }

    return Response.json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting contact:", error);
    return Response.json(
      { error: "Failed to delete contact", details: error.message },
      { status: 500 }
    );
  }
}

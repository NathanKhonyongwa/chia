/**
 * Form Submission Management API (Admin)
 * GET /api/forms/[id] - Get single submission with responses
 * PATCH /api/forms/[id] - Update submission status
 * DELETE /api/forms/[id] - Delete submission
 */

import { supabase } from "@/lib/supabase";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return Response.json(
        { error: "Missing submission ID" },
        { status: 400 }
      );
    }

    // Get submission
    const { data: submission, error } = await supabase
      .from("form_submissions")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    // Get associated field responses
    const { data: responses, error: responseError } = await supabase
      .from("form_responses")
      .select("*")
      .eq("form_submission_id", id);

    if (responseError) {
      console.error("Error fetching form responses:", responseError);
    }

    return Response.json({
      success: true,
      submission,
      fieldResponses: responses || [],
    });
  } catch (error) {
    console.error("Error fetching submission:", error);
    return Response.json(
      { error: "Failed to fetch submission", details: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status } = body;

    if (!id) {
      return Response.json(
        { error: "Missing submission ID" },
        { status: 400 }
      );
    }

    if (!status) {
      return Response.json(
        { error: "Status is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("form_submissions")
      .update({ status })
      .eq("id", id)
      .select();

    if (error) {
      throw error;
    }

    return Response.json({
      success: true,
      message: "Submission status updated",
      submission: data[0],
    });
  } catch (error) {
    console.error("Error updating submission:", error);
    return Response.json(
      { error: "Failed to update submission", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return Response.json(
        { error: "Missing submission ID" },
        { status: 400 }
      );
    }

    // Delete associated responses first
    await supabase
      .from("form_responses")
      .delete()
      .eq("form_submission_id", id);

    // Delete submission
    const { error } = await supabase
      .from("form_submissions")
      .delete()
      .eq("id", id);

    if (error) {
      throw error;
    }

    return Response.json({
      success: true,
      message: "Submission deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting submission:", error);
    return Response.json(
      { error: "Failed to delete submission", details: error.message },
      { status: 500 }
    );
  }
}

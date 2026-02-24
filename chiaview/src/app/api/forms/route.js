/**
 * Generic Form Submission API
 * POST /api/forms/submit - Submit any form
 * GET /api/forms - Get all submissions (admin)
 * GET /api/forms/[id] - Get single submission
 */

import { supabase } from "@/lib/supabase";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      formName,
      formType,
      email,
      name,
      phone,
      data,
    } = body;

    // Validate required fields
    if (!formName || !formType || !data) {
      return Response.json(
        { error: "Missing required fields: formName, formType, data" },
        { status: 400 }
      );
    }

    // Get client IP and user agent
    const ip = request.headers.get("x-forwarded-for") ||
               request.headers.get("x-client-ip") ||
               "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Insert form submission
    const { data: result, error } = await supabase
      .from("form_submissions")
      .insert([
        {
          form_name: formName,
          form_type: formType,
          email: email?.trim() || null,
          name: name?.trim() || null,
          phone: phone?.trim() || null,
          data: typeof data === "string" ? JSON.parse(data) : data,
          status: "new",
          ip_address: ip,
          user_agent: userAgent,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error inserting form submission:", error);
      throw error;
    }

    const submissionId = result[0]?.id;
    console.log("Form submission saved:", submissionId);

    // Store individual field responses
    if (data && typeof data === "object") {
      const responses = Object.entries(data).map(([fieldName, fieldValue]) => ({
        form_submission_id: submissionId,
        field_name: fieldName,
        field_value: typeof fieldValue === "string" ? fieldValue : JSON.stringify(fieldValue),
        field_type: typeof fieldValue,
      }));

      const { error: responseError } = await supabase
        .from("form_responses")
        .insert(responses);

      if (responseError) {
        console.error("Error storing form responses:", responseError);
        // Don't fail the entire request if individual responses fail
      }
    }

    return Response.json(
      {
        success: true,
        message: "Form submitted successfully",
        submissionId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Form submission error:", error);
    return Response.json(
      {
        error: "Failed to submit form",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * Get all form submissions (admin)
 */
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const formName = url.searchParams.get("formName");
    const formType = url.searchParams.get("formType");
    const status = url.searchParams.get("status");
    const limit = parseInt(url.searchParams.get("limit") || "50");
    const offset = parseInt(url.searchParams.get("offset") || "0");

    let query = supabase.from("form_submissions").select("*");

    if (formName) {
      query = query.eq("form_name", formName);
    }
    if (formType) {
      query = query.eq("form_type", formType);
    }
    if (status) {
      query = query.eq("status", status);
    }

    const { data, error, count } = await query
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    return Response.json({
      success: true,
      submissions: data,
      count: data.length,
      total: count,
      offset,
      limit,
    });
  } catch (error) {
    console.error("Error fetching form submissions:", error);
    return Response.json(
      { error: "Failed to fetch submissions", details: error.message },
      { status: 500 }
    );
  }
}

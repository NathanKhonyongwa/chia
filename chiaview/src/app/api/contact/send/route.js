/**
 * Contact Form API Route
 * POST /api/contact/send - Submit a contact form
 * GET /api/contact/list - Get all contacts (admin only)
 * PATCH /api/contact/[id] - Update contact status
 */

import { supabase } from "@/lib/supabase";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, phone } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return Response.json(
        { error: "Missing required fields: name, email, message" },
        { status: 400 }
      );
    }

    // Get client IP and user agent for security
    const ip = request.headers.get("x-forwarded-for") ||
               request.headers.get("x-client-ip") ||
               "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Insert into contacts table
    const { data, error } = await supabase
      .from("contacts")
      .insert([
        {
          name: name.trim(),
          email: email.trim(),
          phone: phone?.trim() || null,
          subject: subject?.trim() || "No Subject",
          message: message.trim(),
          status: "new",
          priority: "normal",
          ip_address: ip,
          user_agent: userAgent,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error inserting contact:", error);
      throw error;
    }

    console.log("Contact saved successfully:", data[0]?.id);

    // Here you could add email notification logic
    // Example: Send email to admin or confirmation email to user

    return Response.json(
      {
        success: true,
        message: "Thank you for contacting us! We will get back to you soon.",
        contactId: data[0]?.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return Response.json(
      {
        error: "Failed to submit contact form",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * Get all contacts (admin endpoint)
 */
export async function GET(request) {
  try {
    // Add authentication check here in production
    const url = new URL(request.url);
    const status = url.searchParams.get("status");
    const email = url.searchParams.get("email");

    let query = supabase.from("contacts").select("*");

    if (status) {
      query = query.eq("status", status);
    }
    if (email) {
      query = query.eq("email", email);
    }

    const { data, error } = await query.order("created_at", { ascending: false });

    if (error) throw error;

    return Response.json({
      success: true,
      contacts: data,
      count: data.length,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return Response.json(
      { error: "Failed to fetch contacts", details: error.message },
      { status: 500 }
    );
  }
}

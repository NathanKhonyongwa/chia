/**
 * Registrations API Route
 * POST /api/registrations - Create new registration/user account
 * GET /api/registrations - Get all registrations (admin)
 * PATCH /api/registrations/[id] - Update registration
 */

import { supabase } from "@/lib/supabase";
import crypto from "crypto";

/**
 * Hash password using SHA-256 (use bcrypt in production)
 */
function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      password,
      confirmPassword,
      registrationType,
      dateOfBirth,
      address,
      city,
      state,
      country,
      postalCode,
    } = body;

    // Validate required fields
    if (!name || !email || !password) {
      return Response.json(
        { error: "Missing required fields: name, email, password" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return Response.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return Response.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const { data: existingUser } = await supabase
      .from("registrations")
      .select("id")
      .eq("email", email.toLowerCase())
      .single();

    if (existingUser) {
      return Response.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // Get client IP and user agent
    const ip = request.headers.get("x-forwarded-for") ||
               request.headers.get("x-client-ip") ||
               "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Hash password
    const passwordHash = hashPassword(password);

    // Insert registration
    const { data, error } = await supabase
      .from("registrations")
      .insert([
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone?.trim() || null,
          password_hash: passwordHash,
          registration_type: registrationType || "member",
          status: "active",
          email_verified: false,
          date_of_birth: dateOfBirth || null,
          address: address?.trim() || null,
          city: city?.trim() || null,
          state: state?.trim() || null,
          country: country?.trim() || null,
          postal_code: postalCode?.trim() || null,
          ip_address: ip,
          user_agent: userAgent,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error creating registration:", error);
      if (error.code === "23505") {
        // Unique constraint violation
        return Response.json(
          { error: "Email already registered" },
          { status: 409 }
        );
      }
      throw error;
    }

    console.log("Registration created successfully:", data[0]?.id);

    // Remove sensitive data before returning
    const { password_hash, ...userWithoutPassword } = data[0];

    return Response.json(
      {
        success: true,
        message: "Registration successful! Please verify your email.",
        user: userWithoutPassword,
        userId: data[0]?.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return Response.json(
      {
        error: "Failed to create registration",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * Get all registrations (admin endpoint)
 */
export async function GET(request) {
  try {
    // Add authentication check here in production
    const url = new URL(request.url);
    const status = url.searchParams.get("status");
    const registrationType = url.searchParams.get("type");

    let query = supabase
      .from("registrations")
      .select("id, name, email, phone, registration_type, status, email_verified, created_at, updated_at");

    if (status) {
      query = query.eq("status", status);
    }
    if (registrationType) {
      query = query.eq("registration_type", registrationType);
    }

    const { data, error } = await query.order("created_at", { ascending: false });

    if (error) throw error;

    return Response.json({
      success: true,
      registrations: data,
      count: data.length,
    });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return Response.json(
      { error: "Failed to fetch registrations", details: error.message },
      { status: 500 }
    );
  }
}

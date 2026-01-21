/**
 * Registration Management API (Admin)
 * GET /api/registrations/[id] - Get single registration
 * PATCH /api/registrations/[id] - Update registration
 * DELETE /api/registrations/[id] - Delete registration
 */

import { supabase } from "@/lib/supabase";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return Response.json(
        { error: "Missing registration ID" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("registrations")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    // Remove password hash
    const { password_hash, ...userWithoutPassword } = data;

    return Response.json({
      success: true,
      registration: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error fetching registration:", error);
    return Response.json(
      { error: "Failed to fetch registration", details: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const {
      name,
      phone,
      status,
      email_verified,
      dateOfBirth,
      address,
      city,
      state,
      country,
      postalCode,
      bio,
      profilePictureUrl,
    } = body;

    if (!id) {
      return Response.json(
        { error: "Missing registration ID" },
        { status: 400 }
      );
    }

    // Build update object
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (status !== undefined) updateData.status = status;
    if (email_verified !== undefined) {
      updateData.email_verified = email_verified;
      if (email_verified) {
        updateData.email_verified_at = new Date().toISOString();
      }
    }
    if (dateOfBirth !== undefined) updateData.date_of_birth = dateOfBirth;
    if (address !== undefined) updateData.address = address;
    if (city !== undefined) updateData.city = city;
    if (state !== undefined) updateData.state = state;
    if (country !== undefined) updateData.country = country;
    if (postalCode !== undefined) updateData.postal_code = postalCode;
    if (bio !== undefined) updateData.bio = bio;
    if (profilePictureUrl !== undefined) updateData.profile_picture_url = profilePictureUrl;

    const { data, error } = await supabase
      .from("registrations")
      .update(updateData)
      .eq("id", id)
      .select();

    if (error) {
      throw error;
    }

    const { password_hash, ...userWithoutPassword } = data[0];

    return Response.json({
      success: true,
      message: "Registration updated successfully",
      registration: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error updating registration:", error);
    return Response.json(
      { error: "Failed to update registration", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return Response.json(
        { error: "Missing registration ID" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("registrations")
      .delete()
      .eq("id", id);

    if (error) {
      throw error;
    }

    return Response.json({
      success: true,
      message: "Registration deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting registration:", error);
    return Response.json(
      { error: "Failed to delete registration", details: error.message },
      { status: 500 }
    );
  }
}

/**
 * Testimonials API Route
 * GET /api/testimonials - Get all testimonials
 * POST /api/testimonials - Create a new testimonial
 */

import { NextResponse } from "next/server";

// Fallback testimonials data
const fallbackTestimonials = [
  {
    id: 1,
    name: "Mary Kamwendo",
    role: "Community Member",
    content:
      "The work of Chia View has transformed our family. The youth mentorship program changed my son's life completely. He's now a strong believer and leader in our community.",
    rating: 5,
    image: "👩‍🌾",
  },
  {
    id: 2,
    name: "Joseph Banda",
    role: "Volunteer",
    content:
      "Being part of this mission has deepened my faith and shown me the real meaning of service. Every project we undertake is done with genuine love and dedication.",
    rating: 5,
    image: "👨‍💼",
  },
  {
    id: 3,
    name: "Grace Mchope",
    role: "Beneficiary",
    content:
      "When our family was struggling with food and my daughter needed school fees, Chia View stepped in. But more importantly, they shared the gospel and now our whole family believes.",
    rating: 5,
    image: "👩",
  },
  {
    id: 4,
    name: "David Chisambi",
    role: "Youth Leader",
    content:
      "The discipleship and leadership training I received equipped me to lead others. The pastors genuinely care about the spiritual development of every young person.",
    rating: 5,
    image: "👨",
  },
];

export async function GET() {
  try {
    // For now, return the fallback testimonials
    // In production, this would load from the database
    return NextResponse.json({
      success: true,
      testimonials: fallbackTestimonials
    });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials", success: false },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, role, quote, category } = body;

    if (!name || !quote) {
      return NextResponse.json(
        { error: "Missing name or quote", success: false },
        { status: 400 }
      );
    }

    // For now, just return success with mock data
    // In production, this would save to database
    const newTestimonial = {
      id: Date.now(),
      name,
      role: role || "Community Member",
      content: quote,
      category: category || "General",
      rating: 5,
      image: "👤",
      created_at: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      testimonial: newTestimonial
    });
  } catch (error) {
    console.error("Error saving testimonial:", error);
    return NextResponse.json(
      { error: "Failed to add testimonial", success: false },
      { status: 500 }
    );
  }
}

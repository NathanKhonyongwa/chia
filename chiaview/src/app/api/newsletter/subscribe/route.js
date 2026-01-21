/**
 * Newsletter Subscription API Route
 * POST /api/newsletter/subscribe - Subscribe an email to the newsletter
 */

import { supabase } from "@/lib/supabase";

export async function POST(request) {
  try {
    const { email, name } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const { data: existing } = await supabase
      .from("newsletter_subscriptions")
      .select("id, status")
      .eq("email", email.toLowerCase())
      .single();

    if (existing && existing.status === "subscribed") {
      return Response.json(
        { success: true, message: "You are already subscribed!" },
        { status: 200 }
      );
    }

    // Insert or update subscription
    const { error } = await supabase
      .from("newsletter_subscriptions")
      .upsert([
        {
          email: email.toLowerCase(),
          name: name || null,
          status: "subscribed",
          subscription_date: new Date().toISOString(),
          email_confirmed: false,
        },
      ], { onConflict: ["email"] });

    if (error) {
      throw error;
    }

    return Response.json(
      { success: true, message: "Thank you for subscribing!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Newsletter subscribe error:", error);
    return Response.json(
      { error: "Failed to subscribe.", details: error.message },
      { status: 500 }
    );
  }
}

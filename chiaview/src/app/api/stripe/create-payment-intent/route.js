/**
 * Stripe Payment Intent API
 * POST /api/stripe/create-payment-intent
 */

import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  // Only warn in development, not during build
  if (process.env.NODE_ENV === 'development') {
    console.error('Stripe secret key not configured. Set STRIPE_SECRET_KEY');
  }
}

const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

export async function POST(request) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: 'Payment processing not configured' },
        { status: 500 }
      );
    }

    const { amount, currency = 'usd', donationType, category, isMonthly = false, metadata } = await request.json();

    if (!amount || amount < 1) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        donationType: donationType || 'general',
        category: category || 'general',
        isMonthly: isMonthly.toString(),
        ...metadata
      },
      description: `Chia View ${isMonthly ? 'Monthly' : 'One-time'} Donation${category ? ` - ${category}` : ''}`,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });

  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
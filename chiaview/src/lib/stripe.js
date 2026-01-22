/**
 * Stripe Configuration
 * Payment processing setup
 */

import { loadStripe } from '@stripe/stripe-js';

// Stripe public key (will be set in environment variables)
const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!stripePublicKey) {
  // Only warn in development, not during build
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    console.warn('Stripe public key not configured. Set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY');
  }
}

// Initialize Stripe
export const stripePromise = stripePublicKey ? loadStripe(stripePublicKey) : null;

// Donation amounts and categories
export const donationOptions = {
  oneTime: [
    { amount: 25, label: 'Basic Support - $25' },
    { amount: 50, label: 'Community Support - $50' },
    { amount: 100, label: 'Family Support - $100' },
    { amount: 250, label: 'Ministry Support - $250' },
    { amount: 500, label: 'Major Support - $500' },
    { amount: 1000, label: 'Leadership Support - $1,000' }
  ],
  monthly: [
    { amount: 10, label: 'Monthly Partner - $10/month' },
    { amount: 25, label: 'Faith Partner - $25/month' },
    { amount: 50, label: 'Community Partner - $50/month' },
    { amount: 100, label: 'Ministry Partner - $100/month' }
  ]
};

export const donationCategories = [
  { id: 'general', name: 'General Fund', description: 'Support our general ministry operations' },
  { id: 'youth', name: 'Youth Programs', description: 'Empower the next generation' },
  { id: 'outreach', name: 'Community Outreach', description: 'Support vulnerable families' },
  { id: 'missions', name: 'Missions', description: 'Spread hope and God\'s love globally' },
  { id: 'education', name: 'Education', description: 'Educational support and scholarships' },
  { id: 'emergency', name: 'Emergency Relief', description: 'Help in times of crisis' }
];
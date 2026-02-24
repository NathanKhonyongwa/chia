/**
 * DonationForm - Stripe payment integration component
 * Features:
 * - One-time and recurring donations
 * - Multiple donation categories
 * - Custom amounts
 * - Tax-deductible receipts
 * - Secure payment processing
 */

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { FaCreditCard, FaLock, FaHeart, FaCalendarAlt } from 'react-icons/fa';
import { donationOptions, donationCategories } from '@/lib/stripe';

export default function DonationForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const [donationType, setDonationType] = useState('oneTime');
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState('');
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    isAnonymous: false,
    wantsReceipt: true
  });

  const currentOptions = donationOptions[donationType];
  const selectedCategoryInfo = donationCategories.find(cat => cat.id === selectedCategory);

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value) => {
    setSelectedAmount('');
    setCustomAmount(value);
  };

  const getTotalAmount = () => {
    return selectedAmount || parseFloat(customAmount) || 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const amount = getTotalAmount();
    if (amount < 1) {
      alert('Please select or enter a valid donation amount');
      return;
    }

    if (!donorInfo.name && !donorInfo.isAnonymous) {
      alert('Please provide your name or choose anonymous donation');
      return;
    }

    if (!donorInfo.email && !donorInfo.isAnonymous) {
      alert('Please provide your email address');
      return;
    }

    setIsProcessing(true);

    try {
      // Create payment intent
      const response = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          donationType,
          category: selectedCategory,
          isMonthly: donationType === 'monthly',
          metadata: {
            donorName: donorInfo.isAnonymous ? 'Anonymous' : donorInfo.name,
            donorEmail: donorInfo.email,
            wantsReceipt: donorInfo.wantsReceipt,
            phone: donorInfo.phone,
            address: donorInfo.address
          }
        }),
      });

      const { clientSecret, error } = await response.json();

      if (error) {
        throw new Error(error);
      }

      // Confirm payment
      const { error: paymentError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/donations/success?amount=${amount}&type=${donationType}&category=${selectedCategory}`,
        },
      });

      if (paymentError) {
        throw new Error(paymentError.message);
      }

    } catch (error) {
      console.error('Payment error:', error);
      alert(`Payment failed: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentSucceeded) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaHeart className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Thank You for Your Generous Gift!
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Your donation will help transform lives in our community. God bless you abundantly!
        </p>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            A tax-deductible receipt will be sent to your email address within 24 hours.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center gap-3 mb-2">
            <FaHeart className="w-6 h-6" />
            <h2 className="text-2xl font-bold">Make a Donation</h2>
          </div>
          <p className="text-blue-100">
            Your generosity helps us spread hope and God's love in our community
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Donation Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Donation Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDonationType('oneTime')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  donationType === 'oneTime'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                }`}
              >
                <FaHeart className="w-5 h-5 mx-auto mb-2 text-gray-600 dark:text-gray-400" />
                <div className="text-sm font-medium">One-Time Gift</div>
              </button>
              <button
                type="button"
                onClick={() => setDonationType('monthly')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  donationType === 'monthly'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                }`}
              >
                <FaCalendarAlt className="w-5 h-5 mx-auto mb-2 text-gray-600 dark:text-gray-400" />
                <div className="text-sm font-medium">Monthly Giving</div>
              </button>
            </div>
          </div>

          {/* Donation Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Support Area
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {donationCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {selectedCategoryInfo && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {selectedCategoryInfo.description}
              </p>
            )}
          </div>

          {/* Amount Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Donation Amount
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
              {currentOptions.map((option) => (
                <button
                  key={option.amount}
                  type="button"
                  onClick={() => handleAmountSelect(option.amount)}
                  className={`p-3 rounded-lg border-2 text-center transition-all ${
                    selectedAmount === option.amount
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="font-medium">${option.amount}</div>
                  <div className="text-xs opacity-75">{option.label.split(' - ')[0]}</div>
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                min="1"
                step="0.01"
                placeholder="Other amount"
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Donor Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Your Information</h3>

            {/* Anonymous Option */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="anonymous"
                checked={donorInfo.isAnonymous}
                onChange={(e) => setDonorInfo(prev => ({ ...prev, isAnonymous: e.target.checked }))}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="anonymous" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Make this donation anonymous
              </label>
            </div>

            {!donorInfo.isAnonymous && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={donorInfo.name}
                      onChange={(e) => setDonorInfo(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={donorInfo.email}
                      onChange={(e) => setDonorInfo(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      value={donorInfo.phone}
                      onChange={(e) => setDonorInfo(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="+260 XXX XXX XXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Tax Receipt
                    </label>
                    <div className="flex items-center mt-2">
                      <input
                        type="checkbox"
                        id="receipt"
                        checked={donorInfo.wantsReceipt}
                        onChange={(e) => setDonorInfo(prev => ({ ...prev, wantsReceipt: e.target.checked }))}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="receipt" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        Send me a tax-deductible receipt
                      </label>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Payment Element */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Payment Information
            </label>
            <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
              <PaymentElement
                options={{
                  layout: 'tabs'
                }}
              />
            </div>
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-600 dark:text-gray-400">
              <FaLock className="w-4 h-4" />
              <span>Your payment information is secure and encrypted</span>
            </div>
          </div>

          {/* Total and Submit */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium text-gray-900 dark:text-white">Total:</span>
              <span className="text-2xl font-bold text-blue-600">
                ${getTotalAmount().toFixed(2)}
                {donationType === 'monthly' && <span className="text-sm font-normal text-gray-600">/month</span>}
              </span>
            </div>

            <button
              type="submit"
              disabled={!stripe || isProcessing}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-3"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  <FaCreditCard className="w-5 h-5" />
                  Complete Donation
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
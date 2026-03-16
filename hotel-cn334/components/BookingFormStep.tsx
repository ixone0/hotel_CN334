'use client';

import React, { useState } from 'react';
import {
  BookingFormData,
  ContactInfo,
  DateRange,
  GuestCount,
  BookingResponse,
  BookingStep,
  QRCodeData,
} from '@/types/booking';

interface BookingFormProps {
  roomType: string;
  pricePerNight: number;
  onBookingComplete: (data: QRCodeData) => void;
  onStepChange: (step: BookingStep) => void;
}

const PAYMENT_METHODS = [
  { id: 'credit_card', label: 'Credit / Debit card' },
  { id: 'thai_qr', label: 'Thai QR' },
  { id: 'alipay', label: 'Alipay' },
  { id: 'wechat', label: 'WeChat Pay' },
];

export default function BookingForm({
  roomType,
  pricePerNight,
  onBookingComplete,
  onStepChange,
}: BookingFormProps) {
  // Date State
  const [dates, setDates] = useState<DateRange>({
    checkIn: '2025-03-04',
    checkOut: '2025-03-05',
  });

  // Guest Count State
  const [guests, setGuests] = useState<GuestCount>({
    adults: 1,
    children: 0,
  });

  // Contact Info State
  const [contact, setContact] = useState<ContactInfo>({
    title: 'Mr.',
    fullName: '',
    phoneNumber: '',
    email: '',
  });

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState<string>('credit_card');

  // Loading State
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate total price
  const totalGuests = guests.adults + guests.children;
  const totalPrice = pricePerNight * totalGuests;

  // Handle date change
  const handleDateChange = (field: 'checkIn' | 'checkOut', value: string) => {
    setDates((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle guest count change
  const handleGuestChange = (
    field: 'adults' | 'children',
    delta: number
  ) => {
    setGuests((prev) => ({
      ...prev,
      [field]: Math.max(field === 'adults' ? 1 : 0, prev[field] + delta),
    }));
  };

  // Handle contact info change
  const handleContactChange = (
    field: keyof ContactInfo,
    value: string
  ) => {
    setContact((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle payment method change
  const handlePaymentChange = (method: string) => {
    setPaymentMethod(method);
  };

  // Validate form
  const validateForm = (): boolean => {
    if (!contact.fullName.trim()) {
      setError('Please enter your full name');
      return false;
    }
    if (!contact.phoneNumber.trim()) {
      setError('Please enter your phone number');
      return false;
    }
    if (!contact.email.trim()) {
      setError('Please enter your email');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(contact.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    setError(null);
    return true;
  };

  // Submit booking
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Prepare booking data
      const bookingData: BookingFormData = {
        roomType,
        price: totalPrice,
        dates,
        guests,
        contact,
        paymentMethod,
      };

      console.log('📤 Sending booking data:', bookingData);

      // POST to Mock Server
      const response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      console.log('📊 Response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('✅ Response received:', responseData);

      // Generate booking ID (mock)
      const bookingId = `#${Math.random().toString().slice(2, 8).padEnd(7, '0')}`;

      // Prepare QR Code data
      const qrData: QRCodeData = {
        bookingId,
        roomType,
        checkIn: dates.checkIn,
        checkOut: dates.checkOut,
        guestName: contact.fullName,
      };

      // Change to QR step
      onStepChange('qr');
      onBookingComplete(qrData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Booking failed';
      setError(`Error: ${errorMessage}. Please try again.`);
      onStepChange('error');
      console.error('Booking error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Date Selection */}
      <div className="border-2 border-gray-300 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h14M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="font-semibold">Select Dates</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-600 block mb-1">
              Check-in
            </label>
            <input
              type="date"
              value={dates.checkIn}
              onChange={(e) => handleDateChange('checkIn', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm font-semibold"
            />
          </div>
          <div>
            <label className="text-xs text-gray-600 block mb-1">
              Check-out
            </label>
            <input
              type="date"
              value={dates.checkOut}
              onChange={(e) => handleDateChange('checkOut', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm font-semibold"
            />
          </div>
        </div>
      </div>

      {/* Guest Count */}
      <div className="border-2 border-gray-300 rounded-lg p-4">
        <p className="font-semibold mb-4">Guest Count</p>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Adult</span>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={guests.adults}
                readOnly
                className="w-10 text-center border border-gray-300 rounded py-1 text-sm"
              />
              <button
                type="button"
                onClick={() => handleGuestChange('adults', -1)}
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded font-bold"
              >
                −
              </button>
              <button
                type="button"
                onClick={() => handleGuestChange('adults', 1)}
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded font-bold"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium block">Child</span>
              <p className="text-xs text-gray-500">(2-12 yrs.)</p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={guests.children}
                readOnly
                className="w-10 text-center border border-gray-300 rounded py-1 text-sm"
              />
              <button
                type="button"
                onClick={() => handleGuestChange('children', -1)}
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded font-bold"
              >
                −
              </button>
              <button
                type="button"
                onClick={() => handleGuestChange('children', 1)}
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded font-bold"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Total Price */}
      <div className="border-2 border-gray-300 rounded-lg p-4">
        <div className="text-center py-3 border-b mb-3">
          <p className="text-sm font-semibold">
            Total Price: <span className="text-lg">฿{totalPrice}</span>
          </p>
        </div>
        <p className="text-xs text-gray-600 text-center">
          {totalGuests} guest(s) × {pricePerNight} per night
        </p>
      </div>

      {/* Contact Information */}
      <div className="border-2 border-gray-300 rounded-lg p-4">
        <h3 className="font-bold text-center mb-4">Contact Information</h3>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-xs text-gray-600 block mb-1">Title</label>
            <select
              value={contact.title}
              onChange={(e) => handleContactChange('title', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option>Mr.</option>
              <option>Ms.</option>
              <option>Mrs.</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-600 block mb-1">
              Full-name
            </label>
            <input
              type="text"
              value={contact.fullName}
              onChange={(e) => handleContactChange('fullName', e.target.value)}
              placeholder="สุดสด ดีจองร้อม"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="text-xs text-gray-600 block mb-1">
            Phone number
          </label>
          <input
            type="tel"
            value={contact.phoneNumber}
            onChange={(e) =>
              handleContactChange('phoneNumber', e.target.value)
            }
            placeholder="099-99999999"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="text-xs text-gray-600 block mb-1">E-mail</label>
          <input
            type="email"
            value={contact.email}
            onChange={(e) => handleContactChange('email', e.target.value)}
            placeholder="thammasat@gmail.com"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>
      </div>

      {/* Payment Methods */}
      <div className="border-2 border-gray-300 rounded-lg p-4">
        <h3 className="font-bold mb-3">Payment methods</h3>
        <p className="text-xs text-gray-700 mb-3">
          We accept the following payment methods.
        </p>
        <div className="space-y-2">
          {PAYMENT_METHODS.map((method) => (
            <label key={method.id} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="payment"
                value={method.id}
                checked={paymentMethod === method.id}
                onChange={(e) => handlePaymentChange(e.target.value)}
                className="w-4 h-4"
              />
              <span className="ml-2 text-sm text-gray-700">{method.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gray-800 text-white font-semibold py-3 rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Processing...' : 'Book'}
      </button>
    </form>
  );
}

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

  // ตัวช่วยสร้างคลาสสำหรับ Input เพื่อให้ UI เป็นมาตรฐานเดียวกัน
  const inputClassName = "w-full bg-stone-50 border border-amber-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Error Message: ปรับให้ดูซอฟต์ลง ไม่แดงจนน่ากลัว */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      {/* Date Selection Card */}
      <div className="bg-white rounded-2xl border border-amber-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4 text-slate-800">
          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h14M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="font-bold">Select Dates</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Check-in</label>
            <input
              type="date"
              value={dates.checkIn}
              onChange={(e) => handleDateChange('checkIn', e.target.value)}
              className={inputClassName}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Check-out</label>
            <input
              type="date"
              value={dates.checkOut}
              onChange={(e) => handleDateChange('checkOut', e.target.value)}
              className={inputClassName}
            />
          </div>
        </div>
      </div>

      {/* Guest Count Card */}
      <div className="bg-white rounded-2xl border border-amber-100 shadow-sm p-5">
        <p className="font-bold text-slate-800 mb-4">Guest Count</p>
        <div className="space-y-4">
          {/* Adult */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-700">Adult</span>
            <div className="flex items-center gap-3 bg-stone-50 p-1 rounded-xl border border-amber-200">
              <button
                type="button"
                onClick={() => handleGuestChange('adults', -1)}
                className="w-8 h-8 flex items-center justify-center bg-white border border-amber-200 text-slate-600 hover:text-amber-700 rounded-lg font-bold transition-colors shadow-sm active:scale-95"
              >
                −
              </button>
              <input
                type="number"
                value={guests.adults}
                readOnly
                className="w-8 text-center bg-transparent border-none text-sm font-bold text-slate-800 p-0 focus:ring-0"
              />
              <button
                type="button"
                onClick={() => handleGuestChange('adults', 1)}
                className="w-8 h-8 flex items-center justify-center bg-white border border-amber-200 text-slate-600 hover:text-amber-700 rounded-lg font-bold transition-colors shadow-sm active:scale-95"
              >
                +
              </button>
            </div>
          </div>

          {/* Child */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-semibold text-slate-700 block">Child</span>
              <p className="text-xs text-slate-500">(2-12 yrs.)</p>
            </div>
            <div className="flex items-center gap-3 bg-stone-50 p-1 rounded-xl border border-amber-200">
              <button
                type="button"
                onClick={() => handleGuestChange('children', -1)}
                className="w-8 h-8 flex items-center justify-center bg-white border border-amber-200 text-slate-600 hover:text-amber-700 rounded-lg font-bold transition-colors shadow-sm active:scale-95"
              >
                −
              </button>
              <input
                type="number"
                value={guests.children}
                readOnly
                className="w-8 text-center bg-transparent border-none text-sm font-bold text-slate-800 p-0 focus:ring-0"
              />
              <button
                type="button"
                onClick={() => handleGuestChange('children', 1)}
                className="w-8 h-8 flex items-center justify-center bg-white border border-amber-200 text-slate-600 hover:text-amber-700 rounded-lg font-bold transition-colors shadow-sm active:scale-95"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information Card */}
      <div className="bg-white rounded-2xl border border-amber-100 shadow-sm p-5">
        <h3 className="font-bold text-slate-800 mb-4">Contact Information</h3>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="col-span-1">
            <label className="text-xs font-semibold text-slate-500 uppercase block mb-1.5">Title</label>
            <select
              value={contact.title}
              onChange={(e) => handleContactChange('title', e.target.value)}
              className={inputClassName}
            >
              <option>Mr.</option>
              <option>Ms.</option>
              <option>Mrs.</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="text-xs font-semibold text-slate-500 uppercase block mb-1.5">Full-name</label>
            <input
              type="text"
              value={contact.fullName}
              onChange={(e) => handleContactChange('fullName', e.target.value)}
              placeholder="สุดสวย ดีจริงพร้อม"
              className={inputClassName}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-xs font-semibold text-slate-500 uppercase block mb-1.5">Phone number</label>
          <input
            type="tel"
            value={contact.phoneNumber}
            onChange={(e) => handleContactChange('phoneNumber', e.target.value)}
            placeholder="099-999-9999"
            className={inputClassName}
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase block mb-1.5">E-mail</label>
          <input
            type="email"
            value={contact.email}
            onChange={(e) => handleContactChange('email', e.target.value)}
            placeholder="thammasat@gmail.com"
            className={inputClassName}
          />
        </div>
      </div>

      {/* Payment Methods Card */}
      <div className="bg-white rounded-2xl border border-amber-100 shadow-sm p-5">
        <h3 className="font-bold text-slate-800 mb-1">Payment methods</h3>
        <p className="text-xs text-slate-500 mb-4">
          We accept the following payment methods.
        </p>
        <div className="space-y-3">
          {PAYMENT_METHODS.map((method) => (
            <label 
              key={method.id} 
              className={`flex items-center cursor-pointer p-3 rounded-xl border transition-all ${
                paymentMethod === method.id 
                  ? 'border-amber-500 bg-amber-50' 
                  : 'border-amber-200 hover:border-amber-300'
              }`}
            >
              <input
                type="radio"
                name="payment"
                value={method.id}
                checked={paymentMethod === method.id}
                onChange={(e) => handlePaymentChange(e.target.value)}
                className="w-4 h-4 text-amber-700 border-amber-300 focus:ring-amber-500"
              />
              <span className={`ml-3 text-sm font-medium ${paymentMethod === method.id ? 'text-amber-900' : 'text-slate-700'}`}>
                {method.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Total Price & Submit Box */}
      <div className="bg-white p-5 rounded-2xl shadow-lg border border-amber-100 sticky bottom-4 z-10 flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Price</p>
            <p className="text-xs text-slate-500">
              {totalGuests} guest(s) × ฿{pricePerNight}
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-extrabold text-amber-700">
              ฿{totalPrice.toLocaleString()}
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 rounded-xl font-bold text-white text-lg bg-amber-700 hover:bg-amber-800 hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Confirm Booking'
          )}
        </button>
      </div>

    </form>
  );
}
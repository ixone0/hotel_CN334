'use client';

import React from 'react';
import { QRCodeData } from '@/types/booking';

interface BookingSuccessProps {
  data: QRCodeData;
  onClose: () => void;
}

export default function BookingSuccess({ data, onClose }: BookingSuccessProps) {
  return (
    // ปรับพื้นหลังให้เบลอ (backdrop-blur-sm) และใช้สี slate-900/40 ให้ดูพรีเมียมขึ้น
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      
      {/* ตัวกล่อง Modal: ขอบโค้ง 3xl, เงาหนาขึ้น */}
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 md:p-8 text-center relative animate-in zoom-in-95 duration-200">
        
        {/* Close Button แบบ Modern */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 rounded-full transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Success Icon: Modern luxury amber theme */}
        <div className="mb-6 relative">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white mx-auto shadow-lg shadow-amber-200">
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <h2 className="text-2xl font-extrabold text-slate-900 mb-1 tracking-tight">Booking Confirmed!</h2>
        <p className="text-sm text-slate-500 mb-2">Your booking ID is</p>
        <p className="text-xl font-bold text-amber-700 mb-6 tracking-wider">
          {data.bookingId}
        </p>

        {/* Booking Details Card */}
        <div className="bg-stone-50 border border-amber-100 rounded-2xl p-5 text-left text-sm space-y-3 mb-8 shadow-inner">
          <div className="flex justify-between items-center border-b border-amber-200 pb-3">
            <p className="text-slate-500 font-medium">Guest Name</p>
            <p className="font-bold text-slate-900">{data.guestName}</p>
          </div>
          <div className="flex justify-between items-center border-b border-slate-200 pb-3">
            <p className="text-slate-500 font-medium">Room Type</p>
            <p className="font-bold text-slate-900">{data.roomType}</p>
          </div>
          <div className="flex justify-between items-center border-b border-slate-200 pb-3">
            <p className="text-slate-500 font-medium">Check-in</p>
            <p className="font-bold text-slate-900 text-right">
              {new Date(data.checkIn).toLocaleDateString('th-TH', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })} <span className="text-slate-500 text-xs ml-1">14:00</span>
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-slate-500 font-medium">Check-out</p>
            <p className="font-bold text-slate-900 text-right">
              {new Date(data.checkOut).toLocaleDateString('th-TH', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })} <span className="text-slate-500 text-xs ml-1">12:00</span>
            </p>
          </div>
        </div>

        {/* Done Button */}
        <button
          onClick={onClose}
          className="w-full py-4 rounded-xl font-bold text-white text-lg bg-amber-700 hover:bg-amber-800 hover:shadow-lg transition-all active:scale-[0.98]"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
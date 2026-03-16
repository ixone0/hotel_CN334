'use client';

import React from 'react';
import { QRCodeData } from '@/types/booking';

interface BookingSuccessProps {
  data: QRCodeData;
  onClose: () => void;
}

export default function BookingSuccess({ data, onClose }: BookingSuccessProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl"
        >
          ×
        </button>

        {/* Icon */}
        <div className="mb-6">
          <svg
            className="w-16 h-16 text-green-500 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Success Message */}
        <h2 className="text-2xl font-bold mb-2">Status: Success</h2>
        <p className="text-lg font-semibold text-gray-800 mb-6">{data.bookingId}</p>

        {/* Booking Details */}
        <div className="bg-gray-50 rounded-lg p-4 text-left text-sm space-y-2 mb-6">
          <div className="border-b pb-2">
            <p className="text-gray-600">Guest Name</p>
            <p className="font-semibold text-gray-800">{data.guestName}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-gray-600">Check-in</p>
            <p className="font-semibold text-gray-800">
              {new Date(data.checkIn).toLocaleDateString('th-TH', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })} 14:00
            </p>
          </div>
          <div className="border-b pb-2">
            <p className="text-gray-600">Check-out</p>
            <p className="font-semibold text-gray-800">
              {new Date(data.checkOut).toLocaleDateString('th-TH', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })} 12:00
            </p>
          </div>
          <div>
            <p className="text-gray-600">Room Type</p>
            <p className="font-semibold text-gray-800">{data.roomType}</p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full bg-gray-800 text-white font-semibold py-3 rounded-lg hover:bg-gray-900 transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
}

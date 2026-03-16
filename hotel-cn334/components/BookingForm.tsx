'use client';

import React, { useState } from 'react';

interface BookingFormProps {
  roomType: string;
  pricePerNight: number;
}

export default function BookingForm({ roomType, pricePerNight }: BookingFormProps) {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const totalPrice = pricePerNight * (adults + children);

  return (
    <div className="border-2 border-gray-300 rounded-lg p-4 mt-6">
      {/* Date Selection */}
      <div className="grid grid-cols-2 gap-4 mb-4 border-b pb-4">
        <div>
          <p className="text-xs text-gray-600 mb-1">Check-in</p>
          <p className="text-sm font-semibold">Mar 04</p>
        </div>
        <div>
          <p className="text-xs text-gray-600 mb-1">Check-out</p>
          <p className="text-sm font-semibold">Mar 05</p>
        </div>
      </div>

      {/* Guest Count */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Adult</span>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={adults}
              readOnly
              className="w-10 text-center border border-gray-300 rounded py-1"
            />
            <button
              onClick={() => setAdults(Math.max(1, adults - 1))}
              className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
            >
              −
            </button>
            <button
              onClick={() => setAdults(adults + 1)}
              className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-medium">Child</span>
            <p className="text-xs text-gray-500">(2-12 yrs.)</p>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={children}
              readOnly
              className="w-10 text-center border border-gray-300 rounded py-1"
            />
            <button
              onClick={() => setChildren(Math.max(0, children - 1))}
              className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
            >
              −
            </button>
            <button
              onClick={() => setChildren(children + 1)}
              className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Total Price */}
      <div className="border-t pt-4 mb-4">
        <p className="text-sm font-semibold text-center py-3">
          Total Price: {totalPrice}
        </p>
      </div>

      {/* Book Button */}
      <button className="w-full bg-gray-800 text-white font-semibold py-3 rounded-lg hover:bg-gray-900 transition-colors">
        Book
      </button>
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import { QRCodeData } from '@/types/booking';

interface QRCodeDisplayProps {
  data: QRCodeData;
  onComplete: () => void;
}

export default function QRCodeDisplay({ data, onComplete }: QRCodeDisplayProps) {
  const [displayQR, setDisplayQR] = useState(true);

  useEffect(() => {
    // Show QR for 3 seconds then transition to success
    const timer = setTimeout(() => {
      setDisplayQR(false);
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 text-center">
        <h2 className="text-2xl font-bold mb-6">QR Code</h2>

        {/* QR Code Placeholder */}
        <div className="bg-gray-100 border-2 border-gray-300 rounded-lg p-8 mb-6 flex items-center justify-center min-h-64">
          <div className="text-center">
            <svg
              className="w-32 h-32 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <p className="text-gray-500">QR Code</p>
          </div>
        </div>

        {/* Status */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">Status: Waiting...</p>
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div className="bg-gray-800 h-1 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Booking Details Preview */}
        <div className="bg-gray-50 rounded-lg p-4 text-left text-xs">
          <p className="text-gray-600 mb-2">Processing your booking...</p>
          <p className="font-semibold text-gray-800">{data.guestName}</p>
        </div>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import React from 'react';

interface HotelCardProps {
  id: string;
  roomType: string;
  price: string;
  bedInfo: string;
  amenities: string[];
}

export default function HotelCard({
  id,
  roomType,
  price,
  bedInfo,
  amenities,
}: HotelCardProps) {
  // Convert room type to URL format (e.g., "Type A" -> "type-a")
  const roomUrl = roomType.toLowerCase().replace(' ', '-');

  return (
    <Link href={`/room/${roomUrl}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
        {/* Room Image Placeholder */}
        <div className="h-48 bg-gray-300 flex items-center justify-center relative">
          <button
            type="button"
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl"
            onClick={(e) => e.preventDefault()}
          >
            ×
          </button>
          <div className="text-center">
            <p className="text-gray-600 font-medium mb-3">{roomType}</p>
            <div className="flex gap-2 justify-center">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Price */}
          <p className="text-sm text-gray-600 mb-2">Price: {price}</p>

          {/* Room Type */}
          <h2 className="text-lg font-semibold mb-4">{roomType}</h2>

          {/* Bed Info */}
          <p className="text-sm text-gray-700 mb-4">{bedInfo}</p>

          {/* Amenities */}
          <div>
            <h3 className="font-bold text-sm mb-2">Room Amenities</h3>
            <ul className="space-y-1">
              {amenities.slice(0, 6).map((item, index) => (
                <li key={index} className="flex items-start text-xs text-gray-700">
                  <span className="mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
              {amenities.length > 6 && (
                <li className="text-xs text-gray-600 font-medium">
                  + {amenities.length - 6} more
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </Link>
  );
}

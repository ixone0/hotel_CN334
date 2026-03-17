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
  // Convert room ID to URL format (e.g., "a" -> "type-a")
  const roomUrl = `type-${id}`;

  return (
    <Link href={`/room/${roomUrl}`} className="block h-full">
      {/* Container: Modern luxury card with subtle hover */}
      <div className="group bg-white rounded-2xl border border-amber-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer flex flex-col h-full">
        
        {/* Room Image Placeholder: Luxury aesthetic */}
        <div className="h-48 bg-gradient-to-br from-stone-100 to-amber-50 group-hover:from-stone-50 group-hover:to-amber-100 transition-colors duration-300 flex items-center justify-center relative">
          
          <button
            type="button"
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/70 hover:bg-white text-slate-500 hover:text-slate-700 backdrop-blur-sm transition-all text-xl"
            onClick={(e) => e.preventDefault()}
            aria-label="Close"
          >
            ×
          </button>

          <div className="text-center">
            <p className="text-slate-600 font-semibold tracking-widest uppercase text-xs">
              {roomType}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col flex-1">
          
          {/* Header & Price */}
          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-amber-700 transition-colors">
              {roomType}
            </h2>
            <div className="flex items-baseline gap-1">
              <span className="text-sm text-slate-600 font-medium">Starts from</span>
              <span className="text-lg font-extrabold text-amber-700">
                {price}
              </span>
            </div>
          </div>

          {/* Bed Info */}
          <p className="text-sm text-slate-600 font-medium mb-5 pb-5 border-b border-slate-100 flex items-center gap-2">
            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 11l4-4m0 0l4 4m-4-4v4" />
            </svg>
            {bedInfo}
          </p>

          {/* Amenities */}
          <div className="mt-auto">
            <h3 className="font-bold text-sm text-slate-900 mb-3">Room Amenities</h3>
            <ul className="space-y-2">
              {amenities.slice(0, 6).map((item, index) => (
                <li key={index} className="flex items-start text-sm text-slate-700">
                  <svg className="w-4 h-4 mr-2.5 text-amber-700 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="leading-tight">{item}</span>
                </li>
              ))}
              
              {amenities.length > 6 && (
                <li className="pt-2">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                    + {amenities.length - 6} more
                  </span>
                </li>
              )}
            </ul>
          </div>
          
        </div>
      </div>
    </Link>
  );
}
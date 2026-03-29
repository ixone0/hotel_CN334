import React from 'react';

interface RoomAmenitiesProps {
  items: string[];
}

export default function RoomAmenities({ items }: RoomAmenitiesProps) {
  return (
    // Card container with border
    <div className="bg-white rounded-2xl p-6 md:p-8 border border-amber-100 shadow-sm">
      
      {/* Header */}
      <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <svg className="w-6 h-6 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
        Room Amenities
      </h3>
      
      {/* Grid layout */}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
        {items.map((item, index) => (
          <li key={index} className="flex items-center text-slate-700 font-medium text-sm md:text-base">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-50 text-amber-700 mr-3 shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </span>
            {item}
          </li>
        ))}
      </ul>
      
    </div>
  );
}
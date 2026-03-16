import React from 'react';
import RoomAmenities from './RoomAmenities';

export default function RoomTypeB() {
  const amenities = [
    'Air conditioning',
    'Bathrobe',
    'Body gel or soap',
    'Cable or satellite television',
    'Free bottle water',
    'Fridge',
    'Hair dryer',
    'LCD Television',
    'Mini bar',
  ];

  return (
    <div className="p-4">
      {/* Room Info */}
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-2 tracking-tight">Type B</h2>
        <p className="text-slate-600 font-medium text-sm">
          2 Beds 1 Room 4 Peoples 32 m²
        </p>
      </div>

      {/* Room Image Carousel */}
      <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200 shadow-sm rounded-lg flex items-center justify-center mb-6">
        <div className="text-center">
          <div className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-2">Type B</div>
          <div className="flex gap-2 justify-center">
            <div className="w-2 h-2 bg-sky-500 rounded-full shadow-sm"></div>
            <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Amenities */}
      <RoomAmenities items={amenities} />
    </div>
  );
}
import React from 'react';
import RoomAmenities from './RoomAmenities';

export default function RoomTypeD() {
  const amenities = [
    'Air conditioning',
    'Bathrobe',
    'Body gel or soap',
    'Cable or satellite television',
    'Free bottle water',
    'Fridge',
    'Hair dryer',
    'LCD Television',
    'Sauna',
    'Gym access',
    'Concierge',
  ];

  return (
    <div className="p-4">
      {/* Room Info */}
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-2 tracking-tight">Type D</h2>
        <p className="text-slate-600 font-medium text-sm">
          3 Beds 3 Rooms 8 Peoples 60 m² - Luxury Suite
        </p>
      </div>

      {/* Room Image Carousel */}
      <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200 shadow-sm rounded-lg flex items-center justify-center mb-6">
        <div className="text-center">
          <div className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-2">Type D</div>
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
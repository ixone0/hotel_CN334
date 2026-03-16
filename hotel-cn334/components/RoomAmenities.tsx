import React from 'react';

interface RoomAmenitiesProps {
  items: string[];
}

export default function RoomAmenities({ items }: RoomAmenitiesProps) {
  return (
    <div className="mt-6">
      <h3 className="font-bold text-lg mb-3">Room Amenities</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start text-sm text-gray-700">
            <span className="mr-3">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

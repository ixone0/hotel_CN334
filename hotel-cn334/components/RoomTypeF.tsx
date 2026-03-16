import React from 'react';
import RoomAmenities from './RoomAmenities';
import BookingForm from './BookingForm';

export default function RoomTypeF() {
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
        <h2 className="text-2xl font-bold mb-2">Type F</h2>
        <p className="text-gray-600 text-sm">
          3 Beds 3 Rooms 8 Peoples 60 m² - Luxury Suite
        </p>
      </div>

      {/* Room Image Carousel */}
      <div className="h-48 bg-gray-300 rounded-lg flex items-center justify-center mb-6">
        <div className="text-center">
          <div className="text-gray-600 font-medium mb-2">Type F</div>
          <div className="flex gap-2 justify-center">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Amenities */}
      <RoomAmenities items={amenities} />

      {/* Booking Form */}
      <BookingForm roomType="Type F" pricePerNight={7500} />
    </div>
  );
}

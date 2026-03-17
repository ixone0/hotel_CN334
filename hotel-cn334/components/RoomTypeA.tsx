import React from 'react';
import RoomAmenities from './RoomAmenities';

export default function RoomTypeA() {
  const amenities = [
    'Air conditioning',
    'Bathrobe',
    'Body gel or soap',
    'Cable or satellite television',
    'Free bottle water',
    'Fridge',
    'Hair dryer',
    'LCD Television',
    'Other',
  ];

  return (
    <div className="p-4">
      
      {/* Room Info */}
      <div className="mb-6">
        {/* ปรับ: ใส่ text-slate-900 ให้สีดำเข้มชัดเจน + font-extrabold และ tracking-tight ให้ฟอนต์ดู Modern ขึ้น */}
        <h2 className="text-2xl font-extrabold text-slate-900 mb-2 tracking-tight">
          Type A
        </h2>
        {/* ปรับ: เปลี่ยนสีเทาธรรมดาเป็น text-slate-600 และเพิ่ม font-medium ให้อ่านง่ายไม่กลืนจาง */}
        <p className="text-slate-600 font-medium text-sm">
          1 Bed 1 Room 2 Peoples 24 m²
        </p>
      </div>

      {/* Room Image Carousel */}
      <div className="h-48 bg-gradient-to-br from-stone-100 to-amber-50 border border-amber-100 shadow-sm rounded-lg flex items-center justify-center mb-6">
        <div className="text-center">
          <div className="text-slate-600 font-bold uppercase tracking-widest text-sm mb-2">
            Type A
          </div>
          <div className="flex gap-2 justify-center">
            <div className="w-2 h-2 bg-amber-600 rounded-full shadow-sm"></div>
            <div className="w-2 h-2 bg-amber-200 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Amenities */}
      <RoomAmenities items={amenities} />
      
    </div>
  );
}
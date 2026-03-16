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
      {/* Container: เปลี่ยนเป็นขอบโค้ง 2xl, ใส่ group ไว้คุมเอฟเฟกต์ตอน Hover */}
      <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col h-full">
        
        {/* Room Image Placeholder: ปรับจากสีเทาเป็น Gradient อ่อนๆ ดูพรีเมียม */}
        <div className="h-48 bg-gradient-to-br from-slate-50 to-slate-100 group-hover:from-sky-50 group-hover:to-indigo-50 transition-colors duration-500 flex items-center justify-center relative">
          
          <button
            type="button"
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/50 hover:bg-white text-slate-400 hover:text-slate-700 backdrop-blur-sm transition-all text-xl"
            onClick={(e) => e.preventDefault()}
            aria-label="Close"
          >
            ×
          </button>

          <div className="text-center transform group-hover:scale-105 transition-transform duration-500">
            <p className="text-slate-400 font-semibold mb-3 tracking-widest uppercase text-sm">
              {roomType}
            </p>
            <div className="flex gap-2 justify-center">
              <div className="w-2 h-2 bg-sky-300 rounded-full"></div>
              <div className="w-2 h-2 bg-indigo-300 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col flex-1">
          
          {/* Header & Price: จัดกลุ่มให้อ่านง่าย เน้นราคาให้เตะตา */}
          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
              {roomType}
            </h2>
            <div className="flex items-baseline gap-1">
              <span className="text-sm text-slate-500 font-medium">Starts from</span>
              {/* ทำราคาสีรุ้งให้เข้ากับธีม Header */}
              <span className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">
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
            <h3 className="font-bold text-sm text-slate-800 mb-3">Room Amenities</h3>
            <ul className="space-y-2.5">
              {amenities.slice(0, 6).map((item, index) => (
                <li key={index} className="flex items-start text-sm text-slate-600">
                  {/* เปลี่ยน Bullet ธรรมดาเป็น Check ไอคอนสีฟ้า */}
                  <svg className="w-4 h-4 mr-2.5 text-sky-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="leading-tight">{item}</span>
                </li>
              ))}
              
              {/* ส่วน +more ที่ดูเป็นป้าย Tag น่ารักๆ */}
              {amenities.length > 6 && (
                <li className="pt-2">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-sky-50 text-sky-600 border border-sky-100">
                    + {amenities.length - 6} more amenities
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
'use client';

import React from 'react';
import Link from 'next/link';

interface HeaderProps {
  title?: string;
}

export default function Header({ title = 'Hotel' }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-4 max-w-3xl mx-auto">
        
        {/* ปุ่ม Home (ซ้าย) */}
        <Link href="/" className="w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity">
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            {/* ฝังสี Gradient ไว้ใน SVG โดยตรง */}
            <defs>
              <linearGradient id="gradient-home" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />   {/* สีฟ้า Sky */}
                <stop offset="50%" stopColor="#818cf8" />  {/* สีคราม Indigo */}
                <stop offset="100%" stopColor="#c084fc" /> {/* สีม่วงพาสเทล Purple */}
              </linearGradient>
            </defs>
            <path
              stroke="url(#gradient-home)" // เรียกใช้สี Gradient ตรงนี้
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 11l4-4m0 0l4 4m-4-4v4"
            />
          </svg>
        </Link>
        
        {/* ชื่อโรงแรมแบบ Premium Dark */}
        <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight drop-shadow-md border-b-2 border-sky-400 pb-1">
          {title}
        </h1>
        {/* ปุ่ม Profile (ขวา) */}
        <div className="w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer">
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            {/* ฝังสี Gradient ไว้ใน SVG โดยตรง (ตั้ง ID ให้ต่างกันกันพลาด) */}
            <defs>
              <linearGradient id="gradient-profile" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>
            <path
              stroke="url(#gradient-profile)" // เรียกใช้สี Gradient ตรงนี้
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>

      </div>
    </header>
  );
}
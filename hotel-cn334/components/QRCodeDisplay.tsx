'use client';

import React, { useEffect, useState } from 'react';
import { QRCodeData } from '@/types/booking';

interface QRCodeDisplayProps {
  data: QRCodeData;
  onComplete: () => void;
}

export default function QRCodeDisplay({ data, onComplete }: QRCodeDisplayProps) {
  const [displayQR, setDisplayQR] = useState(true);

  useEffect(() => {
    // Show QR for 3 seconds then transition to success
    const timer = setTimeout(() => {
      setDisplayQR(false);
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    // พื้นหลังเบลอและมืดลงนิดหน่อย (backdrop-blur-sm) ให้เหมือนหน้า Success
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      
      {/* กล่อง Modal ขอบมน 3xl และเงาหนา */}
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 md:p-8 text-center relative animate-in zoom-in-95 duration-200">
        
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Payment</h2>
        <p className="text-slate-500 text-sm mb-6">Scan QR code to complete your booking</p>

        {/* QR Code Placeholder: Modern amber theme */}
        <div className="relative border-2 border-dashed border-amber-200 bg-stone-50 rounded-2xl p-8 mb-8 flex items-center justify-center min-h-[250px] overflow-hidden group">
          
          {/* Background effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-50 to-amber-50 opacity-50"></div>
          
          <div className="text-center relative z-10 animate-pulse duration-1000">
            {/* เปลี่ยนไอคอนจากเส้นกากบาทเป็นรูป QR Code เสมือนจริง */}
            <svg 
              className="w-32 h-32 text-slate-800 mx-auto mb-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
            <p className="text-sm font-bold text-amber-700">
              Generating secure QR...
            </p>
          </div>
        </div>

        {/* Status Loading Bar */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Status: Waiting for payment</p>
          <div className="w-full bg-amber-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-amber-600 h-1.5 rounded-full w-full animate-[pulse_1.5s_ease-in-out_infinite]"></div>
          </div>
        </div>

        {/* Booking Details Preview */}
        <div className="bg-stone-50 border border-amber-100 rounded-xl p-4 text-left flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium mb-1">Guest</p>
            <p className="font-bold text-slate-900">{data.guestName}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500 font-medium mb-1">Room</p>
            <p className="font-bold text-slate-900">{data.roomType}</p>
          </div>
        </div>
        
      </div>
    </div>
  );
}
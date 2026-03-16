'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Header from '@/components/Header';
import RoomTypeA from '@/components/RoomTypeA';
import RoomTypeB from '@/components/RoomTypeB';
import RoomTypeC from '@/components/RoomTypeC';
import RoomTypeD from '@/components/RoomTypeD';
import BookingFormStep from '@/components/BookingFormStep';
import QRCodeDisplay from '@/components/QRCodeDisplay';
import BookingSuccess from '@/components/BookingSuccess';
import { BookingStep, QRCodeData } from '@/types/booking';

interface RoomConfig {
  name: string;
  price: number;
  component: React.ReactNode;
}

export default function RoomDetailPage() {
  const params = useParams();
  const router = useRouter();
  const roomType = params?.type as string;

  // Booking State Management
  const [bookingStep, setBookingStep] = useState<BookingStep>('form');
  const [qrData, setQrData] = useState<QRCodeData | null>(null);

  const roomConfigs: { [key: string]: RoomConfig } = {
    'type-a': { name: 'Type A', price: 3000, component: <RoomTypeA /> },
    'type-b': { name: 'Type B', price: 4500, component: <RoomTypeB /> },
    'type-c': { name: 'Type C', price: 5500, component: <RoomTypeC /> },
    'type-d': { name: 'Type D', price: 7500, component: <RoomTypeD /> },
  };

  const roomKey = roomType?.toLowerCase().replace(' ', '-');
  const roomConfig = roomKey ? roomConfigs[roomKey] : null;

  if (!roomConfig) {
    return (
      <div className="min-h-screen bg-slate-50 font-sans">
        <Header title="Cn334 Hotel" />
        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 inline-block">
            <h2 className="text-xl font-bold text-slate-800 mb-2">Room not found</h2>
            <p className="text-slate-500 mb-6">We couldn't find the room you're looking for.</p>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-2 bg-sky-50 text-sky-600 font-semibold rounded-full hover:bg-sky-100 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleBookingComplete = (data: QRCodeData) => {
    setQrData(data);
  };

  const handleSuccessClose = () => {
    setBookingStep('form');
    setQrData(null);
    router.push('/');
  };

  return (
    // เปลี่ยนพื้นหลังเป็น bg-slate-50 ให้คุมโทนพรีเมียม
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header title="Cn334 Hotel" />
      
      {/* ขยาย max-w ให้ใหญ่ขึ้นนิดนึงเพื่อให้ฟอร์มมีพื้นที่หายใจ (max-w-4xl) */}
      <div className="max-w-4xl mx-auto px-4 py-8 pb-16">
        
        {/* Header with Modern Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-sky-600 bg-white hover:bg-sky-50 rounded-full font-semibold text-sm transition-all shadow-sm border border-slate-200 hover:border-sky-200 active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>

        {/* Room Details Section (ดึง Component ย่อยมาแสดง) */}
        <div className="mb-10 bg-white rounded-3xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 overflow-hidden">
          {roomConfig.component}
        </div>

        {/* Booking Form Section */}
        {bookingStep === 'form' && (
          <div className="bg-white rounded-3xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white shadow-sm">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Booking Details</h2>
            </div>
            
            <BookingFormStep
              roomType={roomConfig.name}
              pricePerNight={roomConfig.price}
              onBookingComplete={handleBookingComplete}
              onStepChange={setBookingStep}
            />
          </div>
        )}

        {/* QR Code Display */}
        {bookingStep === 'qr' && qrData && (
          <div className="bg-white rounded-3xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 p-6 md:p-8">
            <QRCodeDisplay
              data={qrData}
              onComplete={() => setBookingStep('success')}
            />
          </div>
        )}

        {/* Success Page */}
        {bookingStep === 'success' && qrData && (
          <BookingSuccess data={qrData} onClose={handleSuccessClose} />
        )}

        {/* Error State (ปรับเป็น Toast Popup สไตล์ Modern) */}
        {bookingStep === 'error' && (
          <div className="fixed bottom-6 right-6 left-6 md:left-auto bg-white border-l-4 border-red-500 text-slate-800 px-6 py-5 rounded-2xl shadow-2xl flex flex-col gap-4 max-w-sm z-50 animate-in slide-in-from-bottom-5">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-500 shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Booking Failed</h4>
                <p className="text-sm text-slate-500 mt-1">Something went wrong. Please try again.</p>
              </div>
            </div>
            <button
              onClick={() => setBookingStep('form')}
              className="w-full py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
            >
              Retry Booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
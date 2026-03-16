'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Header from '@/components/Header';
import RoomTypeA from '@/components/RoomTypeA';
import RoomTypeB from '@/components/RoomTypeB';
import RoomTypeC from '@/components/RoomTypeC';
import RoomTypeF from '@/components/RoomTypeF';
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
    'type-f': { name: 'Type F', price: 7500, component: <RoomTypeF /> },
  };

  const roomKey = roomType?.toLowerCase().replace(' ', '-');
  const roomConfig = roomKey ? roomConfigs[roomKey] : null;

  if (!roomConfig) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Hotel" />
        <div className="max-w-3xl mx-auto px-4 py-12 text-center text-gray-600">
          <p>Room type not found</p>
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
    <div className="min-h-screen bg-gray-50">
      <Header title="Hotel" />
      <div className="max-w-3xl mx-auto px-4 py-6 pb-12">
        {/* Header with Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded text-sm font-medium transition-colors"
        >
          ← Back
        </button>

        {/* Room Details Section */}
        <div className="mb-8">{roomConfig.component}</div>

        {/* Booking Form Section */}
        {bookingStep === 'form' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Booking Details</h2>
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
          <QRCodeDisplay
            data={qrData}
            onComplete={() => setBookingStep('success')}
          />
        )}

        {/* Success Page */}
        {bookingStep === 'success' && qrData && (
          <BookingSuccess data={qrData} onClose={handleSuccessClose} />
        )}

        {/* Error State */}
        {bookingStep === 'error' && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded fixed bottom-4 right-4">
            <p>Booking failed. Please try again.</p>
            <button
              onClick={() => setBookingStep('form')}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

import Header from '@/components/Header';
import HotelCard from '@/components/HotelCard';

export default function Home() {
  const hotels = [
    {
      id: 'a',
      roomType: 'Type A - Superior Room',
      price: '฿ 3,000',
      bedInfo: '1 Bed • 2 Guests • 24 m²',
      amenities: [
        'Air conditioning', 
        'Bathrobe', 
        'Body gel or soap', 
        'Cable or satellite television', 
        'Free bottle water', 
        'Fridge', 
        'Hair dryer', 
        'LCD Television', 
        'Other'
      ],
    },
    {
      id: 'b',
      roomType: 'Type B - Deluxe Room',
      price: '฿ 4,500',
      bedInfo: '2 Beds • 4 Guests • 32 m²',
      amenities: [
        'Air conditioning', 
        'Bathrobe', 
        'Body gel or soap', 
        'Cable or satellite television', 
        'Free bottle water', 
        'Fridge', 
        'Hair dryer', 
        'LCD Television', 
        'Mini bar'
      ],
    },
    {
      id: 'c',
      roomType: 'Type C - Executive Suite',
      price: '฿ 5,500',
      bedInfo: '2 Beds • 6 Guests • 45 m²',
      amenities: [
        'Air conditioning', 
        'Bathrobe', 
        'Body gel or soap', 
        'Cable or satellite television', 
        'Free bottle water', 
        'Fridge', 
        'Hair dryer', 
        'LCD Television', 
        'Jacuzzi', 
        'Desk'
      ],
    },
    {
      id: 'd',
      roomType: 'Type D - Presidential Suite',
      price: '฿ 7,500',
      bedInfo: '3 Beds • 8 Guests • 60 m²',
      amenities: [
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
        'Concierge'
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header title="Cn334 Hotel" /> 

      <main className="max-w-5xl mx-auto px-4 py-8 pb-16">
        
        {/* HERO IMAGE SECTION */}
        <div className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden mb-8 shadow-sm">
          <img 
            src="https://www.sovereign.com/-/media/bynder/sovereign-collections/adult-only-holidays/kgsa2014119424016hybris.jpg?rev=6cf51de778f04091a1e25b6c99e70e18&w=1920&h=940" 
            alt="Cn334 Hotel Exterior" 
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">Cn334 Hotel</h1>
            <div className="flex items-center gap-2 text-sm md:text-base opacity-90">
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                📍 Phuket , Thailand
              </span>
            </div>
          </div>
        </div>

        {/* DESCRIPTION SECTION */}
        <div className="bg-white rounded-3xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 p-6 md:p-8 mb-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">About this hotel</h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Experience the perfect blend of modern luxury and traditional charm. 
                Our hotel offers world-class amenities, stunning city views, and exceptional service to make your stay unforgettable. 
                Perfect for both business and leisure travelers.
              </p>
            </div>
            
            {/* Review Badge */}
            <div className="flex flex-col items-center bg-slate-50 p-4 rounded-2xl border border-slate-100 min-w-[140px]">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-indigo-600">9.0</span>
                <span className="text-sm text-slate-500 font-medium">/10</span>
              </div>
              <span className="text-sm font-semibold text-slate-700 mt-1">Excellent</span>
              <span className="text-xs text-slate-500 mt-1">From 302 reviews</span>
            </div>
          </div>
        </div>

        {/* ROOM TYPES HEADER */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Available Rooms</h2>
          <span className="text-sm font-medium text-slate-500 bg-slate-200/50 px-3 py-1 rounded-full">
            {hotels.length} options
          </span>
        </div>

        {/* ROOM TYPES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              id={hotel.id}
              roomType={hotel.roomType}
              price={hotel.price}
              bedInfo={hotel.bedInfo}
              amenities={hotel.amenities}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
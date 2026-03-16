import Header from '@/components/Header';
import HotelCard from '@/components/HotelCard';

export default function Home() {
  const hotels = [
    {
      id: 'a',
      roomType: 'Type A',
      price: '฿ 3,000',
      bedInfo: '1 Bed 1 Room 2 Peoples 24 m²',
      amenities: [
        'Air conditioning',
        'Bathrobe',
        'Body gel or soap',
        'Cable or satellite television',
        'Free bottle water',
        'Fridge',
        'Hair dryer',
        'LCD Television',
        'Other',
      ],
    },
    {
      id: 'b',
      roomType: 'Type B',
      price: '฿ 4,500',
      bedInfo: '2 Beds 1 Room 4 Peoples 32 m²',
      amenities: [
        'Air conditioning',
        'Bathrobe',
        'Body gel or soap',
        'Cable or satellite television',
        'Free bottle water',
        'Fridge',
        'Hair dryer',
        'LCD Television',
        'Mini bar',
      ],
    },
    {
      id: 'c',
      roomType: 'Type C',
      price: '฿ 5,500',
      bedInfo: '2 Beds 2 Rooms 6 Peoples 45 m²',
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
        'Desk',
      ],
    },
    {
      id: 'f',
      roomType: 'Type F',
      price: '฿ 7,500',
      bedInfo: '3 Beds 3 Rooms 8 Peoples 60 m²',
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
        'Concierge',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Hotel" />
      <main className="max-w-3xl mx-auto px-4 py-6 pb-12">
        {/* Description Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Description</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veni am, quis nostrud exe rcitation ullamco laboris nisi ut aliquip ex ea commodo conse.
          </p>
          <p className="text-sm font-semibold text-gray-800">Review 9/10 (302 reviews)</p>
        </div>

        {/* Room Types Grid */}
        <div className="grid grid-cols-2 gap-4">
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

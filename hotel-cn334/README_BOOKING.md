# Hotel Booking Application

TypeScript-based hotel room booking system built with Next.js 16, React 19, and Tailwind CSS.

## 🎯 Features

- **Home Page**: Browse 4 room types (A, B, C, F) with amenities and pricing
- **Room Details**: View detailed information about each room type
- **Booking Form**: Complete booking with:
  - Date selection (check-in/check-out)
  - Guest count (adults & children)
  - Contact information (name, phone, email)
  - Payment method selection
- **Mock API Integration**: Posts booking data to httpbin.org/post
- **Booking Flow**:
  1. Form submission → Validation
  2. API request with error handling
  3. QR Code display (3 seconds)
  4. Success confirmation modal
- **TypeScript Safety**: Full type definitions for all data structures

## 📁 Project Structure

```
hotel-cn334/
├── types/
│   └── booking.ts              # TypeScript interfaces & types
├── components/
│   ├── Header.tsx              # Top navigation bar
│   ├── HotelCard.tsx           # Room card (home page)
│   ├── RoomTypeA.tsx           # Room A details
│   ├── RoomTypeB.tsx           # Room B details
│   ├── RoomTypeC.tsx           # Room C details
│   ├── RoomTypeF.tsx           # Room F details
│   ├── BookingFormStep.tsx     # Main booking form component
│   ├── QRCodeDisplay.tsx       # QR code modal (auto-closes)
│   ├── BookingSuccess.tsx      # Success confirmation modal
│   ├── RoomAmenities.tsx       # Amenities list component
│   └── BookingForm.tsx         # Legacy booking form (can remove)
├── app/
│   ├── page.tsx                # Home page (shows all rooms)
│   ├── layout.tsx              # Root layout
│   ├── globals.css             # Global styles
│   └── room/
│       └── [type]/
│           └── page.tsx        # Room detail & booking page
├── public/                     # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Visit `http://localhost:3000`

### Build & Deploy
```bash
npm run build
npm start
```

## 📋 TypeScript Types

### Booking Data Interfaces
```typescript
interface GuestCount {
  adults: number;
  children: number;
}

interface DateRange {
  checkIn: string;   // YYYY-MM-DD
  checkOut: string;  // YYYY-MM-DD
}

interface ContactInfo {
  title: string;           // Mr., Ms., Mrs.
  fullName: string;
  phoneNumber: string;
  email: string;
}

interface BookingFormData {
  roomType: string;
  price: number;
  dates: DateRange;
  guests: GuestCount;
  contact: ContactInfo;
  paymentMethod: string;
}

type BookingStep = 'form' | 'qr' | 'success' | 'error';
```

## 💾 State Management

React hooks (`useState`) manage:
- **Form Data**: dates, guests, contact info, payment method
- **UI State**: current booking step (form → QR → success)
- **API State**: loading, error handling, QR data storage
- **Validation**: email format, required fields

## 🌐 API Integration

### Booking POST Request
```typescript
const response = await fetch('https://httpbin.org/post', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(bookingData),
});
```

### Error Handling
```typescript
try {
  // API call
  const responseData = await response.json();
  // Success flow
} catch (err) {
  // Error state with user message
  setError(`Error: ${errorMessage}`);
}
```

## 🎨 Booking Flow UI

1. **Form Page**: Full booking form with all fields
2. **QR Code Modal**: 3-second countdown then auto-closes
3. **Success Modal**: Shows booking confirmation with:
   - Booking ID (mock)
   - Guest name
   - Check-in date & time (14:00)
   - Check-out date & time (12:00)
   - Room type

## ✅ Form Validation

- **Full Name**: Required
- **Phone**: Required
- **Email**: Required + valid format check
- **Dates**: Selectable from date picker
- **Guests**: Min 1 adult, 0+ children

## 🔐 Security Features

- TypeScript strict typing prevents runtime errors
- Input validation on form submission
- Email regex validation
- Error boundary handling with try...catch

## 📱 Responsive Design

- Mobile-first Tailwind CSS
- Grid layouts for room cards (2 columns)
- Full-width forms and modals
- Touch-friendly input sizes

## 🛠 Technologies

- **Framework**: Next.js 16.1.6
- **Language**: TypeScript 5
- **UI Library**: React 19.2.3
- **Styling**: Tailwind CSS 4
- **API Client**: Fetch API (built-in)

## 📝 Notes

- Mock API endpoint: https://httpbin.org/post (echoes request)
- QR Code timeout: 3 seconds (auto-transition to success)
- Room prices range: ฿3,000 - ฿7,500 per night
- Booking ID generation: Random 7-digit number with # prefix

## 🚀 Future Enhancements

- Real database integration (MongoDB/PostgreSQL)
- Actual QR code generation library
- Email confirmation sending
- Payment gateway integration (Stripe, 2C2P)
- User authentication system
- Booking history & management
- Admin dashboard
- Multi-language support (Thai/English)

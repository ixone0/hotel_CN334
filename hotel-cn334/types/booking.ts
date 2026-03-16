// Booking Data Interfaces
export interface GuestCount {
  adults: number;
  children: number;
}

export interface DateRange {
  checkIn: string;
  checkOut: string;
}

export interface ContactInfo {
  title: string;
  fullName: string;
  phoneNumber: string;
  email: string;
}

export interface PaymentMethod {
  type: 'credit_card' | 'thai_qr' | 'alipay' | 'wechat';
  label: string;
}

export interface BookingFormData {
  roomType: string;
  price: number;
  dates: DateRange;
  guests: GuestCount;
  contact: ContactInfo;
  paymentMethod: string;
}

export interface BookingResponse {
  bookingId: string;
  status: 'success' | 'pending' | 'failed';
  message: string;
  data?: BookingFormData;
}

export interface QRCodeData {
  bookingId: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guestName: string;
}

export type BookingStep = 'form' | 'qr' | 'success' | 'error';

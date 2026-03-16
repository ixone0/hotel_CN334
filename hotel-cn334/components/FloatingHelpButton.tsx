'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function FloatingHelpButton() {
  const pathname = usePathname();

  // ซ่อนปุ่มตอนอยู่หน้า chat หรือ booking
  if (pathname === '/chat' || pathname.includes('/booking')) {
    return null;
  }

  return (
    <Link
      href="/chat"
      className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 z-40"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      Need Help?
    </Link>
  );
}

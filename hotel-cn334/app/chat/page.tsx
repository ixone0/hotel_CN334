// app/chat/page.tsx
import Header from '@/components/Header';
import ChatBox from '@/components/ChatBox';

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ใช้ Header component เดิมจาก repo */}
      <Header title="Cn334 Hotel" />

      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Page title */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">AI Concierge</h1>
          <p className="text-sm text-gray-500">
            ถามข้อมูลห้องพัก การจอง หรือบริการโรงแรมได้เลย
          </p>
          <div className="inline-flex items-center gap-1.5 mt-2 bg-blue-50 border border-blue-200 rounded-full px-3 py-1">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs text-blue-600 font-medium">RAG-powered — ข้อมูลโรงแรมจริง</span>
          </div>
        </div>

        {/* ChatBox — จัดการ state และ RAG API call ภายใน */}
        <ChatBox />

        <p className="text-center text-gray-400 text-xs mt-4">
          ข้อมูลจาก Knowledge Base ของโรงแรม · หากต้องการความช่วยเหลือเพิ่มเติมติดต่อ Front Desk
        </p>
      </main>
    </div>
  );
}
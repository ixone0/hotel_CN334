'use client';

import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'model';  
  content: string;
  timestamp: string;
}

const QUICK_QUESTIONS = [
  'สอบถามประเภทห้องพักและราคา',
  'นโยบายเวลา Check-in / Check-out',
  'สิ่งอำนวยความสะดวกในโรงแรม',
  'ช่องทางการชำระเงินที่รองรับ',
];

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'model',
      content: 'สวัสดีครับ ผม AI Concierge ประจำโรงแรม ยินดีต้อนรับครับ ไม่ทราบว่ามีข้อมูลส่วนใดที่ต้องการให้ผมช่วยดูแล หรือแนะนำเพิ่มเติมไหมครับ?',
      timestamp: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const genId = () => Date.now().toString() + Math.random().toString(36).slice(2);

  const handleSend = async (text?: string) => {
    const messageText = (text ?? input).trim();
    if (!messageText || isLoading) return;

    setInput('');
    setError(null);

    const userMsg: Message = {
      id: genId(),
      role: 'user',
      content: messageText,
      timestamp: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) throw new Error('API error');

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          id: genId(),
          role: 'model', 
          content: data.message,
          timestamp: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      console.error('Chat error:', err);
      setError('ไม่สามารถเชื่อมต่อระบบได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง');
      setMessages(messages);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-md border border-amber-100 overflow-hidden">
      {/* Header */}
      <div className="bg-slate-900 text-white px-4 py-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-amber-600 flex items-center justify-center font-bold text-white text-sm">
          AI
        </div>
        <div>
          <p className="font-semibold text-sm">Cn334 Hotel — AI Concierge</p>
          <p className="text-xs text-gray-400">RAG-Powered — ข้อมูลอัปเดตจากระบบโรงแรมโดยตรง</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-gray-400">Online</span>
        </div>
      </div>

      {messages.length === 1 && (
        <div className="px-4 pt-3 pb-1 flex flex-wrap gap-2">
          {QUICK_QUESTIONS.map((q) => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              className="text-xs border border-amber-200 rounded-full px-3 py-1.5 text-slate-700 hover:bg-stone-100 hover:border-amber-300 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3 bg-stone-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'model' && (
              <div className="w-7 h-7 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-bold mr-2 flex-shrink-0 mt-auto mb-4">
                AI
              </div>
            )}
            <div className="max-w-[75%]">
              <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm
                ${msg.role === 'user'
                  ? 'bg-slate-900 text-white rounded-br-sm'
                  : 'bg-white text-slate-900 border border-amber-100 rounded-bl-sm'
                }`}
              >
                {msg.content.split('\n').map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
              </div>
              <p className={`text-[10px] text-slate-500 mt-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start items-end gap-2">
            <div className="w-7 h-7 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              AI
            </div>
            <div className="bg-white border border-amber-100 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm flex gap-1 items-center">
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-3 py-2 rounded-lg text-center">
            {error}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 bg-white border-t border-amber-100 flex gap-2 items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
          placeholder="สอบถามข้อมูลการเข้าพัก หรือบริการของโรงแรม..."
          disabled={isLoading}
          className="flex-1 border border-amber-200 rounded-full px-4 py-2 text-sm text-slate-800 placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors disabled:opacity-50 bg-stone-50"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || isLoading}
          className="bg-slate-900 text-white rounded-full w-9 h-9 flex items-center justify-center hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-bold text-lg"
        >
          ↑
        </button>
      </div>
    </div>
  );
}
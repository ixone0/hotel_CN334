export interface RoomDoc {
  id: string;
  type: string;
  price: number;
  capacity: string;
  size: string;
  beds: string;
  amenities: string[];
  description: string;
}

export interface KnowledgeDoc {
  id: string;
  topic: string;
  content: string;
  keywords: string[];
}

export const ROOM_DOCS: RoomDoc[] = [
  {
    id: "room-a",
    type: "Type A",
    price: 3000,
    capacity: "2 คน",
    size: "24 m²",
    beds: "1 เตียง 1 ห้อง",
    amenities: ["Air conditioning", "Bathrobe", "Body gel or soap", "Cable or satellite television", "Free bottle water", "Fridge", "Hair dryer", "LCD Television"],
    description: "ห้องพักสำหรับ 2 ท่าน ขนาด 24 ตารางเมตร 1 เตียง ราคา 3,000 บาทต่อคืน",
  },
  {
    id: "room-b",
    type: "Type B",
    price: 4500,
    capacity: "4 คน",
    size: "32 m²",
    beds: "2 เตียง 1 ห้อง",
    amenities: ["Air conditioning", "Bathrobe", "Body gel or soap", "Cable or satellite television", "Free bottle water", "Fridge", "Hair dryer", "LCD Television", "Mini bar"],
    description: "ห้องพักสำหรับ 4 ท่าน ขนาด 32 ตารางเมตร 2 เตียง ราคา 4,500 บาทต่อคืน",
  },
  {
    id: "room-c",
    type: "Type C",
    price: 5500,
    capacity: "6 คน",
    size: "45 m²",
    beds: "2 เตียง 2 ห้อง",
    amenities: ["Air conditioning", "Bathrobe", "Body gel or soap", "Cable or satellite television", "Free bottle water", "Fridge", "Hair dryer", "LCD Television", "Jacuzzi", "Desk"],
    description: "ห้องพักสำหรับ 6 ท่าน ขนาด 45 ตารางเมตร 2 เตียง 2 ห้อง ราคา 5,500 บาทต่อคืน มี Jacuzzi",
  },
  {
    id: "room-d",              
    type: "Type D",              
    price: 7500,
    capacity: "8 คน",
    size: "60 m²",
    beds: "3 เตียง 3 ห้อง",
    amenities: ["Air conditioning", "Bathrobe", "Body gel or soap", "Cable or satellite television", "Free bottle water", "Fridge", "Hair dryer", "LCD Television", "Sauna", "Gym access", "Concierge"],
    description: "ห้อง Luxury Suite สำหรับ 8 ท่าน ขนาด 60 ตารางเมตร 3 เตียง 3 ห้อง ราคา 7,500 บาทต่อคืน มี Sauna และ Gym",
  },
];

export const KNOWLEDGE_DOCS: KnowledgeDoc[] = [
  {
    id: "checkin-checkout",
    topic: "เวลา Check-in / Check-out",
    content: "เวลา Check-in คือ 14:00 น. (บ่าย 2) และ เวลา Check-out คือ 12:00 น. (เที่ยง) หากต้องการ Early Check-in หรือ Late Check-out กรุณาติดต่อ Front Desk ล่วงหน้า อาจมีค่าใช้จ่ายเพิ่มเติม",
    keywords: ["check-in", "check-out", "เวลา", "เช็คอิน", "เช็คเอาท์", "14:00", "12:00"],
  },
  {
    id: "booking-process",
    topic: "ขั้นตอนการจอง",
    content: "ขั้นตอนการจอง: 1) เลือกประเภทห้องจากหน้าแรก 2) กรอกวันที่ Check-in และ Check-out 3) ระบุจำนวนผู้เข้าพัก 4) กรอกข้อมูลติดต่อ 5) เลือกช่องทางชำระเงิน 6) กด Book เพื่อยืนยัน ระบบจะแสดง QR Code",
    keywords: ["จอง", "booking", "ขั้นตอน", "วิธีจอง", "how to book"],
  },
  {
    id: "payment-methods",
    topic: "ช่องทางการชำระเงิน",
    content: "รับชำระเงินผ่าน 4 ช่องทาง: 1) Credit / Debit Card 2) Thai QR พร้อมเพย์ 3) Alipay 4) WeChat Pay",
    keywords: ["ชำระเงิน", "payment", "บัตรเครดิต", "QR", "Alipay", "WeChat", "โอนเงิน"],
  },
  {
    id: "amenities-hotel",
    topic: "สิ่งอำนวยความสะดวกของโรงแรม",
    content: "โรงแรมมีสิ่งอำนวยความสะดวก ได้แก่: สระว่ายน้ำ, ร้านอาหาร, ล็อบบี้, ที่จอดรถ, Wi-Fi ฟรีทุกพื้นที่, บริการซักรีด, ห้องออกกำลังกาย (Type D), Sauna (Type D)",
    keywords: ["สิ่งอำนวยความสะดวก", "amenities", "สระว่ายน้ำ", "pool", "wifi", "gym", "sauna", "parking", "ที่จอดรถ"],
  },
  {
    id: "cancellation",
    topic: "นโยบายการยกเลิก",
    content: "ยกเลิกฟรีก่อน 24 ชั่วโมงก่อนวัน Check-in ยกเลิกน้อยกว่า 24 ชั่วโมงถูกเก็บค่าธรรมเนียม 1 คืน No-show เก็บเต็มจำนวน",
    keywords: ["ยกเลิก", "cancel", "คืนเงิน", "refund", "นโยบาย", "policy"],
  },
  {
    id: "children-policy",
    topic: "นโยบายเด็ก",
    content: "เด็กอายุ 2-12 ปี นับเป็นผู้เข้าพัก เด็กอายุต่ำกว่า 2 ปี พักฟรี กรุณาแจ้งล่วงหน้าหากต้องการเตียงเด็ก",
    keywords: ["เด็ก", "children", "child", "อายุ", "baby", "ทารก"],
  },
  {
    id: "price-summary",
    topic: "ราคาห้องพักทุกประเภท",
    content: "ราคาห้องพักต่อคืน: Type A (2 คน, 24m²) = 3,000 บาท | Type B (4 คน, 32m²) = 4,500 บาท | Type C (6 คน, 45m²) = 5,500 บาท | Type D/Luxury Suite (8 คน, 60m²) = 7,500 บาท",
    keywords: ["ราคา", "price", "ค่าห้อง", "cost", "บาท", "3000", "4500", "5500", "7500", "ประเภท", "กี่ประเภท", "type a", "type b", "type c", "type d"],
  },
];

export function retrieveContext(query: string): string {
  const q = query.toLowerCase();

  const isAskingAllRooms =
    q.includes("กี่ประเภท") ||
    q.includes("มีกี่") ||
    q.includes("ทุกประเภท") ||
    q.includes("ทุกห้อง") ||
    q.includes("อะไรบ้าง") ||
    q.includes("all room") ||
    (q.includes("ห้อง") && q.includes("ประเภท"));

  if (isAskingAllRooms) {
    const allRooms = ROOM_DOCS.map(
      (r) => `- ${r.type}: ${r.price.toLocaleString()} บาท/คืน | ${r.capacity} | ${r.size} | ${r.beds}`
    ).join("\n");
    return `[ห้องพักทั้งหมดมี 4 ประเภท]\n${allRooms}`;
  }

  const scored: { content: string; score: number }[] = [];

  for (const doc of KNOWLEDGE_DOCS) {
    let score = 0;
    for (const keyword of doc.keywords) {
      if (q.includes(keyword.toLowerCase())) score += 2;
    }
    if (q.includes(doc.topic.toLowerCase())) score += 3;
    if (score > 0) {
      scored.push({ content: `[${doc.topic}]\n${doc.content}`, score });
    }
  }

  for (const room of ROOM_DOCS) {
    let score = 0;
    const roomKeywords = [
      room.type.toLowerCase(),
      `type ${room.id.split("-")[1]}`,
      room.price.toString(),
      room.capacity,
    ];
    for (const kw of roomKeywords) {
      if (q.includes(kw)) score += 2;
    }
    if (q.includes("ห้อง") || q.includes("room") || q.includes("type")) score += 1;

    if (score > 0) {
      scored.push({
        content: `[ห้อง ${room.type}]\nราคา: ${room.price.toLocaleString()} บาท/คืน | ขนาด: ${room.size} | รองรับ: ${room.capacity}\nที่นอน: ${room.beds}\nสิ่งอำนวยความสะดวก: ${room.amenities.join(", ")}`,
        score,
      });
    }
  }

  if (scored.length === 0) {
    return KNOWLEDGE_DOCS.map((d) => `[${d.topic}]: ${d.content}`).join("\n\n");
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 5).map((s) => s.content).join("\n\n");
}
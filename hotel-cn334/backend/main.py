from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine, SessionLocal
from models import Room, Booking, ChatMessage
from routers.rooms import router as rooms_router
from routers.bookings import router as bookings_router
from routers.chat import router as chat_router

app = FastAPI(title="Cn334 Hotel API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

app.include_router(rooms_router, prefix="/api")
app.include_router(bookings_router, prefix="/api")
app.include_router(chat_router, prefix="/api")


@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        if db.query(Room).first() is None:
            rooms = [
                Room(
                    id="room-a",
                    room_type="Type A - Superior Room",
                    price=3000,
                    bed_info="1 Bed \u2022 2 Guests \u2022 24 m\u00b2",
                    capacity=2,
                    size_sqm=24,
                    amenities='["Free Wi-Fi","Air Conditioning","Mini Bar","Room Service"]',
                ),
                Room(
                    id="room-b",
                    room_type="Type B - Deluxe Room",
                    price=4500,
                    bed_info="2 Beds \u2022 4 Guests \u2022 32 m\u00b2",
                    capacity=4,
                    size_sqm=32,
                    amenities='["Free Wi-Fi","Air Conditioning","Mini Bar","Room Service","Bathtub","City View"]',
                ),
                Room(
                    id="room-c",
                    room_type="Type C - Executive Suite",
                    price=5500,
                    bed_info="2 Beds \u2022 6 Guests \u2022 45 m\u00b2",
                    capacity=6,
                    size_sqm=45,
                    amenities='["Free Wi-Fi","Air Conditioning","Mini Bar","Room Service","Bathtub","City View","Living Room","Kitchen"]',
                ),
                Room(
                    id="room-d",
                    room_type="Type D - Presidential Suite",
                    price=7500,
                    bed_info="3 Beds \u2022 8 Guests \u2022 60 m\u00b2",
                    capacity=8,
                    size_sqm=60,
                    amenities='["Free Wi-Fi","Air Conditioning","Mini Bar","Room Service","Bathtub","City View","Living Room","Kitchen","Private Pool","Butler Service"]',
                ),
            ]
            db.add_all(rooms)
            db.commit()
    finally:
        db.close()

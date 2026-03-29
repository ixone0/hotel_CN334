from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, String

from database import Base


class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    booking_id = Column(String, unique=True, index=True, nullable=False)
    room_type = Column(String, nullable=False)
    price = Column(Integer, nullable=False)
    check_in = Column(String, nullable=False)
    check_out = Column(String, nullable=False)
    adults = Column(Integer, nullable=False)
    children = Column(Integer, nullable=False)
    contact_title = Column(String, nullable=False)
    contact_full_name = Column(String, nullable=False)
    contact_phone = Column(String, nullable=False)
    contact_email = Column(String, nullable=False)
    payment_method = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

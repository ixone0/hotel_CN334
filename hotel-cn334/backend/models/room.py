from sqlalchemy import Column, Integer, String

from database import Base


class Room(Base):
    __tablename__ = "rooms"

    id = Column(String, primary_key=True)
    room_type = Column(String, nullable=False)
    price = Column(Integer, nullable=False)
    bed_info = Column(String, nullable=False)
    capacity = Column(Integer, nullable=False)
    size_sqm = Column(Integer, nullable=False)
    amenities = Column(String, nullable=False)  # JSON-serialized list

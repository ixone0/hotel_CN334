import json

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models.room import Room
from schemas.room import RoomResponse

router = APIRouter(prefix="/rooms", tags=["rooms"])


@router.get("/", response_model=list[RoomResponse])
async def list_rooms(db: Session = Depends(get_db)):
    rooms = db.query(Room).all()
    return [
        RoomResponse(
            id=room.id,
            room_type=room.room_type,
            price=room.price,
            bed_info=room.bed_info,
            capacity=room.capacity,
            size_sqm=room.size_sqm,
            amenities=json.loads(room.amenities),
        )
        for room in rooms
    ]


@router.get("/{room_id}", response_model=RoomResponse)
async def get_room(room_id: str, db: Session = Depends(get_db)):
    room = db.query(Room).filter(Room.id == room_id).first()
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    return RoomResponse(
        id=room.id,
        room_type=room.room_type,
        price=room.price,
        bed_info=room.bed_info,
        capacity=room.capacity,
        size_sqm=room.size_sqm,
        amenities=json.loads(room.amenities),
    )

import random

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models.booking import Booking
from schemas.booking import (
    BookingCreate,
    BookingResponse,
    ContactInfo,
    DateRange,
    GuestCount,
)

router = APIRouter(prefix="/bookings", tags=["bookings"])


def _booking_to_response(db_booking: Booking) -> BookingResponse:
    """Reconstruct nested BookingCreate from flat ORM fields."""
    data = BookingCreate(
        room_type=db_booking.room_type,
        price=db_booking.price,
        dates=DateRange(
            check_in=db_booking.check_in,
            check_out=db_booking.check_out,
        ),
        guests=GuestCount(
            adults=db_booking.adults,
            children=db_booking.children,
        ),
        contact=ContactInfo(
            title=db_booking.contact_title,
            full_name=db_booking.contact_full_name,
            phone_number=db_booking.contact_phone,
            email=db_booking.contact_email,
        ),
        payment_method=db_booking.payment_method,
    )
    return BookingResponse(
        booking_id=db_booking.booking_id,
        status="success",
        message="Booking created successfully",
        data=data,
    )


@router.post("/", response_model=BookingResponse)
async def create_booking(booking: BookingCreate, db: Session = Depends(get_db)):
    booking_id = f"#{random.randint(100000, 999999)}"
    db_booking = Booking(
        booking_id=booking_id,
        room_type=booking.room_type,
        price=booking.price,
        check_in=booking.dates.check_in,
        check_out=booking.dates.check_out,
        adults=booking.guests.adults,
        children=booking.guests.children,
        contact_title=booking.contact.title,
        contact_full_name=booking.contact.full_name,
        contact_phone=booking.contact.phone_number,
        contact_email=booking.contact.email,
        payment_method=booking.payment_method,
    )
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return BookingResponse(
        booking_id=db_booking.booking_id,
        status="success",
        message="Booking created successfully",
        data=booking,
    )


@router.get("/", response_model=list[BookingResponse])
async def list_bookings(db: Session = Depends(get_db)):
    bookings = db.query(Booking).all()
    return [_booking_to_response(b) for b in bookings]


@router.get("/{booking_id}", response_model=BookingResponse)
async def get_booking(booking_id: str, db: Session = Depends(get_db)):
    db_booking = db.query(Booking).filter(Booking.booking_id == booking_id).first()
    if not db_booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return _booking_to_response(db_booking)


@router.put("/{booking_id}", response_model=BookingResponse)
async def update_booking(
    booking_id: str, booking: BookingCreate, db: Session = Depends(get_db)
):
    db_booking = db.query(Booking).filter(Booking.booking_id == booking_id).first()
    if not db_booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    db_booking.room_type = booking.room_type
    db_booking.price = booking.price
    db_booking.check_in = booking.dates.check_in
    db_booking.check_out = booking.dates.check_out
    db_booking.adults = booking.guests.adults
    db_booking.children = booking.guests.children
    db_booking.contact_title = booking.contact.title
    db_booking.contact_full_name = booking.contact.full_name
    db_booking.contact_phone = booking.contact.phone_number
    db_booking.contact_email = booking.contact.email
    db_booking.payment_method = booking.payment_method
    db.commit()
    db.refresh(db_booking)
    return _booking_to_response(db_booking)


@router.delete("/{booking_id}")
async def delete_booking(booking_id: str, db: Session = Depends(get_db)):
    db_booking = db.query(Booking).filter(Booking.booking_id == booking_id).first()
    if not db_booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    db.delete(db_booking)
    db.commit()
    return {"message": "Booking deleted successfully"}

import re
from typing import Literal, Optional

from pydantic import BaseModel, ConfigDict, field_validator
from pydantic.alias_generators import to_camel


class GuestCount(BaseModel):
    model_config = ConfigDict(populate_by_name=True, alias_generator=to_camel)

    adults: int
    children: int


class DateRange(BaseModel):
    model_config = ConfigDict(populate_by_name=True, alias_generator=to_camel)

    check_in: str
    check_out: str


class ContactInfo(BaseModel):
    model_config = ConfigDict(populate_by_name=True, alias_generator=to_camel)

    title: str
    full_name: str
    phone_number: str
    email: str

    @field_validator("email")
    @classmethod
    def validate_email(cls, v: str) -> str:
        if not re.match(r"\S+@\S+\.\S+", v):
            raise ValueError("Invalid email format")
        return v


class BookingCreate(BaseModel):
    model_config = ConfigDict(populate_by_name=True, alias_generator=to_camel)

    room_type: str
    price: int
    dates: DateRange
    guests: GuestCount
    contact: ContactInfo
    payment_method: Literal["credit_card", "thai_qr", "alipay", "wechat"]


class BookingResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True, alias_generator=to_camel)

    booking_id: str
    status: str
    message: str
    data: Optional[BookingCreate] = None

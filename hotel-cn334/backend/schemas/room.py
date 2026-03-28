from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


class RoomResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True, alias_generator=to_camel)

    id: str
    room_type: str
    price: int
    bed_info: str
    capacity: int
    size_sqm: int
    amenities: list[str]

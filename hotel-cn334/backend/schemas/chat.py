from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


class ChatMessageCreate(BaseModel):
    model_config = ConfigDict(populate_by_name=True, alias_generator=to_camel)

    session_id: str
    role: Literal["user", "model"]
    content: str


class ChatMessageResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True, alias_generator=to_camel)

    id: int
    session_id: str
    role: str
    content: str
    created_at: datetime

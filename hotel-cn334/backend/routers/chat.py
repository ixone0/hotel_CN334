from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models.chat import ChatMessage
from schemas.chat import ChatMessageCreate, ChatMessageResponse

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("/messages", response_model=ChatMessageResponse)
async def create_message(
    message: ChatMessageCreate, db: Session = Depends(get_db)
):
    db_message = ChatMessage(
        session_id=message.session_id,
        role=message.role,
        content=message.content,
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return ChatMessageResponse(
        id=db_message.id,
        session_id=db_message.session_id,
        role=db_message.role,
        content=db_message.content,
        created_at=db_message.created_at,
    )


@router.get("/messages/{session_id}", response_model=list[ChatMessageResponse])
async def get_messages(session_id: str, db: Session = Depends(get_db)):
    messages = (
        db.query(ChatMessage)
        .filter(ChatMessage.session_id == session_id)
        .order_by(ChatMessage.created_at.asc())
        .all()
    )
    return [
        ChatMessageResponse(
            id=m.id,
            session_id=m.session_id,
            role=m.role,
            content=m.content,
            created_at=m.created_at,
        )
        for m in messages
    ]

from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.utcnow)
    reviewer_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    receiver_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    receiver = db.relationship(
        "User", foreign_keys=[receiver_id], back_populates="reviews"
    )
    reviewer = db.relationship(
        "User", foreign_keys=[reviewer_id], back_populates="reviews"
    )

    @classmethod
    def create(cls, items):
        if isinstance(items, list):
            new_items = [
                cls(
                    review=item["review"],
                    reviewer_id=item["reviewer_id"],
                    receiver_id=item["receiver_id"]
                )
                for item in items
            ]
            return new_items
        if isinstance(items, dict):
            new_item = cls(
                review=items["review"],
                reviewer_id=items["reviewer_id"],
                receiver_id=items["receiver_id"]
            )
            return new_item

    def to_safe_dict(self):
        return {
            "id": self.id,
            "review": self.review,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "reviewer_id": self.reviewer_id,
            "receiver_id": self.receiver_id
        }

    def __repr__(self):
        return f"<Review {self.id} from User {self.reviewer_id} to User {self.receiver_id}>"

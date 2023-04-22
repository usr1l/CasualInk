from app.models import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, date


class ArtListing(db.Model):
    __tablename__ = "art_listings"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.String(50), nullable=False)
    list_date = db.Column(db.Date, nullable=False, default=date.today)
    amount_available = db.Column(db.Integer, nullable=False)
    artwork_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("artworks.id")), nullable=False
    )
    owner_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )

    artwork = db.relationship("Artwork", back_populates="for_sale_listing")

    owner = db.relationship("User", back_populates="art_listings")

    def check_owner(self, user_id):
        return self.owner_id == user_id

    @classmethod
    def create(cls, items):
        if isinstance(items, list):
            new_items = [
                cls(
                    price=item["price"],
                    amount_available=item["amount_available"],
                    artwork_id=item["artwork_id"],
                    owner_id=item["owner_id"],
                )
                for item in items
            ]
            return new_items
        if isinstance(items, dict):
            new_item = cls(
                price=items["price"],
                amount_available=items["amount_available"],
                artwork_id=items["artwork_id"],
                owner_id=items["owner_id"],
            )
            return new_item

    def to_safe_dict(self):
        return {
            "id": self.id,
            "price": self.price,
            "amount_available": self.amount_available,
            "artwork_id": self.artwork_id,
            "owner_id": self.owner_id,
        }

    def to_dict(self):
        return {
            "id": self.id,
            "price": self.price,
            "amount_available": self.amount_available,
            "artwork_id": self.artwork_id,
            "owner_id": self.owner_id,
        }

    def __repr__(self):
        return f"<Listing {self.id} for Artwork {self.artwork_id} from Owner {self.owner_id}>"

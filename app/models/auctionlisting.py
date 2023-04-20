from app.models import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class AuctionListing(db.Model):
    __tablename__ = "auction_listings"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    start_bid = db.Column(db.Numeric(11, 2), nullable=False)
    list_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    active = db.Column(db.Boolean, nullable=False, default=True)
    current_bid = db.Column(db.Numeric(11, 2), nullable=False, default=0)
    last_update = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    auction_deadline = db.Column(db.DateTime, nullable=False)
    artwork_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("artworks.id")), nullable=False
    )
    owner_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )

    artwork = db.relationship("Artwork", back_populates="for_auction_listing")
    owner = db.relationship("User", back_populates="auction_listings")

    def check_owner(self, user_id):
        return self.owner_id == user_id

    @classmethod
    def create(cls, items):
        if isinstance(items, list):
            new_items = [
                cls(
                  start_bid=item["start_bid"],
                  list_date=item["list_date"],
                  active=item["active"],
                  auction_deadline=item["auction_deadline"],
                  artwork_id=item["artwork_id"],
                  owner_id=item["owner_id"]
                )
                for item in items
            ]
            return new_items
        if isinstance(items, dict):
            new_item = cls(
                  start_bid=items["start_bid"],
                  list_date=items["list_date"],
                  active=items["active"],
                  auction_deadline=items["auction_deadline"],
                  artwork_id=items["artwork_id"],
                  owner_id=items["owner_id"]
            )
            return new_item

    def to_safe_dict(self):
        return {
            "id": self.id,
            "start_bid": self.start_bid,
            "list_date": self.list_date,
            "active": self.active,
            "current_bid": self.current_bid,
            "last_update": self.last_update,
            "auction_deadline": self.auction_deadline,
            "artwork_id": self.artwork_id,
            "owner_id": self.owner_id,
        }

    def __repr__(self):
        return f"<Auction Listing {self.id} for Artwork {self.artwork_id} from Owner {self.owner_id}>"

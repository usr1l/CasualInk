import enum
from app.models import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Enum


class ArtWorkTypesEnum(enum.Enum):
    OIL = "Oil"
    ACRYLIC = "Acrylic"
    MULTIMEDIA = "Multimedia"
    BALLPOINT_PEN = "Ballpoint Pen"
    CHARCOAL = "Charcoal"
    WATERCOLOR = "Watercolor"
    PENCIL = "Pencil"
    COLOR_PENCIL = "Color Pencil"

    def __str__(self):
        return self.name


class Artwork(db.Model):
    __tablename__ = "artworks"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False, default='Untitled')
    artist_name = db.Column(db.String(50), nullable=False, default='Uknown')
    year = db.Column(db.Date, nullable=False)
    height = db.Column(db.Numeric(6, 2), nullable=False)
    width = db.Column(db.Numeric(6, 2), nullable=False)
    available = db.Column(db.Boolean, nullable=False, default=False)
    type = db.Column(db.Enum(ArtWorkTypesEnum), nullable=False)
    owner_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )

    owner = db.relationship(
        "User", back_populates="artworks", single_parent=True)

    for_sale_listing = db.relationship(
        "ArtListing",
        back_populates="artwork",
        single_parent=True,
        cascade="all, delete-orphan"
    )

    for_auction_listing = db.relationship(
        "AuctionListing", back_populates="artwork", single_parent=True, cascade="all, delete-orphan"
    )

    def check_owner(self, user_id):
        return self.owner_id == user_id

    @classmethod
    def create(cls, items):
        if isinstance(items, list):
            new_items = [
                cls(
                    title=item["title"],
                    artist_name=item["artist_name"],
                    year=item["year"],
                    height=item["height"],
                    width=item["width"],
                    available=item["available"],
                    type=item["type"],
                    owner_id=item["owner_id"],
                )
                for item in items
            ]
            return new_items
        if isinstance(items, dict):
            new_item = cls(
                title=items["title"],
                artist_name=items["artist_name"],
                year=items["year"],
                height=items["height"],
                width=items["width"],
                available=items["available"],
                type=items["type"],
                owner_id=items["owner_id"],
            )
            return new_item

    def to_safe_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "artist_name": self.artist_name,
            "year": self.year.year,
            "height": self.height,
            "width": self.width,
            "type": self.type.value,
            "available": self.available,
            "owner_id": self.owner_id,
        }

    def __repr__(self):
        return f"<Artwork {self.id}: {self.name}, Owner: {self.owner_id}>"

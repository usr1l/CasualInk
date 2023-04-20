from app.models import db, environment, SCHEMA, Review
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime, date


class User(db.Model, UserMixin):
    __tablename__ = "users"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    firstname = db.Column(db.String(50), nullable=False)
    lastname = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    profile_pic = db.Column(db.String(255))
    bio = db.Column(db.Text, nullable=False)
    join_date = db.Column(db.Date, nullable=False, default=date.today)
    hashed_password = db.Column(db.String(255), nullable=False)

    artworks = db.relationship(
        "Artwork", back_populates="owner", cascade="all, delete-orphan"
    )
    art_listings = db.relationship(
        "ArtListing", back_populates="owner", cascade="all, delete-orphan"
    )
    auction_listings = db.relationship(
        "AuctionListing", back_populates="owner", cascade="all, delete-orphan"
    )
    shopping_cart = db.relationship(
        "ShoppingCart", back_populates="owner", cascade="all, delete-orphan")

    if environment == "production":
        reviews = db.relationship(
            "Review",
            secondary=f"{SCHEMA}.reviews",
            primaryjoin=Review.reviewer_id == id,
            secondaryjoin=Review.receiver_id == id,
            overlaps="reveiver",
        )
    else:
        reviews = db.relationship(
            "Review",
            secondary="reviews",
            primaryjoin=Review.reviewer_id == id,
            secondaryjoin=Review.receiver_id == id,
            overlaps="reveiver",
        )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_safe_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "bio": self.bio,
            "join_date": self.join_date,
            "profile_pic": self.profile_pic
        }

    def __repr__(self):
        return f"<User {self.id}, {self.firstname} {self.lastname}>"

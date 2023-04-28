from app.models import db, ArtListing, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date


def seed_artlistings():

    art_listing_seed_data = [
        # {
        #     "price": "10000000.00",
        #     "list_date": date(2023, 1, 12),
        #     "amount_available": 1,
        #     "artwork_id": 1,
        #     "owner_id": 1
        # },
        {
            "price": "8000000.00",
            "list_date": date(2023, 4, 5),
            "amount_available": 1,
            "artwork_id": 2,
            "owner_id": 2
        },
        {
            "price": "5000000.00",
            "list_date": date(2023, 4, 10),
            "amount_available": 1,
            "artwork_id": 3,
            "owner_id": 3
        },
        {
            "price": "9000000.00",
            "list_date": date(2023, 4, 12),
            "amount_available": 1,
            "artwork_id": 4,
            "owner_id": 1
        },
        {
            "price": "7000000.00",
            "list_date": date(2023, 4, 13),
            "amount_available": 1,
            "artwork_id": 5,
            "owner_id": 2
        },
        {
            "price": "11000000.00",
            "list_date": date(2023, 4, 15),
            "amount_available": 1,
            "artwork_id": 6,
            "owner_id": 3
        },
        {
            "price": "9500000.00",
            "list_date": date(2023, 3, 12),
            "amount_available": 1,
            "artwork_id": 7,
            "owner_id": 1
        },
        {
            "price": "8500000.00",
            "list_date": date(2023, 3, 17),
            "amount_available": 1,
            "artwork_id": 8,
            "owner_id": 2
        },
        {
            "price": "10000000.00",
            "list_date": date(2023, 2, 22),
            "amount_available": 1,
            "artwork_id": 9,
            "owner_id": 3
        },
        {
            "price": "8000000.00",
            "list_date": date(2023, 1, 23),
            "amount_available": 1,
            "artwork_id": 10,
            "owner_id": 1
        },
        {
            "price": "7500000.00",
            "list_date": date(2023, 2, 23),
            "amount_available": 1,
            "artwork_id": 11,
            "owner_id": 2
        },
        {
            "price": "6000000.00",
            "list_date": date(2023, 4, 13),
            "amount_available": 1,
            "artwork_id": 12,
            "owner_id": 3
        },
        {
            "price": "7000000.00",
            "list_date": date(2023, 4, 11),
            "amount_available": 1,
            "artwork_id": 13,
            "owner_id": 1
        },
    ]

    artlisting_items = ArtListing.create(art_listing_seed_data)
    new_items = [db.session.add(artlisting) for artlisting in artlisting_items]
    db.session.commit()

    return new_items


def unseed_artlistings():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.art_listings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM art_listings"))

    db.session.commit()

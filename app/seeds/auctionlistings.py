from app.models import db, AuctionListing, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_auctionlistings():
    new_datetime = datetime(2024, 5, 1, 10, 20, 0)

    auction_seed_data = [
        {
            'start_bid': '100.00',
            'auction_deadline': new_datetime,
            'artwork_id': 14,
            'owner_id': 2
        },
        {
            'start_bid': '250.00',
            'auction_deadline': new_datetime,
            'artwork_id': 15,
            'owner_id': 3
        },
        {
            'start_bid': '200.00',
            'auction_deadline': new_datetime,
            'artwork_id': 16,
            'owner_id': 1
        },
        {
            'start_bid': '500.00',
            'auction_deadline': new_datetime,
            'artwork_id': 17,
            'owner_id': 2
        },
        {
            'start_bid': '75.00',
            'auction_deadline': new_datetime,
            'artwork_id': 18,
            'owner_id': 3
        },
        {
            'start_bid': '300.00',
            'auction_deadline': new_datetime,
            'artwork_id': 19,
            'owner_id': 1
        },
        {
            'start_bid': '550.00',
            'auction_deadline': new_datetime,
            'artwork_id': 20,
            'owner_id': 2
        },
        {
            'start_bid': '95.00',
            'auction_deadline': new_datetime,
            'artwork_id': 21,
            'owner_id': 1
        },
        # {
        #     'id': 10,
        #     'start_bid': '350.00',
        #     'list_date': '2023-04-21 14:00:00',
        #     'active': True,
        #     'current_bid': '380.00',
        #     'last_update': '2023-04-26 16:30:00',
        #     'auction_deadline': '2023-05-01 23:59:59',
        #     'artwork_id': 110,
        #     'owner_id': 510
        # },
        # {
        #     'id': 11,
        #     'start_bid': '600.00',
        #     'list_date': '2023-04-23 16:00:00',
        #     'active': True,
        #     'current_bid': '650.00',
        #     'last_update': '2023-04-26 19:00:00',
        #     'auction_deadline': '2023-05-03 23:59:59',
        #     'artwork_id': 111,
        #     'owner_id': 511
        # },
        # {
        #     'id': 12,
        #     'start_bid': '85.00',
        #     'list_date': '2023-04-19 11:00:00',
        #     'active': False,
        #     'current_bid': '85.00',
        #     'last_update': '2023-04-24 12:30:00',
        #     'auction_deadline': '2023-04-29 23:59:59',
        #     'artwork_id': 112,
        #     'owner_id': 512
        # },
        # {
        #     'start_bid': '400.00',
        #     'list_date': '2023-04-20 13:00:00',
        #     'active': True,
        #     'last_update': '2023-04-25 16:30:00',
        #     'auction_deadline': '2023-04-30 23:59:59',
        #     'artwork_id': ,
        #     'owner_id':},

    ]

    auction_items = AuctionListing.create(auction_seed_data)
    new_items = [db.session.add(item) for item in auction_items]
    db.session.commit()

    return new_items


def unseed_auctionlistings():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.auction_listings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM auction_listings"))

    db.session.commit()

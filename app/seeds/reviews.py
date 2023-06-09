from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text


def seed_review_data():
    review_data = [
        {
            "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet est placerat in egestas erat imperdiet. Feugiat sed lectus vestibulum mattis ullamcorper. Faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam. Convallis convallis tellus id interdum velit laoreet id donec ultrices. Lacus vel facilisis volutpat est velit egestas dui. Quis risus sed vulputate odio ut enim. Faucibus in ornare quam viverra orci. Urna molestie at elementum eu facilisis sed. Neque egestas congue quisque egestas diam in. Orci eu lobortis elementum nibh tellus",
            "reviewer_id": 1,
            "receiver_id": 2
        },
        {
            "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet est placerat in egestas erat imperdiet. Feugiat sed lectus vestibulum mattis ullamcorper. Faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam. Convallis convallis tellus id interdum velit laoreet id donec ultrices. Lacus vel facilisis volutpat est velit egestas dui. Quis risus sed vulputate odio ut enim. Faucibus in ornare quam viverra orci. Urna molestie at elementum eu facilisis sed. Neque egestas congue quisque egestas diam in. Orci eu lobortis elementum nibh tellus",
            "reviewer_id": 1,
            "receiver_id": 3
        },
        {
            "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet est placerat in egestas erat imperdiet. Feugiat sed lectus vestibulum mattis ullamcorper. Faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam. Convallis convallis tellus id interdum velit laoreet id donec ultrices. Lacus vel facilisis volutpat est velit egestas dui. Quis risus sed vulputate odio ut enim. Faucibus in ornare quam viverra orci. Urna molestie at elementum eu facilisis sed. Neque egestas congue quisque egestas diam in. Orci eu lobortis elementum nibh tellus",
            "reviewer_id": 1,
            "receiver_id": 4
        },
        {
            "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet est placerat in egestas erat imperdiet. Feugiat sed lectus vestibulum mattis ullamcorper. Faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam. Convallis convallis tellus id interdum velit laoreet id donec ultrices. Lacus vel facilisis volutpat est velit egestas dui. Quis risus sed vulputate odio ut enim. Faucibus in ornare quam viverra orci. Urna molestie at elementum eu facilisis sed. Neque egestas congue quisque egestas diam in. Orci eu lobortis elementum nibh tellus",
            "reviewer_id": 2,
            "receiver_id": 1
        },
        {
            "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet est placerat in egestas erat imperdiet. Feugiat sed lectus vestibulum mattis ullamcorper. Faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam. Convallis convallis tellus id interdum velit laoreet id donec ultrices. Lacus vel facilisis volutpat est velit egestas dui. Quis risus sed vulputate odio ut enim. Faucibus in ornare quam viverra orci. Urna molestie at elementum eu facilisis sed. Neque egestas congue quisque egestas diam in. Orci eu lobortis elementum nibh tellus",
            "reviewer_id": 3,
            "receiver_id": 1
        },
        {
            "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet est placerat in egestas erat imperdiet. Feugiat sed lectus vestibulum mattis ullamcorper. Faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam. Convallis convallis tellus id interdum velit laoreet id donec ultrices. Lacus vel facilisis volutpat est velit egestas dui. Quis risus sed vulputate odio ut enim. Faucibus in ornare quam viverra orci. Urna molestie at elementum eu facilisis sed. Neque egestas congue quisque egestas diam in. Orci eu lobortis elementum nibh tellus",
            "reviewer_id": 4,
            "receiver_id": 1
        }
    ]

    reviews = Review.create(review_data)
    new_reviews = [db.session.add(review) for review in reviews]
    db.session.commit()
    return reviews


def unseed_review_data():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()

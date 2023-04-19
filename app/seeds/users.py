from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', firstname="Demo", lastname="User", bio="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet est placerat in egestas erat imperdiet. Feugiat sed lectus vestibulum mattis ullamcorper. Faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam. Convallis convallis tellus id interdum velit laoreet id donec ultrices. Lacus vel facilisis volutpat est velit egestas dui. Quis risus sed vulputate odio ut enim. Faucibus in ornare quam viverra orci. Urna molestie at elementum eu facilisis sed. Neque egestas congue quisque egestas diam in. Orci eu lobortis elementum nibh tellus.", email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', firstname="Marnie", lastname="Marns", bio="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet est placerat in egestas erat imperdiet. Feugiat sed lectus vestibulum mattis ullamcorper. Faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam. Convallis convallis tellus id interdum velit laoreet id donec ultrices. Lacus vel facilisis volutpat est velit egestas dui. Quis risus sed vulputate odio ut enim. Faucibus in ornare quam viverra orci. Urna molestie at elementum eu facilisis sed. Neque egestas congue quisque egestas diam in. Orci eu lobortis elementum nibh tellus.", email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', firstname="Bobbie", lastname="Bobbs", bio="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet est placerat in egestas erat imperdiet. Feugiat sed lectus vestibulum mattis ullamcorper. Faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam. Convallis convallis tellus id interdum velit laoreet id donec ultrices. Lacus vel facilisis volutpat est velit egestas dui. Quis risus sed vulputate odio ut enim. Faucibus in ornare quam viverra orci. Urna molestie at elementum eu facilisis sed. Neque egestas congue quisque egestas diam in. Orci eu lobortis elementum nibh tellus.", email='bobbie@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()

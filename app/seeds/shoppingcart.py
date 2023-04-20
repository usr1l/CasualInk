from app.models import db, ShoppingCart, environment, SCHEMA
from sqlalchemy.sql import text

def seed_shopping_carts():
    shopping_cart_seed_data = [
      ShoppingCart(owner_id=1),
      ShoppingCart(owner_id=2),
      ShoppingCart(owner_id=3)
    ]

    shopping_carts = [db.session.add(shopping_cart) for shopping_cart in shopping_cart_seed_data]
    db.session.commit()
    return shopping_carts

def unseed_shopping_carts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.shopping_carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM shopping_carts"))

    db.session.commit()

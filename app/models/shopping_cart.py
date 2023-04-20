from app.models import db, environment, SCHEMA, add_prefix_for_prod
import json

class ShoppingCart(db.Model):
    __tablename__ = "shopping_carts"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    _items = db.Column(db.String(500), nullable=False, default="{}")
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    owner = db.relationship("User", back_populates="shopping_cart")

    @property
    def items(self):
        return json.loads(self._items)

    @items.setter
    def items(self, listing_ids, item_amount):
        cart = json.loads(self._items)
        if isinstance(listing_ids, list):
            for listing_id in listing_ids:
                if listing_id in cart:
                    cart[listing_id] = cart[listing_id] + item_amount
                else:
                    cart[listing_id] = item_amount
        else:
            if listing_ids in cart:
                cart[listing_ids] = cart[listing_ids] + item_amount
            else: cart[listing_ids] = item_amount
        self._items = json.dumps(cart)

    def check_owner(self, user_id):
        return self.owner_id == user_id

    def delete_cart(self):
        self._items = json.dumps({})

    def to_safe_dict(self):
        return {
            "id": self.id,
            "owner_id": self.owner_id,
            "items": json.loads(self._items)
        }

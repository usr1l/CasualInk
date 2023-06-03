from app.models import db, environment, SCHEMA, add_prefix_for_prod
from app.models.artlisting import ArtListing
import json


class ShoppingCart(db.Model):
    __tablename__ = "shopping_carts"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    _items = db.Column(db.String(500), nullable=False, default="{}")
    owner_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)

    owner = db.relationship("User", back_populates="shopping_cart")

    @property
    def items(self):
        return json.loads(self._items)

    @items.setter
    def items(self, data):
        cart = json.loads(self._items)
        if f"{data['listing']}" in cart:
            cart[f"{data['listing']}"] = cart[f"{data['listing']}"] + \
                data["amount"]
            if cart[f"{data['listing']}"] == 0:
                del cart[f"{data['listing']}"]
        else:
            cart[f"{data['listing']}"] = data["amount"]
        self._items = json.dumps(cart)

    def check_owner(self, user_id):
        return self.owner_id == user_id

    def delete_cart(self):
        self._items = json.dumps({})

    def checkout_item(self, artwork_id):
        artlisting = ArtListing.query.filter_by(artwork_id)
        if artlisting.amount_available <= 0:
            return {"errors": ["Item unavailable"]}
        artlisting.amount_available -= 1
        db.session.commit()
        return {"success": "Checkout successful."}

    def checkout_cart(self):
        cart = json.loads(self._items)
        for key in cart:
            artlisting = ArtListing.query.filter(ArtListing.artwork_id == key)
            if artlisting.amount_available <= 0:
                return {'errors': ['Item unavailable']}
            artlisting.amount_available -= cart[key]

        self.delete_cart()
        db.session.commit()
        return {"success": "Checkout successful."}

    def to_safe_dict(self):
        return {
            "id": self.id,
            "owner_id": self.owner_id,
            "items": self.items
        }

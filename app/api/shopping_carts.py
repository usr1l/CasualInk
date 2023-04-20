from flask import Blueprint, request
from flask_login import login_required, current_user
import json
from app.models import ShoppingCart, db

shoppingcart_routes = Blueprint("shopping_carts", __name__)


@shoppingcart_routes.route("/curr", methods=['GET', 'DELETE', 'POST'])
@login_required
def get_shopping_cart():
    owner_id = current_user.id
    shopping_cart = ShoppingCart.query.filter(
        ShoppingCart.owner_id == owner_id).first()
    if not shopping_cart:
        shopping_cart = ShoppingCart(owner_id=owner_id)
        db.session.add(shopping_cart)
        db.commit()

    if request.method == 'DELETE':
        shopping_cart.delete_cart()
        return {"success": "Shopping car deleted."}, 202

    if request.method == 'PUT':
        data = json.loads(request.data)
        listing_ids = data.keys()
        item_amount = data.values()
        shopping_cart.items(listing_ids, item_amount)
        return shopping_cart.to_safe_dict(), 201

    return shopping_cart.to_safe_dict(), 200

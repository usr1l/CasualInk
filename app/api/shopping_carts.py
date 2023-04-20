from flask import Blueprint, request
from flask_login import login_required, current_user
import json
from app.models import ShoppingCart, db

shoppingcart_routes = Blueprint("shopping_carts", __name__)

@shoppingcart_routes.route("/curr", methods=['GET', 'DELETE', 'PUT', 'POST'])
@login_required
def get_shopping_cart():
    owner_id = current_user.id
    shopping_cart = ShoppingCart.query.filter(ShoppingCart.owner_id == owner_id).first()

    if request.method == 'DELETE':
        db.session.delete(shopping_cart)
        db.session.commit()
        return {"success": "Shopping car deleted."}, 202

    if request.method == 'POST':
        pass

    if request.method == 'PUT':
        pass

    return shopping_cart.to_safe_dict()

import json
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import ShoppingCart, db

shoppingcart_routes = Blueprint("shopping_carts", __name__)


@shoppingcart_routes.route("/curr", methods=['GET', 'DELETE', 'PUT'])
@login_required
def get_shopping_cart():
    owner_id = current_user.id
    shopping_cart = ShoppingCart.query.filter(
        ShoppingCart.owner_id == owner_id).one_or_none()
    if not shopping_cart:
        shopping_cart = ShoppingCart(owner_id=owner_id)
        db.session.add(shopping_cart)
        db.session.commit()

    if request.method == 'DELETE':
        shopping_cart.delete_cart()
        db.session.commit()
        return {"success": "Shopping car deleted."}, 202

    if request.method == 'PUT':
        data = json.loads(request.data)
        shopping_cart.items = data
        db.session.commit()
        return shopping_cart.to_safe_dict(), 201

    return shopping_cart.to_safe_dict(), 200


@shoppingcart_routes.route("/<int:shoppingcart_id>")
@login_required
def checkout_cart(shoppingcart_id):
    shopping_cart = ShoppingCart.query.filter(
        ShoppingCart.id == shoppingcart_id).one_or_none()
    return shopping_cart.checkout(), 200


@shoppingcart_routes.route("/checkout/<int:artlisting_id>")
@login_required
def checkout_item(artlisting_id):

    owner_id = current_user.id
    shopping_cart = ShoppingCart.query.filter(
        ShoppingCart.owner_id == owner_id).one_or_none()

    res = shopping_cart.checkout_item(artlisting_id)

    return res, 201


@shoppingcart_routes.route("/remove/<int:artwork_id>", methods=['DELETE'])
@login_required
def remove_item(artwork_id):
    owner_id = current_user.id
    shopping_cart = ShoppingCart.query.filter(
        ShoppingCart.owner_id == owner_id).one_or_none()
    if request.method == 'DELETE':
        res = shopping_cart.remove_item(artwork_id)
        return res, 201

from flask import Blueprint, request
from flask_login import login_required, current_user
import json
from app.models import ArtListing, db
from app.forms import ArtlistingForm
from app.api import validation_errors_to_error_messages

artlisting_routes = Blueprint("artlistings", __name__)


@artlisting_routes.route("/")
def get_all_artlistings():
    all_listings = ArtListing.query.all()
    return [listing.to_safe_dict() for listing in all_listings], 200


@artlisting_routes.route("/<int:artlisting_id>")
@login_required
def get_a_single_listing(artlisting_id):
    single_listing = ArtListing.query.get(artlisting_id)
    return single_listing.to_safe_dict(), 200


@artlisting_routes.route("/new", methods=["POST"])
@login_required
def create_a_new_listing():
    form = ArtlistingForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        new_listing = ArtListing.create({
            "price": f"{form.data['price']}",
            "amount_available": form.data["amount_available"],
            "artwork_id": form.data["artwork_id"],
            "owner_id": current_user.id
        })

        db.session.add(new_listing)
        db.session.commit()
        return new_listing.to_safe_dict(), 201
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@artlisting_routes.route("/<int:artlisting_id>/edit", methods=["PUT"])
@login_required
def edit_art_listing(artlisting_id):
    form = ArtlistingForm()

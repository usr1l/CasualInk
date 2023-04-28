from flask import Blueprint, request
from flask_login import login_required, current_user
import json
from app.models import AuctionListing, db
from app.forms import AuctionListingForm
from app.api import validation_errors_to_error_messages


auctionlisting_routes = Blueprint("auctionlistings", __name__)


@auctionlisting_routes.route("/")
def get_all_auctionlistings():
    all_listings = AuctionListing.query.all()
    return [listing.to_safe_dict() for listing in all_listings], 200


@auctionlisting_routes.route("/<int:auctionlisting_id>", methods=["GET", "DELETE"])
@login_required
def get_auction_listing(auctionlisting_id):
    single_listing = AuctionListing.query.get(auctionlisting_id)
    if not single_listing:
        return {"errors": "Auctionlisting not found."}, 404

    if request.method == "DELETE":
        # if not single_listing.check_owner(owner_id):
        #     return {"errors": "Forbidden."}, 403
        # else:
        db.session.delete(single_listing)
        db.session.commit()
        return {"Success": "Listing deleted."}, 202

    if request.method == "PUT":
        form = AuctionListingForm()
        form["csrf_token"].data = request.cookies["csrf_token"]
        if form.validate_on_submit():
            single_listing.auction_deadline = form.data["auction_deadline"]
            db.session.commit()
            return single_listing.to_safe_dict(), 200
        else:
            return {"errors": validation_errors_to_error_messages(form.errors)}, 401

    return single_listing.to_safe_dict(), 200


@auctionlisting_routes.route("/new", methods=["POST"])
@login_required
def create_auction_listing():
    form = AuctionListingForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        new_listing = AuctionListing.create({
            "start_bid": f"{form.data['start_bid']}",
            "auction_deadline": form.data["auction_deadline"],
            "artwork_id": form.data["artwork_id"],
            "owner_id": current_user.id
        })

        db.session.add(new_listing)
        db.session.commit()
        return new_listing.to_safe_dict(), 201
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

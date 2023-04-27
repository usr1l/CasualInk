from flask import Blueprint, request
from flask_login import login_required, current_user
import json
from app.models import AuctionListing, db
# from app.forms impor
from app.api import validation_errors_to_error_messages


auctionlisting_routes = Blueprint("auctionlistings", __name__)


@auctionlisting_routes.route("/")
def get_all_auctionlistings():
    all_listings = AuctionListing.query.all()
    return [listing.to_safe_dict() for listing in all_listings], 200

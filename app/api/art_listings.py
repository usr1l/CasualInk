from flask import Blueprint
from flask_login import login_required, current_user
import json
from app.models import ArtListing
from app.forms import ArtlistingForm

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

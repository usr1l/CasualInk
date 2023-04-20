from flask import Blueprint, request
from flask_login import login_required, current_user
import json
from app.models import Artwork
from app.forms import ArtworkForm

artwork_routes = Blueprint("artworks", __name__)


@artwork_routes.route("/")
def get_all_artworks():
    all_artworks = Artwork.query.all()
    return [artwork.to_safe_dict() for artwork in all_artworks], 200


@artwork_routes.route("/<int:artwork_id>")
@login_required
def get_a_single_artwork(artwork_id):
    single_artwork = Artwork.query.get(artwork_id)
    return single_artwork.to_safe_dict(), 200


# @artwork_routes.route("/new", methods=["POST"])
# @login_required
# def upload_an_artwork():
#     form = ArtworkForm()
#     form["csrf_token"].data = request.cookies["csrf_token"]

#     if form.validate_on_submit():

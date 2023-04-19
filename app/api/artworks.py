from flask import Blueprint
from flask_login import login_required, current_user
import json
from app.models import Artwork

artwork_routes = Blueprint("artworks", __name__)

@artwork_routes.route("")
@login_required
def get_all_artworks():
    all_artworks = Artwork.query.all()
    return [artwork.to_safe_dict() for artwork in all_artworks]

@artwork_routes.route("/<int:artwork_id>")
def get_a_single_artwork(artwork_id):
    single_artwork = Artwork.query.get(artwork_id)
    return single_artwork.to_safe_dict()

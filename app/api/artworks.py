from flask import Blueprint, request
from flask_login import login_required, current_user
import json
from app.models import Artwork, db
from app.forms import ArtworkForm
from decimal import Decimal
from datetime import date

artwork_routes = Blueprint("artworks", __name__)


@artwork_routes.route("/")
def get_all_artworks():
    all_artworks = Artwork.query.all()
    return [artwork.to_safe_dict() for artwork in all_artworks], 200


@artwork_routes.route("/<int:artwork_id>", methods=["GET", "PUT", "DELETE"])
@login_required
def single_artwork_route(artwork_id):
    owner_id = current_user.id
    single_artwork = Artwork.query.get(artwork_id)
    if not single_artwork:
        return {"error": "Artwork not found."}, 404

    if request.method == 'DELETE':
        if not single_artwork.check_owner(owner_id):
            return {"error": "Forbidden."}, 400
        db.session.delete(single_artwork)
        db.session.commit()
        return {"Success": "Artwork deleted."}, 202

    if request.method == "PUT":
        if not single_artwork.check_owner(owner_id):
            return {"error": "Forbidden."}, 400
        form = ArtworkForm()
        form["csrf_token"].data = request.cookies("csrf_token")

        if form.validate_on_submit():
            single_artwork.title = form.data["title"],
            single_artwork.artist_name = form.data["artist_name"],
            single_artwork.year = date(int(form.data["year"]), 1, 1),
            single_artwork.height = Decimal(form.data["height"]),
            single_artwork.width = Decimal(form.data["width"]),
            single_artwork.available = True if form.data["available"] == 'True' else False,
            single_artwork.type = form.data["type"]
            db.session.commit()

    return single_artwork.to_safe_dict(), 200


@artwork_routes.route("/new", methods=["POST"])
@login_required
def upload_an_artwork():
    form = ArtworkForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    owner_id = current_user.id
    if form.validate_on_submit():
        new_artwork = Artwork(
            title=form.data["title"],
            artist_name=form.data["artist_name"],
            year=date(int(form.data["year"]), 1, 1),
            height=Decimal(form.data["height"]),
            width=Decimal(form.data["width"]),
            available=True if form.data["available"] == 'True' else False,
            type=form.data["type"],
            owner_id=owner_id
        )
        db.session.add(new_artwork)
        db.session.commit()

    return new_artwork.to_safe_dict(), 201

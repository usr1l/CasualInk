from flask import Blueprint, request
from flask_login import login_required, current_user
import json
from app.models import Artwork, db
from app.forms import ArtworkForm
from decimal import Decimal
from datetime import date
from app.forms import upload_file_to_AWS, get_unique_filename, remove_file_from_AWS

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
        file_delete = remove_file_from_AWS(single_artwork.image)
        if file_delete:
            db.session.delete(single_artwork)
            db.session.commit()
            return {"Success": "Artwork deleted."}, 202
        else:
            return {"Error": "Error deleting file image"}, 400

    if request.method == "PUT":
        if not single_artwork.check_owner(owner_id):
            return {"error": "Forbidden."}, 400
        form = ArtworkForm()
        form["csrf_token"].data = request.cookies("csrf_token")
        file_delete = remove_file_from_AWS(single_artwork.image)
        if not file_delete:
            return {"Error": "Error deleting file image"}, 400

        if form.data["image"]:
            new_image = form.data["image"]
            new_image.filename = get_unique_filename(new_image.filename)
            upload = upload_file_to_AWS(new_image)

            if "url" not in upload:
                return {"error": "Image upload failed"}

            if form.validate_on_submit():
                single_artwork.title = form.data["title"]
                single_artwork.artist_name = form.data["artist_name"]
                single_artwork.year = date(int(form.data["year"]), 1, 1)
                single_artwork.height = Decimal(form.data["height"])
                single_artwork.width = Decimal(form.data["width"])
                single_artwork.available = True if form.data["available"] == 'True' else False
                single_artwork.materials = form.data["materials"]
                single_artwork.image = upload["url"]
                db.session.commit()
        else:
            if form.validate_on_submit():
                single_artwork.title = form.data["title"]
                single_artwork.artist_name = form.data["artist_name"]
                single_artwork.year = date(int(form.data["year"]), 1, 1)
                single_artwork.height = Decimal(form.data["height"])
                single_artwork.width = Decimal(form.data["width"])
                single_artwork.available = True if form.data["available"] == 'True' else False
                single_artwork.materials = form.data["materials"]
                db.session.commit()

    return single_artwork.to_safe_dict(), 200


@artwork_routes.route("/new", methods=["POST"])
@login_required
def upload_an_artwork():
    form = ArtworkForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    owner_id = current_user.id
    if form.validate_on_submit():
        image = form.data["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_AWS(image)

        if "url" not in upload:
            return {"error": "Image upload failed"}

        new_artwork = Artwork(
            title=form.data["title"],
            artist_name=form.data["artist_name"],
            year=date(int(form.data["year"]), 1, 1),
            height=Decimal(form.data["height"]),
            width=Decimal(form.data["width"]),
            available=True if form.data["available"] == 'True' else False,
            materials=form.data["materials"],
            image=upload["url"],
            owner_id=owner_id
        )
        db.session.add(new_artwork)
        db.session.commit()

    return new_artwork.to_safe_dict(), 201

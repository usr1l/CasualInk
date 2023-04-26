from flask import Blueprint, request
from flask_login import login_required, current_user
import json
from app.models import Artwork, db
from app.forms import ArtworkForm
from app.api import validation_errors_to_error_messages
from app.forms import upload_file_to_AWS, get_unique_filename, remove_file_from_AWS

artwork_routes = Blueprint("artworks", __name__)


@artwork_routes.route("/")
def get_all_artworks():
    all_artworks = Artwork.query.all()
    return [artwork.to_dict() for artwork in all_artworks], 200


@artwork_routes.route("/<int:artwork_id>", methods=["GET", "PUT", "DELETE"])
@login_required
def single_artwork_route(artwork_id):
    owner_id = current_user.id
    single_artwork = Artwork.query.get(artwork_id)
    if not single_artwork:
        return {"errors": "Artwork not found."}, 404

    if request.method == 'DELETE':
        if not single_artwork.check_owner(owner_id):
            return {"errors": "Forbidden."}, 403
        file_delete = remove_file_from_AWS(single_artwork.image)

        if file_delete:
            db.session.delete(single_artwork)
            db.session.commit()
            return {"Success": "Artwork deleted."}, 202
        else:
            return {"errors": "Error deleting file image"}, 400

    if request.method == "PUT":
        if not single_artwork.check_owner(owner_id):
            return {"errors": "Forbidden."}, 403
        form = ArtworkForm()
        form["csrf_token"].data = request.cookies["csrf_token"]
        if form.data["image"]:

            if form.validate_on_submit():
                file_delete = remove_file_from_AWS(single_artwork.image)
                if not file_delete:
                    return {"errors": "Error deleting file image"}, 400

                new_image = form.data["image"]
                new_image.filename = get_unique_filename(new_image.filename)
                upload = upload_file_to_AWS(new_image)

                if "url" not in upload:
                    return {"errors": "Image upload failed"}

                single_artwork.title = form.data["title"]
                single_artwork.artist_name = form.data["artist_name"]
                single_artwork.year = form.data["year"]
                single_artwork.height = f'{form.data["height"]}'
                single_artwork.width = f'{form.data["width"]}'
                single_artwork.available = True if form.data["available"] == 'True' else False
                single_artwork.description = form.data["description"]
                single_artwork.materials = form.data["materials"]
                single_artwork.image = upload["url"]
                db.session.commit()
                return single_artwork.to_dict(), 200
            else:
                return {"errors": validation_errors_to_error_messages(form.errors)}, 401
        else:
            if form.validate_on_submit():
                single_artwork.title = form.data["title"]
                single_artwork.artist_name = form.data["artist_name"]
                single_artwork.year = form.data["year"]
                single_artwork.height = f"{form.data['height']}"
                single_artwork.width = f"{form.data['width']}"
                single_artwork.available = True if form.data["available"] == 'True' else False
                single_artwork.description = form.data["description"]
                single_artwork.materials = form.data["materials"]
                db.session.commit()
                return single_artwork.to_dict(), 200

            else:
                return {"errors": validation_errors_to_error_messages(form.errors)}, 401

    return single_artwork.to_dict(), 200


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
            return {"errors": "Image upload failed"}
        new_artwork = Artwork(
            title=form.data["title"],
            artist_name=form.data["artist_name"],
            year=form.data["year"],
            height=f"{form.data['height']}",
            width=f"{form.data['width']}",
            available=True if form.data["available"] == 'True' else False,
            materials=form.data["materials"],
            description=form.data["description"],
            image=upload["url"],
            owner_id=owner_id
        )
        db.session.add(new_artwork)
        db.session.commit()
        return new_artwork.to_dict(), 201

    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

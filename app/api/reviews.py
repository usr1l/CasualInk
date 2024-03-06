import json
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Review, db
from app.api import validation_errors_to_error_messages

review_routes = Blueprint("reviews", __name__)


@review_routes.route("/")
# @login_required
def get_all_reviews():
    reviews = Review.query.all()
    print("=======================================================================================================",
          reviews[0].to_safe_dict())
    return [review.to_safe_dict() for review in reviews]


@review_routes.route("/<int:receiver_id>", methods=['GET', 'POST'])
@login_required
def get_user_reviews(receiver_id):

    if request.method == "GET":
        reviews = Review.query.filter(Review.receiver_id).all()
        return [review.to_safe_dict() for review in reviews], 200

    if request.method == 'POST':
        data = json.loads(request.data)
        new_review = Review.create(
            {"review": data["review"], "reviewer_id": current_user.id, "receiver_id": receiver_id})
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_safe_dict(), 201

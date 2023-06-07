from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Review, db
from app.api import validation_errors_to_error_messages

review_routes = Blueprint("reviews", __name__)


@review_routes.route("/")
# @login_required
def get_all_reviews():
    reviews = Review.query.all()
    return [review.to_safe_dict() for review in reviews]


@review_routes.route("/<int:receiver_id>")
@login_required
def get_user_reviews(receiver_id):
    reviews = Review.query.filter(Review.receiver_id).all()
    return [review.to_safe_dict() for review in reviews]

# @review_routes.route("/")
# @login_required
# def get_all_reviews():
#     reviews = Review.query.all()
#     return reviews.to_safe_dict()

# @review_routes.route("/")
# @login_required
# def get_all_reviews():
#     reviews = Review.query.all()
#     return reviews.to_safe_dict()

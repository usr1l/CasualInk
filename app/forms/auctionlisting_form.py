from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField
from wtforms.validators import DataRequired


class AuctionListingForm(FlaskForm):
    start_bid = StringField("start bid", )
    auction_deadline = DateTimeField("datetime", validators=[DataRequired()])
    artwork_id = IntegerField("artwork id")

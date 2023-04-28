from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class ArtlistingForm(FlaskForm):
    price = StringField("Price ($): ", validators=[DataRequired()])
    amount_available = IntegerField(
        "Amount Available: ", validators=[DataRequired()])
    artwork_id = IntegerField("artwork id")

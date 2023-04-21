from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, DateField
from wtforms.validators import DataRequired
from app.models import ArtWorkTypesEnum
from flask_wtf.file import FileField, FileAllowed, FileRequired
from .AWS_helpers import ALLOWED_EXTENSIONS


class ArtworkForm(FlaskForm):
    title = StringField("What is the title of this piece?")
    artist_name = StringField("What is the name of the artist?")
    year = DateField("When is this piece from?")
    height = StringField("Height: ", validators=[
                         DataRequired(message="Height required.")])
    width = StringField("Width: ", validators=[
                        DataRequired(message="Width required.")])
    available = SelectField("Available for sale: ", choices=['Yes', 'No'])
    materials = SelectField("Materials: ", choices=[c.value for c in ArtWorkTypesEnum],
                            validators=[DataRequired()])
    image = FileField("Image File", validators=[
                      FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
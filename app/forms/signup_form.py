from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.models import User
from .AWS_helpers import ALLOWED_EXTENSIONS, upload_file_to_AWS, get_unique_filename


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    firstname = StringField('firstname', validators=[DataRequired()])
    lastname = StringField('lastname', validators=[DataRequired()])
    bio = StringField('bio', validators=[DataRequired()])
    password = StringField('password', validators=[DataRequired()])
    firstname = StringField('firstname', validators=[DataRequired()])
    profile_pic = FileField("profile pic", validators=[
                            FileAllowed(list(ALLOWED_EXTENSIONS))])

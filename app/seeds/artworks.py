from app.models import db, environment, SCHEMA, Artwork, ArtWorkTypesEnum
from datetime import date
from sqlalchemy.sql import text


def seed_artworks():
    artwork_seed_data = [
        {
            "title": "Café Terrace at Night",
            "artist_name": "Vincent van Gogh",
            "year": 1888,
            "height": "81.0",
            "width": "65.5",
            "available": True,
            "materials": "OIL",
            "owner_id": 1,
            "image": "https://images5.alphacoders.com/481/481903.png"
        },
        {
            "title": "Mona Lisa",
            "artist_name": "Leonardo da Vinci",
            "year": 1503,
            "height": "77.0",
            "width": "53.0",
            "available": True,
            "materials": "OIL",
            "owner_id": 2,
            "image": "https://images.unsplash.com/photo-1587410131477-f01b22c59e1c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9"
        },
        {
            "title": "The Starry Night",
            "artist_name": "Vincent van Gogh",
            "year": 1889,
            "height": "74.0",
            "width": "92.0",
            "available": True,
            "materials": "OIL",
            "owner_id": 3,
            "image": "https://images.unsplash.com/photo-1587410131477-f01b22c59e1c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9"
        },
        {
            "title": "The Persistence of Memory",
            "artist_name": "Salvador Dalí",
            "year": 1931,
            "height": "24.0",
            "width": "33.0",
            "available": True,
            "materials": "OIL",
            "owner_id": 1,
            "image": "https://images5.alphacoders.com/481/481903.png"
        },
        {
            "title": "Girl with a Pearl Earring",
            "artist_name": "Johannes Vermeer",
            "year": 1665,
            "height": "46.5",
            "width": "40.0",
            "available": True,
            "materials": "OIL",
            "owner_id": 2,
            "image": "https://images5.alphacoders.com/481/481903.png"
        },
        {
            "title": "The Scream",
            "artist_name": "Edvard Munch",
            "year": 1893,
            "height": "91.0",
            "width": "73.5",
            "available": True,
            "materials": "OIL",
            "owner_id": 3,
            "image": "https://images.unsplash.com/photo-1587410131477-f01b22c59e1c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9"
        },
        {
            "title": "Guernica",
            "artist_name": "Pablo Picasso",
            "year": 1937,
            "height": "349.0",
            "width": "776.0",
            "available": True,
            "materials": "OIL",
            "owner_id": 3,
            "image": "https://images5.alphacoders.com/481/481903.png"
        },
        {
            "title": "The Last Supper",
            "artist_name": "Leonardo da Vinci",
            "year": 1493,
            "height": "460.0",
            "width": "880.0",
            "available": True,
            "materials": "OIL",
            "owner_id": 1,
            "image": "https://images5.alphacoders.com/481/481903.png"
        },
        {
            "title": "The Birth of Venus",
            "artist_name": "Sandro Botticelli",
            "year": 1486,
            "height": "278.5",
            "width": "172.5",
            "available": True,
            "materials": "OIL",
            "owner_id": 2,
            "image": "https://images.unsplash.com/photo-1587410131477-f01b22c59e1c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9"
        },
        {
            "title": "The Night Watch",
            "artist_name": "Rembrandt van Rijn",
            "year": 1642,
            "height": "363.0",
            "width": "437.0",
            "available": True,
            "materials": "OIL",
            "owner_id": 3,
            "image": "https://images5.alphacoders.com/481/481903.png"
        },
        {
            "title": "Water Lilies",
            "artist_name": "Claude Monet",
            "year": 1906,
            "height": "200.0",
            "width": "425.0",
            "available": True,
            "materials": "OIL",
            "owner_id": 1,
            "image": "https://images5.alphacoders.com/481/481903.png"
        },
        {
            "title": "The Kiss",
            "artist_name": "Gustav Klimt",
            "year": 1908,
            "height": "180.0",
            "width": "180.0",
            "available": True,
            "materials": "OIL",
            "owner_id": 2,
            "image": "https://images5.alphacoders.com/481/481903.png"
        },
        {
            "title": "American Gothic",
            "artist_name": "Grant Wood",
            "year": 1930,
            "height": "74.3",
            "width": "62.4",
            "available": True,
            "materials": "OIL",
            "owner_id": 1,
            "image": "https://images5.alphacoders.com/481/481903.png"
        }
    ]

    artwork_items = Artwork.create(artwork_seed_data)
    new_items = [db.session.add(artwork) for artwork in artwork_items]
    db.session.commit()

    return new_items


def unseed_artworks():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.artworks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM artworks"))

    db.session.commit()

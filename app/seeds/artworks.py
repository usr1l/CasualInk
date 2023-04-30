from app.models import db, environment, SCHEMA, Artwork, ArtWorkTypesEnum
from datetime import date
from sqlalchemy.sql import text


def seed_artworks():
    artwork_seed_data = [
        Artwork(title='Starry Night', artist_name='Vincent van Gogh', year=1889, height='73.7', width='92.1', available=True, materials=ArtWorkTypesEnum.OIL, image='https://images.unsplash.com/photo-1596143831703-964db2e5e5d1?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9',
                description='Starry Night is one of the most famous paintings in the world, and is considered Vincent van Gogh\'s masterpiece. The swirling stars and moonlit landscape have captivated viewers for over a century.', owner_id=1),
        Artwork(title='Mona Lisa', artist_name='Leonardo da Vinci', year=1503, height='77', width='53', available=True, materials=ArtWorkTypesEnum.OIL, image='https://www.makingitsweet.com/wp-content/uploads/2012/10/tree_sample.jpg',
                description='The Mona Lisa is perhaps the most famous portrait in the world. Leonardo da Vinci painted it in the early 16th century, and it has been the subject of much speculation and interpretation ever since.', owner_id=2),
        Artwork(title='The Persistence of Memory', artist_name='Salvador Dalí', year=1931, height='24', width='33', available=True, materials=ArtWorkTypesEnum.OIL, image='https://www.thewowstyle.com/wp-content/uploads/2015/04/740b6_contemporary-art.jpg',
                description='The Persistence of Memory is a surrealist painting by Salvador Dalí. It features a surreal landscape with melting clocks, and is one of the most recognizable works of 20th century art.', owner_id=3),
        Artwork(title='The Starry Night Over the Rhône', artist_name='Vincent van Gogh', year=1888, height='72.5', width='92', available=True, materials=ArtWorkTypesEnum.OIL, image='https://i.pinimg.com/originals/11/f7/ec/11f7ecab79afb5dd0e930e75f3666e81.jpg',
                description='The Starry Night Over the Rhône is a beautiful nocturnal painting by Vincent van Gogh. The painting depicts the river Rhône and the city of Arles at night, and is one of van Gogh\'s most famous works.', owner_id=1),
        Artwork(title='The Kiss', artist_name='Gustav Klimt', year=1907, height='180', width='180', available=True, materials=ArtWorkTypesEnum.OIL, image='https://images.unsplash.com/photo-1596143831703-964db2e5e5d1?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9',
                description='The Kiss is a beautiful painting by Gustav Klimt. The painting features a couple embracing, and is one of the most famous paintings of the art nouveau movement.', owner_id=2),
        Artwork(title='The Scream', artist_name='Edvard Munch', year=1893, height='91', width='73.5', available=True, materials=ArtWorkTypesEnum.PASTEL, image='https://cdn.pixabay.com/photo/2017/11/09/12/55/building-2933411_640.png',
                description='The Scream is a famous painting by Edvard Munch. It depicts a figure screaming against a red sky, and is one of the most iconic images of modern art.', owner_id=3),
        Artwork(title='Guernica', artist_name='Pablo Picasso', year=1937, height='3.5', width='7.8', available=True, materials=ArtWorkTypesEnum.OIL, image='https://www.thewowstyle.com/wp-content/uploads/2015/04/740b6_contemporary-art.jpg',
                description='Guernica is a large-scale painting by Pablo Picasso, which depicts the horrors of the Spanish Civil War. The painting has become a symbol of anti-war activism and is one of the most famous political artworks of the 20th century.', owner_id=1),
        Artwork(title='The Birth of Venus', artist_name='Sandro Botticelli', year=1485, height='278', width='172.5', available=True, materials=ArtWorkTypesEnum.TEMPERA, image='https://i.pinimg.com/originals/11/f7/ec/11f7ecab79afb5dd0e930e75f3666e81.jpg',
                description='The Birth of Venus is a famous painting by Sandro Botticelli. The painting depicts the goddess Venus emerging from the sea, and is one of the most famous examples of Renaissance art.', owner_id=2),
        Artwork(title='The Last Supper', artist_name='Leonardo da Vinci', year=1495, height='460', width='880', available=True, materials=ArtWorkTypesEnum.TEMPERA, image='https://www.leonardodavinci.net/images/paintings/the-last-supper.jpg',
                description='The Last Supper is a famous mural painting by Leonardo da Vinci. The painting depicts the last supper of Jesus with his disciples, and is one of the most famous religious paintings in the world.', owner_id=3),
        Artwork(title='The Garden of Earthly Delights', artist_name='Hieronymus Bosch', year=1515, height='220', width='389', available=True, materials=ArtWorkTypesEnum.OIL, image='https://www.makingitsweet.com/wp-content/uploads/2012/10/tree_sample.jpg',
                description='The Garden of Earthly Delights is a triptych painting by Hieronymus Bosch. The painting depicts a surreal landscape with human figures and animals, and is considered one of the most bizarre and intriguing works of art in history.', owner_id=1),
        Artwork(title='The Night Watch', artist_name='Rembrandt van Rijn', year=1642, height='379.5', width='453.5', available=True, materials=ArtWorkTypesEnum.OIL, image='https://i.pinimg.com/originals/11/f7/ec/11f7ecab79afb5dd0e930e75f3666e81.jpg',
                description='The Night Watch is a famous painting by Rembrandt van Rijn. The painting depicts a group of Dutch militiamen, and is one of the most famous examples of Dutch Golden Age painting.', owner_id=2),
        Artwork(title='Water Lilies', artist_name='Claude Monet', year=1916, height='200', width='180', available=True, materials=ArtWorkTypesEnum.OIL, image='https://i.pinimg.com/originals/11/f7/ec/11f7ecab79afb5dd0e930e75f3666e81.jpg',
                description='Water Lilies is a series of paintings by Claude Monet. The paintings depict Monet\'s flower garden and pond at Giverny, and are considered some of the most iconic examples of Impressionist art.', owner_id=3),
        Artwork(title='Campbell\'s Soup Cans', artist_name='Andy Warhol', year=1962, height='51', width='41', available=True, materials=ArtWorkTypesEnum.SILKSCREEN, image='https://cdn.pixabay.com/photo/2017/11/09/12/55/building-2933411_640.png',
                description='Campbell\'s Soup Cans is a series of paintings by Andy Warhol. The paintings feature repeated images of Campbell\'s Soup cans, and are considered some of the most important works of pop art.', owner_id=1),
        Artwork(title='The School of Athens', artist_name='Raphael', year=1511, height='500', width='770', available=True, materials=ArtWorkTypesEnum.FRESCO, image='https://www.thewowstyle.com/wp-content/uploads/2015/01/nature-images..jpg',
                description='The School of Athens is a famous fresco painting by Raphael. The painting depicts a group of philosophers and is considered one of the greatest works of Renaissance art.', owner_id=2),
        Artwork(title='The Hay Wagon', artist_name='John Constable', year=1821, height='130', width='185', available=True, materials=ArtWorkTypesEnum.OIL, image='http://3.bp.blogspot.com/-1N04gdQCTFw/UQrkdm6rr8I/AAAAAAAAA3Y/FMQjOM8IrPY/s1600/z.jpg',
                description='The Hay Wagon is a famous landscape painting by John Constable. The painting depicts a hay wagon in the countryside and is considered one of the most famous examples of British Romanticism.', owner_id=3),
        Artwork(title='The Kiss', artist_name='Auguste Rodin', year=1889, height='181.9', width='112.1', available=True, materials=ArtWorkTypesEnum.MARBLE, image='https://www.thewowstyle.com/wp-content/uploads/2015/01/nature-images..jpg',
                description='The Kiss is a famous sculpture by Auguste Rodin. The sculpture features a couple embracing and is considered one of the greatest works of art of the 19th century.', owner_id=1),
        Artwork(title='The Starry Night', artist_name='Georgia O\'Keeffe', year=1922, height='76.2', width='101.6', available=True, materials=ArtWorkTypesEnum.OIL, image='https://st.depositphotos.com/1008304/2438/i/950/depositphotos_24384825-stock-photo-tall-building.jpg',
                description='The Starry Night is a painting by Georgia O\'Keeffe. The painting depicts a night sky filled with stars and is considered one of the most famous examples of American modernism.', owner_id=2),
        Artwork(title='The Great Wave off Kanagawa', artist_name='Katsushika Hokusai', year=1829, height='25.7', width='37.8', available=True, materials=ArtWorkTypesEnum.WOODBLOCK, image='https://st.depositphotos.com/1008304/2438/i/950/depositphotos_24384825-stock-photo-tall-building.jpg',
                description='The Great Wave off Kanagawa is a famous woodblock print by Katsushika Hokusai. The print features a huge wave and is considered one of the most iconic examples of Japanese art.', owner_id=3),
        Artwork(title='Nighthawks', artist_name='Edward Hopper', year=1942, height='84.1', width='152.4', available=True, materials=ArtWorkTypesEnum.OIL, image='http://3.bp.blogspot.com/-1N04gdQCTFw/UQrkdm6rr8I/AAAAAAAAA3Y/FMQjOM8IrPY/s1600/z.jpg',
                description='Nighthawks is a famous painting by Edward Hopper. The painting depicts a late-night diner and is considered one of the most famous examples of American realist art.', owner_id=1),
        Artwork(title='American Gothic', artist_name='Grant Wood', year=1930, height='74.3', width='62.4', available=True, materials=ArtWorkTypesEnum.OIL, image='https://cdn.pixabay.com/photo/2017/11/09/12/55/building-2933411_640.png',
                description='American Gothic is a famous painting by Grant Wood. The painting features a farmer and his daughter standing in front of a house and is considered one of the most famous examples of American regionalism.', owner_id=2),
        Artwork(title='The Birth of Venus', artist_name='William-Adolphe Bouguereau', year=1879, height='300', width='218', available=True, materials=ArtWorkTypesEnum.OIL, image='https://cdn.pixabay.com/photo/2017/11/09/12/55/building-2933411_640.png',
                description='The Birth of Venus is a famous painting by William-Adolphe Bouguereau. The painting features the goddess Venus emerging from the sea and is considered one of the most famous examples of academic art.', owner_id=1),
    ]

    new_items = [db.session.add(artwork) for artwork in artwork_seed_data]
    db.session.commit()
    return new_items


def unseed_artworks():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.artworks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM artworks"))

    db.session.commit()

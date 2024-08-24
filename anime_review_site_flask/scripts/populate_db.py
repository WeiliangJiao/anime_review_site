import os
import sys

from models import User, Anime, Review
from faker import Faker
import random
from app import app
from db import db

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

fake = Faker()

# Connect to your database
def init_db():
    with app.app_context():
        db.create_all()

def is_db_empty():
    with app.app_context():
        # Check if the Anime, User, and Review tables are empty
        anime_count = Anime.query.count()
        user_count = User.query.count()
        review_count = Review.query.count()
        return anime_count == 0 and user_count == 0 and review_count == 0

def populate_animes():
    with app.app_context():
        animes = [
            {"title": "Initial D First Stage", "description": "Street racing", "cover_image_url": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/a05ab08aa49bb9a74d21d4c159a09fcc.jpg"},
            {"title": "JoJo's Bizarre Adventure", "description": "Bizarre adventures",
             "cover_image_url": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/e825c9fb2edb7834361f1617e6a9bba9.jpg"},
            {"title": "One Punch Man", "description": "Superhero action",
             "cover_image_url": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/f5d173f8317f592c6c70d594829b89e4.jpg"},
            {"title": "JoJo's Bizarre Adventure Part 4", "description": "Even more bizarre adventures",
             "cover_image_url": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/a5ad1f8f0379ea4dd1f63b27c8449707.jpg"},
            {"title": "Initial D Third Stage", "description": "Even more street racing", "cover_image_url": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/aee8419c8847456d7a84e16867edf205.jpg"},
            {"title": "Initial D Fourth Stage", "description": "Street racing continues", "cover_image_url": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/55fcef81a256771d6605d5aff5ef1938.jpg"},
            {"title": "Initial D Fifth Stage", "description": "Ultimate street racing", "cover_image_url": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/f3c2a15a85578ec0f764c5d249982605.jpg"},
            {"title": "One Punch Man 2nd Season", "description": "More superhero action", "cover_image_url": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/c50314f1aa980665c1316d36952d4446.jpg"},
            {"title": "Initial D Second Stage", "description": "More street racing",
             "cover_image_url": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/c029deda2b66b6c044122b3c8b12ec94.jpg"},
            {"title": "JoJo's Bizarre Adventure Part 2", "description": "More bizarre adventures", "cover_image_url": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/ec4f1336bb37e81b4ac5470bf738d259.jpg"},
        ]
        for anime in animes:
            new_anime = Anime(title=anime['title'], description=anime['description'], cover_image_url=anime['cover_image_url'])
            db.session.add(new_anime)
        db.session.commit()

def populate_users_and_reviews():
    with app.app_context():
        for _ in range(15):
            username = fake.user_name()
            password = fake.password()
            new_user = User(username=username, password=password)
            db.session.add(new_user)
            db.session.commit()

            # Add 2-5 reviews for each user
            for _ in range(random.randint(2, 5)):
                anime_id = random.randint(1, 10)  # Assuming there are 10 animes
                review_text = fake.text(max_nb_chars=200)
                likes = random.randint(0, 100)
                new_review = Review(anime_id=anime_id, user_id=new_user.id, review_text=review_text, likes=likes)
                db.session.add(new_review)
            db.session.commit()

if __name__ == "__main__":
    with app.app_context():
        init_db()
        if is_db_empty():
            populate_animes()
            populate_users_and_reviews()
            print("Database populated successfully!")
        else:
            print("Database is already populated.")

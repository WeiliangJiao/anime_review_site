from db import db

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(50), nullable=False)

class Anime(db.Model):
    __tablename__ = 'animes'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    cover_image_url = db.Column(db.String(255), nullable=True)

class Review(db.Model):
    __tablename__ = 'reviews'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    anime_id = db.Column(db.Integer, db.ForeignKey('animes.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    review_text = db.Column(db.String(255), nullable=False)
    likes = db.Column(db.Integer, default=0)
    anime = db.relationship('Anime', backref=db.backref('reviews', lazy=True))
    user = db.relationship('User', backref=db.backref('reviews', lazy=True))

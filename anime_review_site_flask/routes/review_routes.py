from flask import Blueprint, request, jsonify
from db import db
from models import Review, User

review_bp = Blueprint('reviews', __name__)


@review_bp.route('/add', methods=['POST'])
def add_review():
    data = request.get_json()
    new_review = Review(anime_id=data['animeId'], user_id=data['userId'],
                        review_text=data['reviewText'], likes= 0)
    db.session.add(new_review)
    db.session.commit()
    return jsonify({'message': 'Review added successfully', 'review_id': new_review.id})

@review_bp.route('/<int:anime_id>', methods=['GET'])
def get_anime_reviews(anime_id):
    reviews = Review.query.filter_by(anime_id=anime_id).all()
    reviews_with_username = []
    for review in reviews:
        user = User.query.get(review.user_id)
        reviews_with_username.append({
            'reviewId': review.id,
            'userName': user.username,
            'reviewText': review.review_text,
            'likes': review.likes
        })
    return jsonify(reviews_with_username)

@review_bp.route('/<int:review_id>/upvote', methods=['PUT'])
def upvote_review(review_id):
    review = Review.query.get(review_id)
    if review:
        review.likes += 1
        db.session.commit()
        return jsonify({'message': 'Review upvoted successfully', 'new_likes': review.likes})
    else:
        return jsonify({'message': 'Review not found'}), 404

@review_bp.route('/<int:review_id>/downvote', methods=['PUT'])
def downvote_review(review_id):
    review = Review.query.get(review_id)
    if review:
        review.likes -= 1
        db.session.commit()
        return jsonify({'message': 'Review downvoted successfully', 'new_likes': review.likes})
    else:
        return jsonify({'message': 'Review not found'}), 404

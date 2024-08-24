from flask import Blueprint, request, jsonify
from db import db
from models import User

user_bp = Blueprint('users', __name__)

@user_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    new_user = User(username=data['username'], password=data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully', 'userId': new_user.id,
                    'userName': new_user.username, 'token': 'tk'})

@user_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username'], password=data['password']).first()
    if user:
        return jsonify({'message': 'Login successful', 'userId': user.id,
                        'userName': user.username, 'token': 'tk'})
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

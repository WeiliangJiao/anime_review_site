from flask import Blueprint, request, jsonify
from db import db
from models import Anime

anime_bp = Blueprint('animes', __name__)

@anime_bp.route('/', methods=['GET'])
def get_animes():
    animes = Anime.query.all()
    return jsonify([{'animeId': anime.id, 'Title': anime.title, 'Description': anime.description,
                     'CoverImageURL': anime.cover_image_url} for anime in animes])

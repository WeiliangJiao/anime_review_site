from flask import Flask
from flask_cors import CORS
from config import Config
from db import db
from routes.user_routes import user_bp
from routes.anime_routes import anime_bp
from routes.review_routes import review_bp

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "POST", "PUT", "DELETE"], "allow_headers": ["Content-Type", "Authorization"]}})


app.config.from_object(Config)
db.init_app(app)

# Register blueprints
app.register_blueprint(user_bp, url_prefix='/users')
app.register_blueprint(anime_bp, url_prefix='/animes')
app.register_blueprint(review_bp, url_prefix='/reviews')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

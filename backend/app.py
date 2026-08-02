from flask_restful import Resource, Api
from flask_api import FlaskAPI
from flask_cors import CORS

app = FlaskAPI(__name__)
api = Api(app)
CORS(app)

products = [
    {
        "id": 1,
        "name": "Aurora Headphones",
        "price": 129,
        "description": "Immersive sound with noise cancellation for daily focus.",
        "category": "Audio",
        "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80"
    },
    {
        "id": 2,
        "name": "Luma Smart Watch",
        "price": 199,
        "description": "Track your goals with a sleek, all-day wearable.",
        "category": "Wearables",
        "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80"
    },
    {
        "id": 3,
        "name": "Nova Backpack",
        "price": 89,
        "description": "A versatile travel companion built for modern routines.",
        "category": "Lifestyle",
        "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"
    },
    {
        "id": 4,
        "name": "Orbit Speaker",
        "price": 149,
        "description": "Portable premium audio for work, travel, and weekends.",
        "category": "Audio",
        "image": "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80"
    }
]

class HealthResource(Resource):
    def get(self):
        return {"status": "ok", "message": "Ushbub Flask API is running"}


class ProductsResource(Resource):
    def get(self):
        return products


class ProductResource(Resource):
    def get(self, product_id):
        product = next((item for item in products if item["id"] == product_id), None)
        if product is None:
            return {"message": "Product not found"}, 404
        return product


api.add_resource(HealthResource, '/api/health')
api.add_resource(ProductsResource, '/api/products')
api.add_resource(ProductResource, '/api/products/<int:product_id>')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)

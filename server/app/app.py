from flask import Flask, jsonify
from dotenv import load_dotenv
import os

# loading environment variables
load_dotenv()

app = Flask(__name__)

@app.route('/')
def test():
    obj = {
        "name": "test"
    }

    return jsonify(obj)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=os.getenv("FLASK_PORT"))
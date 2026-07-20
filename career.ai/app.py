print("Flask running...")

from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/quiz')
def quiz():
    return render_template("quiz.html")

@app.route('/result')
def result():
    return render_template("result.html")


@app.route('/predict', methods=['POST'])
def predict():

    data = request.get_json()

    if not data or "answers" not in data:
        return jsonify({
            "career": "Unknown",
            "degree": "Not Found",
            "course": "No data received",
            "quote": "Try again!"
        })

    answers = data["answers"]

    # SIMPLE LOGIC
    if "Programming" in answers or "Coding" in answers:
        return jsonify({
            "career": "Software Engineer",
            "degree": "BS Computer Science",
            "course": "Python, Web Development",
            "quote": "Code your future!"
        })

    elif "Design" in answers or "Creativity" in answers:
        return jsonify({
            "career": "UI/UX Designer",
            "degree": "BS Design",
            "course": "Figma, Photoshop",
            "quote": "Design the world!"
        })

    elif "Medical" in answers or "Helping" in answers:
        return jsonify({
            "career": "Doctor",
            "degree": "MBBS",
            "course": "Biology, Anatomy",
            "quote": "Save lives!"
        })

    else:
        return jsonify({
            "career": "Teacher",
            "degree": "B.Ed",
            "course": "Education Skills",
            "quote": "Inspire minds!"
        })


if __name__ == "__main__":
    app.run(debug=True)
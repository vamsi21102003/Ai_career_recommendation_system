import pickle
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
import warnings

# Suppress sklearn warnings
warnings.filterwarnings("ignore", category=UserWarning)

# API-only Flask application for career recommendations

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# -------- Load model and encoders --------
try:
    model           = pickle.load(open("model.pkl", "rb"))
    edu_enc         = pickle.load(open("edu_encoder.pkl", "rb"))
    skill_enc       = pickle.load(open("skills_encoder.pkl", "rb"))
    int_enc         = pickle.load(open("interests_encoder.pkl", "rb"))
    career_enc      = pickle.load(open("career_encoder.pkl", "rb"))
    feature_columns = pickle.load(open("feature_columns.pkl", "rb"))
    print("All models loaded successfully")
except Exception as e:
    print(f"Error loading models: {str(e)}")
    # Initialize as None to handle gracefully
    model = edu_enc = skill_enc = int_enc = career_enc = feature_columns = None

@app.route("/")
def home():
    try:
        return {
            "message": "AI Career Recommendation System API",
            "status": "running",
            "endpoints": {
                "POST /predict": "Get career recommendation",
                "GET /options": "Get available options for form fields",
                "GET /health": "Health check"
            },
            "example_request": {
                "name": "John Doe",
                "age": 25,
                "education": "Bachelor's",
                "skills": ["Python", "Machine Learning"],
                "interests": ["Technology", "Problem Solving"]
            }
        }
    except Exception as e:
        return {"error": f"Home route error: {str(e)}"}, 500

@app.route("/health")
def health():
    try:
        # Test if models are loaded
        model_status = "loaded" if model is not None else "not loaded"
        edu_status = "loaded" if edu_enc is not None else "not loaded"
        skill_status = "loaded" if skill_enc is not None else "not loaded"
        
        return {
            "status": "healthy",
            "models": {
                "main_model": model_status,
                "education_encoder": edu_status,
                "skills_encoder": skill_status
            }
        }
    except Exception as e:
        return {"error": f"Health check failed: {str(e)}"}, 500

@app.route("/options")
def get_options():
    try:
        if skill_enc is None or int_enc is None or edu_enc is None:
            return {"error": "Models not loaded properly"}, 500
            
        return {
            "skills": sorted(skill_enc.classes_.tolist()),
            "interests": sorted(int_enc.classes_.tolist()),
            "education": edu_enc.classes_.tolist()
        }
    except Exception as e:
        return {"error": f"Options endpoint error: {str(e)}"}, 500

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Get JSON data with proper error handling
        if not request.is_json:
            return jsonify({"error": "Content-Type must be application/json"}), 400
            
        data = request.get_json()
        if not data:
            return jsonify({"error": "No JSON data provided"}), 400

        name = data.get("name", "").strip()
        age = data.get("age")
        education = data.get("education", "").strip()
        skills = data.get("skills", [])
        interests = data.get("interests", [])

        # Validate inputs
        if not name:
            return jsonify({"error": "Name is required"}), 400
        if not age or not isinstance(age, (int, float)) or age < 16 or age > 100:
            return jsonify({"error": "Valid age (16-100) is required"}), 400
        if not education:
            return jsonify({"error": "Education is required"}), 400
        if not skills or not isinstance(skills, list):
            return jsonify({"error": "At least one skill is required"}), 400
        if not interests or not isinstance(interests, list):
            return jsonify({"error": "At least one interest is required"}), 400

        age = int(age)

        if education not in edu_enc.classes_:
            return jsonify({"error": f"Invalid education. Valid options: {list(edu_enc.classes_)}"}), 400

        # Encode inputs
        edu_code = edu_enc.transform([education])[0]

        try:
            skills_arr = skill_enc.transform([skills])
        except ValueError as e:
            return jsonify({"error": f"Invalid skills selected. Error: {str(e)}"}), 400
        
        try:
            ints_arr = int_enc.transform([interests])
        except ValueError as e:
            return jsonify({"error": f"Invalid interests selected. Error: {str(e)}"}), 400

        # Create DataFrame for prediction
        skills_df = pd.DataFrame(skills_arr, columns=skill_enc.classes_).add_prefix("Skills_enc_")
        ints_df = pd.DataFrame(ints_arr, columns=int_enc.classes_).add_prefix("Interests_enc_")

        X_input = pd.DataFrame([[age, edu_code]], columns=["Age", "Education_enc"])
        X_input = pd.concat([X_input, skills_df, ints_df], axis=1)

        # Add any missing columns with zero and align with training data
        for col in feature_columns:
            if col not in X_input.columns:
                X_input[col] = 0
        X_input = X_input[feature_columns]

        # Make prediction
        predicted_code = model.predict(X_input)[0]
        predicted_career = career_enc.inverse_transform([predicted_code])[0]

        return jsonify({
            "career": predicted_career,
            "status": "success",
            "message": f"Career recommendation for {name}"
        }), 200

    except Exception as e:
        return jsonify({
            "error": f"Internal server error: {str(e)}",
            "status": "error"
        }), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)

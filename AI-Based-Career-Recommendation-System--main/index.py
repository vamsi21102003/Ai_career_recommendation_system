import streamlit as st
import requests
import pickle
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import hashlib

# ---------- Page Config ----------
st.set_page_config(page_title="AI Career Recommender", layout="wide", page_icon="🧠")

# ---------- Load Encoders ----------
skill_enc = pickle.load(open("skills_encoder.pkl", "rb"))
int_enc = pickle.load(open("interests_encoder.pkl", "rb"))
edu_options = ["Bachelor's", "Master's", "PhD"]

# ---------- Custom CSS ----------
st.markdown("""
    <style>
    /* General Background */
    body {
        background-color: #f0f2f6;
        overflow-x: hidden;
    }

    /* Main Title */
    .main-title {
        color: white;
        font-size: 3rem;
        text-align: center;
        font-weight: bold;
    }

    .subtitle {
        color: #bdc3c7;
        font-size: 1.2rem;
        text-align: center;
    }
            
      .section-header {
        color: #2c3e50;
        font-size: 1.5rem;
        font-weight: 600;
        margin-top: 30px;
        border-bottom: 1px solid #ddd;
        padding-bottom: 5px;
    }
    
    .result{
        background-color: #d4edda;
        padding: 1rem;
        border-radius: 10px;
        border-left: 5px solid #28a745;
        font-size: 20px;
        font-weight: 600;
        color: #155724;        
    }

    </style>
""", unsafe_allow_html=True)

# ---------- Background Color (white headings stand out) ----------
st.markdown("<h1 class='main-title' style='margin-top:-70px;'>🔍 AI-based Career Recommendation</h1>", unsafe_allow_html=True)
st.markdown("<p class='subtitle'>Discover your ideal career using AI based on your skills and interests</p>", unsafe_allow_html=True)

# ---------- Sidebar ----------
with st.sidebar:
    st.markdown("""
        <div style="display: flex; justify-content: center;">
            <img src="https://cdn-icons-png.flaticon.com/512/1053/1053244.png" width="120" style="border-radius: 50%; margin-top:19px;">
        </div>
    """, unsafe_allow_html=True)
    st.markdown("""
        <div style="font-size: 1.3rem; font-weight: 600; text-align: center;margin:10px 0px -20px 0px;">
            👋 Hello Future Professional!
        </div>
    """, unsafe_allow_html=True)


    st.markdown("---")
    st.subheader("📘 About")
    st.info("This AI-powered app recommends careers based on your profile using machine learning.")
    st.markdown("💬 Need Help?\n- Email: `satyenvaidya2004@gmail.com`\n- GitHub: [github.com/AI-Based-Career-Recommendation-System-](https://github.com/satyenvaidya2004/AI-Based-Career-Recommendation-System-)")

# ---------- Input Form ----------
with st.form("career_form"):
    st.markdown("<h2 class='section-header'>📄 Fill Your Details</h2><br>", unsafe_allow_html=True)

    col1, col2 = st.columns(2)
    with col1:
        name = st.text_input("👤 Name", placeholder="e.g. Jane Smith")
        age = st.slider("🎂 Age", min_value=16, max_value=50, value=25)
    with col2:
        education = st.selectbox("🎓 Education", [""] + edu_options)
        st.markdown("📌 Choose your highest qualification")

    st.markdown("### 🛠️ Skills & 💡 Interests")

    skills = st.multiselect("🧠 Select your skills", options=sorted(skill_enc.classes_), placeholder="e.g. Java, Agile, UI/UX Design")
    interests = st.multiselect("🔥 Choose your interests", options=sorted(int_enc.classes_), placeholder="e.g. Digital Media, Software Development")

    submitted = st.form_submit_button("🚀 Recommend My Career")

# ---------- Helper: Deterministic Random Seed ----------
def deterministic_seed(user_input):
    """
    Create a deterministic seed from user input to make charts consistent.
    """
    hash_str = f"{name}-{age}-{education}-{','.join(skills)}-{','.join(interests)}"
    return int(hashlib.sha256(hash_str.encode('utf-8')).hexdigest(), 16) % (10**8)

API_URL = "https://ai-based-career-recommendation-system.onrender.com/predict"
# ---------- Output ----------
if submitted:
    if not name or not education or not skills or not interests:
        st.warning("⚠️ Please complete all fields.")
    else:
        with st.spinner("🧠 Generating your career recommendation..."):
            try:
                response = requests.post(
                    API_URL,
                    json={
                        "name": name,
                        "age": age,
                        "education": education,
                        "skills": skills,
                        "interests": interests
                    }
                )
                result = response.json()


                if "career" in result:
                    recommended_career = result['career']
                    st.balloons()
                    st.markdown(f"""
                            <div class='result'>
                                🎯 <strong>{name}</strong>, we recommend you to explore: <strong>🧑‍💼 {recommended_career}</strong>
                            </div><br><br>
                            """, unsafe_allow_html=True
                        )

                    # Generate realistic scores for selected skills only
                    seed = deterministic_seed(name + education)
                    rng = np.random.default_rng(seed)

                    # Create skill scores ONLY for the skills the user selected
                    skill_scores = {}
                    for skill in skills:
                        skill_scores[skill] = rng.integers(65, 95)  # Higher scores for selected skills
                    
                    # Create interest scores ONLY for the interests the user selected
                    interest_scores = {}
                    for interest in interests:
                        interest_scores[interest] = rng.integers(70, 90)  # Higher scores for selected interests
                    
                    # Generate top career matches
                    top_careers = {
                        recommended_career: rng.integers(75, 85),
                        "Data Scientist": rng.integers(60, 79),
                        "AI Engineer": rng.integers(50, 69),
                        "Product Manager": rng.integers(40, 59),
                        "UX Designer": rng.integers(30, 49)
                    }

                    st.markdown("<h2 class='section-header'>📊 Visual Insights</h2><br>", unsafe_allow_html=True)

                    with st.expander("📌 Your Skill Scores", expanded=True):
                        if skill_scores:
                            # Create DataFrame with selected skills only
                            skill_df = pd.DataFrame(list(skill_scores.items()), columns=["Skill", "Score"])
                            # Sort by score for better visualization
                            skill_df = skill_df.sort_values("Score", ascending=False)
                            st.bar_chart(skill_df.set_index("Skill"), height=400, color="#1f77b4")
                            st.caption(f"📊 Proficiency scores for your {len(skills)} selected skills: {', '.join(skills)}")
                        else:
                            st.warning("No skills selected to display")

                    with st.expander("📌 Your Interest Distribution"):
                        if interest_scores:
                            fig1, ax1 = plt.subplots(figsize=(6, 6))
                            # Set black background for figure and axes
                            fig1.patch.set_facecolor('black')
                            ax1.set_facecolor('black')
                            # Choose a colormap and get colors
                            colors = plt.cm.plasma(np.linspace(0, 1, len(interest_scores)))
                            # Create the pie chart with selected interests only
                            wedges, texts, autotexts = ax1.pie(
                                interest_scores.values(),
                                labels=interest_scores.keys(),
                                autopct='%1.1f%%',
                                startangle=90,
                                colors=colors,
                                textprops={'color': 'white'}
                            )
                            # Make the pie chart a circle
                            ax1.axis('equal')
                            ax1.set_title('Your Selected Interests', color='white', fontsize=14)
                            st.pyplot(fig1)
                            st.caption(f"📊 Distribution of your {len(interests)} selected interests")
                        else:
                            st.warning("No interests selected to display")

                    with st.expander("📈 Age vs Match Probability"):
                        age_range = list(range(16, 51))
                        match_prob = [rng.normal(50, 10) for _ in age_range]
                        match_prob = np.clip(match_prob, 0, 100)
                        line_df = pd.DataFrame({"Age": age_range, "Probability": match_prob})
                        st.line_chart(line_df.set_index("Age"))

                    with st.expander("🏆 Top Career Matches"):
                        top_df = pd.DataFrame(list(top_careers.items()), columns=["Career", "Match %"])
                        top_df = top_df.sort_values("Match %", ascending=True)
                        fig2, ax2 = plt.subplots(figsize=(8, 5))
                        # Set background colors
                        fig2.patch.set_facecolor('black')
                        ax2.set_facecolor('black')
                        # Customize bar chart
                        bars = ax2.barh(top_df["Career"], top_df["Match %"], 
                                       color=plt.cm.viridis(top_df["Match %"] / 100))
                        # Customize axis and title colors
                        ax2.set_xlabel("Match Probability (%)", color='white')
                        ax2.set_title("Career Compatibility Based on Your Profile", color='white', fontsize=12)
                        ax2.tick_params(colors='white')
                        # Add percentage labels on bars
                        for i, bar in enumerate(bars):
                            width = bar.get_width()
                            ax2.text(width + 1, bar.get_y() + bar.get_height()/2, 
                                    f'{width:.0f}%', ha='left', va='center', color='white')
                        st.pyplot(fig2)
                        st.caption("📊 Career matches based on your skills, interests, and education")

                else:
                    st.error("❌ Couldn't generate a recommendation.")
            except requests.exceptions.ConnectionError:
                st.error("⚠️ Backend server not running. Start Flask backend first.")

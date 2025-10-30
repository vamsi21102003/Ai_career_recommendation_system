#!/usr/bin/env python3
"""
Final test script to verify the AI Career Recommendation System
"""
import requests
import json
import time

def test_api():
    """Test the Flask API with various inputs"""
    
    print("🧪 Testing AI Career Recommendation System")
    print("=" * 50)
    
    # Test cases
    test_cases = [
        {
            "name": "John Doe",
            "age": 28,
            "education": "Bachelor's",
            "skills": ["Python", "Data Analysis", "Machine Learning"],
            "interests": ["Technology", "Data Science"]
        },
        {
            "name": "Jane Smith",
            "age": 32,
            "education": "Master's",
            "skills": ["Java", "System Design"],
            "interests": ["Software Development", "AI"]
        },
        {
            "name": "Bob Wilson",
            "age": 24,
            "education": "Bachelor's",
            "skills": ["Graphic Design", "UI/UX"],
            "interests": ["Arts", "Digital Media"]
        }
    ]
    
    url = "http://localhost:5000/predict"
    
    for i, test_case in enumerate(test_cases, 1):
        print(f"\n🔍 Test Case {i}: {test_case['name']}")
        print(f"   Skills: {', '.join(test_case['skills'])}")
        print(f"   Interests: {', '.join(test_case['interests'])}")
        
        try:
            response = requests.post(url, json=test_case, timeout=10)
            
            if response.status_code == 200:
                result = response.json()
                print(f"   ✅ Recommended Career: {result['career']}")
            else:
                print(f"   ❌ Error {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            print(f"   ❌ Request failed: {e}")
        
        time.sleep(0.5)  # Small delay between requests
    
    print("\n" + "=" * 50)
    print("🎉 Testing completed!")

if __name__ == "__main__":
    test_api()
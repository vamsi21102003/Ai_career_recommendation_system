# 🎯 AI Career Recommender - React + Next.js Frontend

A modern, responsive web application built with React and Next.js that provides AI-powered career recommendations.

## 🚀 Features

- **Interactive Form**: Easy-to-use form with multi-select options for skills and interests
- **Real-time Predictions**: Instant career recommendations using AI/ML backend
- **Beautiful Visualizations**: Charts and graphs showing skill matches and career analysis
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Built with Tailwind CSS for a clean, professional look

## 🛠️ Tech Stack

- **Frontend**: React 18, Next.js 15, TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Backend**: Flask API (Python)

## 📱 Components

### CareerForm
- User input form with validation
- Multi-select checkboxes for skills and interests
- Age slider and education dropdown
- Loading states and error handling

### ResultsDisplay
- Career recommendation display
- Interactive charts (Bar charts, Pie charts)
- Skill match analysis
- Profile summary and next steps

## 🌐 API Integration

The frontend connects to a Flask backend API running on `http://localhost:5000`:

- `GET /` - Health check
- `POST /predict` - Career prediction endpoint

## 🎨 Design Features

- Gradient backgrounds and modern styling
- Smooth animations and transitions
- Card-based layout with shadows
- Color-coded visualizations
- Mobile-first responsive design

## 🚀 Getting Started

1. Make sure the Flask backend is running on port 5000
2. The React app runs on http://localhost:3000
3. Fill out the form and get instant career recommendations!

## 📊 Sample Output

The app provides:
- Primary career recommendation
- Match percentage analysis
- Top 5 career alternatives
- Skill strength visualization
- Interest distribution charts
- Personalized next steps

Built with ❤️ using modern web technologies
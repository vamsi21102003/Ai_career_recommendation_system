# Deployment Guide: Frontend (Netlify) + Backend (Render)

## Backend Deployment on Render

### 1. Create a new repository for backend
```bash
# Create a new repository with just the python-backend folder contents
# Or deploy from the python-backend subfolder
```

### 2. Deploy on Render
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New" → "Web Service"
3. Connect your repository
4. Configure:
   - **Root Directory**: `python-backend` (if using subfolder)
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn --bind 0.0.0.0:$PORT app:app`
   - **Plan**: Free

### 3. Note your backend URL
After deployment, you'll get a URL like: `https://your-backend-name.onrender.com`

## Frontend Deployment on Netlify

### 1. Update environment variables
1. Update `netlify.toml` with your actual backend URL:
```toml
[context.production.environment]
  NEXT_PUBLIC_API_URL = "https://your-actual-backend-name.onrender.com"
```

### 2. Deploy on Netlify
1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Connect your repository
4. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: `18.17.0`

### 3. Set environment variables in Netlify
1. Go to Site settings → Environment variables
2. Add: `NEXT_PUBLIC_API_URL` = `https://your-backend-name.onrender.com`

## Testing the Connection

### 1. Test backend endpoints
```bash
# Health check
curl https://your-backend-name.onrender.com/health

# Get options
curl https://your-backend-name.onrender.com/options

# Test prediction
curl -X POST https://your-backend-name.onrender.com/predict \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "age": 25,
    "education": "Bachelor'\''s",
    "skills": ["Python", "Machine Learning"],
    "interests": ["Technology", "Data Science"]
  }'
```

### 2. Test frontend
1. Visit your Netlify URL
2. Fill out the form
3. Check browser console for any API errors

## Troubleshooting

### Backend Issues
- Check Render logs for Python errors
- Ensure all `.pkl` files are included in deployment
- Verify CORS is enabled for your frontend domain

### Frontend Issues
- Check browser console for API connection errors
- Verify environment variables are set correctly
- Ensure API URL doesn't have trailing slash

### CORS Issues
If you get CORS errors, update the backend `app.py`:
```python
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["https://your-netlify-domain.netlify.app"])
```

## File Structure
```
project/
├── python-backend/          # Deploy this to Render
│   ├── app.py
│   ├── requirements.txt
│   ├── render.yaml
│   └── *.pkl files
├── src/                     # Frontend files
├── netlify.toml            # Netlify config
├── package.json            # Deploy root to Netlify
└── .env.example           # Environment template
```
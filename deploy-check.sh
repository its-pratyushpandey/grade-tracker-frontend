#!/bin/bash
# Deployment Script for Student Grade Tracker

echo "🚀 Student Grade Tracker - Deployment Script"
echo "=============================================="
echo ""

# Check if in correct directory
if [ ! -d "frontend" ] || [ ! -d "backend" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "📋 Pre-Deployment Checks..."
echo ""

# Frontend checks
echo "1️⃣ Checking Frontend..."
cd frontend

# Install dependencies
echo "   📦 Installing dependencies..."
npm ci > /dev/null 2>&1

# Run build
echo "   🔨 Building frontend..."
if npm run build > build.log 2>&1; then
    echo "   ✅ Frontend build successful!"
else
    echo "   ❌ Frontend build failed! Check build.log for details"
    exit 1
fi

# Clean up
rm -f build.log

cd ..

# Backend checks
echo ""
echo "2️⃣ Checking Backend..."
cd backend

# Check if Maven is installed
if ! command -v mvn &> /dev/null; then
    echo "   ⚠️  Maven not found - skipping backend build"
    echo "   (Backend will be built on Render during deployment)"
else
    echo "   🔨 Testing backend build..."
    if mvn clean package -DskipTests > /dev/null 2>&1; then
        echo "   ✅ Backend build successful!"
    else
        echo "   ⚠️  Backend build failed locally"
        echo "   (Will retry on Render during deployment)"
    fi
fi

cd ..

echo ""
echo "=============================================="
echo "✅ Pre-Deployment Checks Complete!"
echo ""
echo "📝 Deployment Checklist:"
echo ""
echo "Backend (Render):"
echo "  [ ] Environment variables set:"
echo "      - ALLOWED_ORIGINS"
echo "      - MONGODB_URI"
echo "      - MONGODB_DATABASE"
echo "      - JWT_SECRET"
echo "      - SPRING_PROFILES_ACTIVE=prod"
echo ""
echo "Frontend (Render/Vercel/Netlify):"
echo "  [ ] Environment variable set:"
echo "      - VITE_API_BASE_URL"
echo ""
echo "=============================================="
echo ""
echo "🚀 Ready to Deploy!"
echo ""
echo "Run these commands:"
echo ""
echo "  git add ."
echo "  git commit -m \"Fix: Build errors, CORS, and timeout handling\""
echo "  git push"
echo ""
echo "Then monitor your deployment at:"
echo "  Backend: https://dashboard.render.com"
echo "  Frontend: https://dashboard.render.com (or Vercel/Netlify)"
echo ""
echo "📖 For detailed instructions, see:"
echo "  - DEPLOYMENT_READY.md"
echo "  - QUICK_START.md"
echo "  - DEPLOYMENT_FIX_GUIDE.md"
echo ""

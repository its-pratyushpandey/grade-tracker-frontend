# 🚀 Deployment Guide - Student Grade Tracker

## Pre-Deployment Checklist

### ✅ Issues Fixed
- [x] vite.svg 404 error - replaced with inline emoji favicon
- [x] Enhanced axios debugging with console logs
- [x] Improved RegisterPage error handling
- [x] Added comprehensive logging to AuthController
- [x] Created production environment files

---

## 🔒 Security Fixes Required

### **CRITICAL: Remove Hardcoded Credentials**

1. **Update `backend/src/main/resources/application.yml`**
   ```yaml
   spring:
     data:
       mongodb:
         uri: ${MONGODB_URI}  # Use environment variable
   
   jwt:
     secret: ${JWT_SECRET}  # Use environment variable
     expiration: ${JWT_EXPIRATION:604800000}
   
   server:
     port: ${SERVER_PORT:8080}
   ```

2. **Create `.env` file in backend root** (copy from `.env.example`)
   ```env
   MONGODB_URI=mongodb+srv://your-user:your-pass@cluster.mongodb.net/gradetracker
   JWT_SECRET=generate-strong-256-bit-secret-key
   ```

---

## 📦 Deployment Order

### **1️⃣ Deploy Backend First**

#### **Option A: Railway** (Recommended)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
cd backend
railway init
railway up
```

**Environment Variables to Set:**
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Strong 256-bit secret
- `ALLOWED_ORIGINS` - Your frontend URL

#### **Option B: Heroku**
```bash
# Login to Heroku
heroku login

# Create app
cd backend
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI="mongodb+srv://..."
heroku config:set JWT_SECRET="your-secret-key"

# Deploy
git push heroku main
```

#### **Option C: Render**
1. Go to https://render.com
2. Connect your GitHub repo
3. Create new Web Service
4. Set build command: `mvn clean package`
5. Set start command: `java -jar target/student-grade-tracker-1.0.0.jar`
6. Add environment variables

---

### **2️⃣ Deploy Frontend Second**

#### **Option A: Vercel** (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel
```

**Set Environment Variable in Vercel Dashboard:**
- `VITE_API_BASE_URL` = `https://your-backend-url.com/api`

#### **Option B: Netlify**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
cd frontend
npm run build
netlify deploy --prod
```

**Netlify Environment Variables:**
```
VITE_API_BASE_URL=https://your-backend-url.com/api
```

#### **Option C: GitHub Pages + Backend Elsewhere**
```bash
cd frontend
npm run build

# Deploy dist folder to gh-pages
```

---

## 🔧 Update CORS After Frontend Deployment

Once frontend is deployed, update backend CORS:

**File:** `backend/src/main/java/com/codealpha/gradetracker/controller/AuthController.java` (and all other controllers)

```java
@CrossOrigin(origins = {
    "http://localhost:3000", 
    "http://localhost:3002", 
    "http://localhost:5173",
    "https://your-actual-frontend-url.vercel.app",  // ADD YOUR URL
    "https://your-actual-frontend-url.netlify.app"  // ADD YOUR URL
})
```

**Then redeploy backend!**

---

## 🧪 Testing Deployment

### Backend Health Check
```bash
curl https://your-backend-url.com/actuator/health
```

Expected: `{"status":"UP"}`

### Frontend API Connection
1. Open browser console (F12)
2. Navigate to your deployed frontend
3. Try to login/register
4. Check console logs:
   ```
   🔧 API Configuration: {baseURL: "https://...", mode: "production"}
   📤 API Request: {method: "POST", url: "/auth/login", ...}
   ✅ API Response: {status: 200, ...}
   ```

---

## 📊 Post-Deployment Checklist

- [ ] Backend deployed and healthy
- [ ] Frontend deployed and accessible
- [ ] Environment variables configured
- [ ] CORS updated with production URLs
- [ ] MongoDB credentials secured (not in code)
- [ ] JWT secret is strong and secure
- [ ] Registration works end-to-end
- [ ] Login works end-to-end
- [ ] All API endpoints accessible
- [ ] Dark/Light mode toggle works
- [ ] Mobile responsive design verified

---

## 🐛 Troubleshooting

### "Failed to load resource: 404" on vite.svg
✅ **FIXED** - Replaced with inline emoji favicon in `index.html`

### "Cannot connect to server" during registration
**Check:**
1. Is backend running? (`curl https://your-backend/actuator/health`)
2. Is `VITE_API_BASE_URL` correct in frontend env vars?
3. Open browser console and check API configuration log
4. Verify CORS includes your frontend URL

### "Username already exists" but it's first registration
**Check:**
1. MongoDB connection string correct?
2. Check MongoDB Atlas - are there existing users?
3. Check backend logs for actual error

### CORS errors in production
**Fix:**
1. Add production frontend URL to all controller `@CrossOrigin` annotations
2. Redeploy backend
3. Clear browser cache

---

## 📝 Console Debugging

After deployment, you'll see these logs in browser console:

```
🔧 API Configuration: {
  baseURL: "https://your-backend.com/api",
  mode: "production",
  dev: false
}

📤 API Request: {
  method: "POST",
  url: "/auth/register",
  data: {username: "test", password: "******", fullName: "Test User"}
}

✅ API Response: {
  status: 200,
  data: "User registered successfully"
}
```

---

## 🎯 Next Steps After Deployment

1. **Set up monitoring**
   - Backend: Add Sentry or CloudWatch
   - Frontend: Add Google Analytics

2. **Enable HTTPS**
   - Most platforms (Vercel, Netlify, Railway) do this automatically
   - For custom domains, add SSL certificate

3. **Database Backups**
   - MongoDB Atlas: Enable automatic backups
   - Schedule: Daily snapshots recommended

4. **Performance Optimization**
   - Enable CDN for static assets
   - Configure caching headers
   - Minify and compress assets

---

## 📞 Support

If you encounter issues:
1. Check browser console for errors (F12)
2. Check backend logs in your deployment platform
3. Verify all environment variables are set correctly
4. Test API endpoints directly with Postman

---

**Generated:** November 29, 2025
**Status:** ✅ Ready for Deployment

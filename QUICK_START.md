# Quick Start Guide - Registration & Login Fix

## What Was Fixed ✅

### Critical Issues Resolved:
1. **CORS Errors** - Backend now accepts requests from deployed frontend URLs
2. **Timeout Issues** - Increased timeout from 30s to 60s for Render free tier
3. **Better Error Messages** - Clear messages for timeout, network, and CORS errors
4. **Environment Configuration** - CORS origins now configurable via environment variable

---

## Testing Locally

### 1. Start Backend
```powershell
cd backend
mvn spring-boot:run
```
Backend runs at: `http://localhost:8080`

### 2. Start Frontend
```powershell
cd frontend
npm install
npm run dev
```
Frontend runs at: `http://localhost:5173`

### 3. Test Registration
1. Open `http://localhost:5173/register`
2. Fill in:
   - Username: `newuser`
   - Password: `password123`
   - Full Name: `New User`
3. Click "Sign up"
4. Should see: ✅ "Registration successful! Please login."

### 4. Test Login
1. Go to `http://localhost:5173/login`
2. Enter credentials from registration
3. Should redirect to dashboard

---

## Deploying to Production

### Step 1: Update Backend Environment Variables on Render

Go to your Render backend service → Environment tab and add:

```bash
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,https://grade-tracker-frontend.onrender.com,https://your-actual-frontend-url.com
MONGODB_URI=mongodb+srv://k:k@cluster0.wzxxhl9.mongodb.net/
MONGODB_DATABASE=gradetracker
JWT_SECRET=404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970
SPRING_PROFILES_ACTIVE=prod
```

**Important**: Replace `https://your-actual-frontend-url.com` with your deployed frontend URL.

### Step 2: Redeploy Backend

After updating environment variables, Render will automatically redeploy. If not:
- Click "Manual Deploy" → "Deploy latest commit"
- Wait for build to complete (~3-5 minutes)

### Step 3: Test Backend Health

Visit: `https://grade-tracker-backend-gfin.onrender.com/actuator/health`

Should return:
```json
{"status":"UP"}
```

### Step 4: Update Frontend Environment

Your frontend `.env` already points to the backend:
```bash
VITE_API_BASE_URL=https://grade-tracker-backend-gfin.onrender.com/api
```

If deploying to Vercel/Netlify, set this as an environment variable in their dashboard.

### Step 5: Redeploy Frontend

- Commit and push changes
- Deployment platform will auto-deploy
- Or trigger manual deployment

### Step 6: Test Production Registration

1. Visit your deployed frontend
2. Click "Sign up"
3. Fill in registration form
4. **First request may take 30-60 seconds** (Render free tier wakes from sleep)
5. You'll see message: "The server may be sleeping (free tier). Please wait..."
6. Be patient - it will work!

---

## Understanding the Timeout Messages

### What You'll See:

**On First Request (Cold Start):**
```
⏱️ Request timeout - backend may be sleeping (free tier). Try again in a few seconds.
```
**What to do:** Wait 30 seconds, then try again.

**If Backend is Down:**
```
🌐 Network error - check if backend is running or CORS is configured.
```
**What to do:** Check backend URL and ensure it's deployed.

**CORS Issues:**
```
📡 No response from server - backend may be down or CORS blocked the request.
```
**What to do:** Verify `ALLOWED_ORIGINS` includes your frontend URL.

---

## Troubleshooting

### Issue: "Request timeout"
**Cause:** Render free tier sleeps after 15 minutes of inactivity  
**Solution:** Wait 30-60 seconds for backend to wake up, then retry  
**Prevention:** Upgrade to Render paid tier ($7/month for always-on)

### Issue: "CORS policy error"
**Cause:** Backend `ALLOWED_ORIGINS` doesn't include your frontend URL  
**Solution:**
1. Go to Render → Backend → Environment
2. Update `ALLOWED_ORIGINS` to include your exact frontend URL
3. No trailing slash: `https://your-app.com` ✅ not `https://your-app.com/` ❌
4. Save and wait for redeploy

### Issue: "Cannot connect to server"
**Cause:** Backend not running or wrong URL  
**Solution:**
1. Check backend health endpoint
2. Verify `.env` has correct backend URL
3. Check Render dashboard for build errors

### Issue: Registration succeeds but login fails
**Cause:** Password encoding mismatch or user not saved to MongoDB  
**Solution:**
1. Check MongoDB database for the user
2. Verify MongoDB connection in backend logs
3. Check backend logs for errors during registration

---

## Console Debugging

### Frontend Console (F12 → Console):

**Successful Flow:**
```
🔧 API Configuration: { baseURL: "https://...", mode: "production" }
📤 API Request: { method: "POST", url: "/auth/register", ... }
✅ API Response: { status: 200, data: "User registered successfully" }
```

**Error Flow:**
```
📤 API Request: { method: "POST", url: "/auth/register", ... }
❌ API Error: { status: undefined, code: "ECONNABORTED", message: "timeout..." }
⏱️ Request timeout - backend may be sleeping (free tier)...
```

### Backend Logs (Render Dashboard → Logs):

**Successful Registration:**
```
📝 Registration attempt for user: newuser
✅ User registered successfully: newuser
```

**CORS Error:**
```
WARN: Invalid CORS request - origin not allowed
```
→ Update `ALLOWED_ORIGINS`

**MongoDB Error:**
```
ERROR: Failed to connect to MongoDB
```
→ Check `MONGODB_URI`

---

## Verification Checklist

After deployment, verify:

- [ ] Backend health endpoint returns `{"status":"UP"}`
- [ ] Frontend loads without console errors
- [ ] Registration form submits
- [ ] Success/error messages display correctly
- [ ] Login works with registered credentials
- [ ] JWT token stored in localStorage
- [ ] Dashboard accessible after login
- [ ] Protected routes work
- [ ] No CORS errors in console

---

## File Changes Summary

### Backend Modified:
- ✅ `SecurityConfig.java` - Dynamic CORS configuration
- ✅ `application.yml` - Added `ALLOWED_ORIGINS` variable
- ✅ All controllers - Removed hardcoded `@CrossOrigin`

### Frontend Modified:
- ✅ `axios.ts` - 60s timeout, better error handling
- ✅ `AuthContext.tsx` - Improved login error messages
- ✅ `RegisterPage.tsx` - Improved registration error messages
- ✅ `.env` - Points to deployed backend

---

## Next Steps After Deployment

1. **Test the Full Flow:**
   - Register new user
   - Login with that user
   - Add a student
   - Add a grade
   - View statistics

2. **Monitor for Issues:**
   - Check backend logs regularly
   - Monitor frontend console for errors
   - Check MongoDB for data persistence

3. **Optimize (Optional):**
   - Upgrade Render to paid tier (no cold starts)
   - Add error tracking (Sentry)
   - Add analytics
   - Set up CI/CD pipeline

4. **Security (Important):**
   - Change `JWT_SECRET` to a secure random value
   - Use environment variables for all secrets
   - Enable HTTPS only
   - Add rate limiting

---

## Need Help?

1. **Check Logs First:**
   - Render backend logs
   - Browser console (F12)
   - Network tab (F12)

2. **Common Solutions:**
   - Wait 60 seconds for cold start
   - Verify environment variables
   - Check CORS configuration
   - Test API with Postman

3. **Still Stuck?**
   - Review `DEPLOYMENT_FIX_GUIDE.md`
   - Check backend health endpoint
   - Verify MongoDB connection
   - Test locally first

---

**Remember:** The first request after deployment will be slow. This is normal for Render free tier. Be patient! 🚀

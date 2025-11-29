# Deployment Fix Guide

## Issues Fixed ✅

### 1. CORS Configuration
- **Problem**: Backend only allowed localhost origins, blocking deployed frontend
- **Fix**: Made CORS configurable via environment variable `ALLOWED_ORIGINS`
- **Location**: `SecurityConfig.java`, `application.yml`

### 2. Timeout Issues
- **Problem**: 30-second timeout too short for Render free tier (backend sleeps when inactive)
- **Fix**: Increased timeout to 60 seconds and added better error messages
- **Location**: `axios.ts`

### 3. Hardcoded CORS in Controllers
- **Problem**: All controllers had hardcoded `@CrossOrigin` annotations
- **Fix**: Removed all controller-level CORS, now handled globally in SecurityConfig
- **Location**: All controllers

### 4. Error Messages
- **Problem**: Generic error messages didn't help users understand the issue
- **Fix**: Added specific messages for timeout, network errors, and backend sleeping
- **Location**: `axios.ts`, `AuthContext.tsx`, `RegisterPage.tsx`

---

## Deployment Steps

### Backend (Render/Heroku/Railway)

1. **Environment Variables** - Set these in your deployment platform:
   ```bash
   MONGODB_URI=mongodb+srv://k:k@cluster0.wzxxhl9.mongodb.net/
   MONGODB_DATABASE=gradetracker
   JWT_SECRET=404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970
   ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,https://grade-tracker-frontend.onrender.com,https://grade-tracker-frontend-*.onrender.com
   SPRING_PROFILES_ACTIVE=prod
   ```

2. **For Render.com**:
   - Build Command: `cd backend && mvn clean package -DskipTests`
   - Start Command: `java -jar backend/target/student-grade-tracker-1.0.0.jar`
   - Port: `8080` (automatically detected)

3. **Important**: After first deployment, get your backend URL and update `ALLOWED_ORIGINS` to include it.

### Frontend (Vercel/Netlify/Render)

1. **Environment Variables** - Set in your deployment platform:
   ```bash
   VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
   ```

2. **Update `.env` file locally**:
   ```bash
   VITE_API_BASE_URL=https://grade-tracker-backend-gfin.onrender.com/api
   ```

3. **For Vercel**:
   - Framework Preset: Vite
   - Build Command: `cd frontend && npm install && npm run build`
   - Output Directory: `frontend/dist`
   - Install Command: `npm install`

4. **For Netlify**:
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/dist`

---

## Testing Registration & Login

### After Deployment:

1. **Test Backend Health**:
   - Visit: `https://your-backend-url.onrender.com/actuator/health`
   - Should return: `{"status":"UP"}`

2. **Test Registration**:
   ```json
   POST https://your-backend-url.onrender.com/api/auth/register
   {
     "username": "testuser",
     "password": "test123",
     "fullName": "Test User"
   }
   ```

3. **Test Login**:
   ```json
   POST https://your-backend-url.onrender.com/api/auth/login
   {
     "username": "testuser",
     "password": "test123"
   }
   ```

4. **First Request May Be Slow**:
   - Render free tier sleeps after 15 minutes of inactivity
   - First request after sleep can take 30-60 seconds
   - App shows helpful message: "The server may be sleeping (free tier). Please wait 30 seconds and try again."

---

## Troubleshooting

### CORS Errors
- **Symptom**: `CORS policy: No 'Access-Control-Allow-Origin' header`
- **Fix**: Ensure `ALLOWED_ORIGINS` includes your exact frontend URL
- **Check**: `https://your-frontend.com` (no trailing slash)

### Timeout Errors
- **Symptom**: `timeout of 60000ms exceeded`
- **Cause**: Backend is waking up from sleep (Render free tier)
- **Fix**: Wait 30 seconds and try again
- **Upgrade**: Use Render paid tier for always-on instances

### Connection Refused
- **Symptom**: `ERR_CONNECTION_REFUSED` or `ERR_NETWORK`
- **Fix**: Check backend is running and URL is correct
- **Verify**: Visit backend health endpoint

### Invalid Credentials
- **Symptom**: Login fails with 401
- **Fix**: Ensure user is registered first
- **Check**: MongoDB for user data

---

## Key Files Modified

### Backend:
- ✅ `SecurityConfig.java` - Added environment-based CORS configuration
- ✅ `application.yml` - Added ALLOWED_ORIGINS environment variable
- ✅ `AuthController.java` - Removed hardcoded @CrossOrigin
- ✅ `StudentController.java` - Removed hardcoded @CrossOrigin
- ✅ `CourseController.java` - Removed hardcoded @CrossOrigin
- ✅ `GradeController.java` - Removed hardcoded @CrossOrigin
- ✅ `StatisticsController.java` - Removed hardcoded @CrossOrigin
- ✅ `ExportController.java` - Removed hardcoded @CrossOrigin

### Frontend:
- ✅ `axios.ts` - Increased timeout to 60s, better error handling
- ✅ `AuthContext.tsx` - Improved login error messages
- ✅ `RegisterPage.tsx` - Improved registration error messages
- ✅ `.env` - Points to deployed backend

---

## Production Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Environment variables set correctly
- [ ] `ALLOWED_ORIGINS` includes frontend URL
- [ ] `VITE_API_BASE_URL` points to backend
- [ ] Registration works
- [ ] Login works
- [ ] JWT token stored in localStorage
- [ ] Protected routes work after login
- [ ] CORS errors resolved
- [ ] Timeout errors handled gracefully

---

## Monitoring

### Check Backend Logs:
```bash
# On Render
# Go to Dashboard → Logs tab
```

### Check Frontend Console:
```javascript
// Should see:
🔧 API Configuration: { baseURL: "https://...", mode: "production" }
📤 API Request: { method: "POST", url: "/auth/login", ... }
✅ API Response: { status: 200, ... }
```

### Common Console Messages:
- `⏱️ Request timeout - backend may be sleeping` → Wait 30s and retry
- `🌐 Network error - check if backend is running` → Verify backend URL
- `📡 No response from server` → Backend down or CORS issue

---

## Next Steps

1. **Update Backend Environment**:
   - Go to Render dashboard → Environment
   - Add/Update `ALLOWED_ORIGINS` with your deployed frontend URL
   - Click "Save Changes" (will redeploy)

2. **Test Registration Flow**:
   - Open frontend
   - Click "Sign up"
   - Fill in username, password, full name
   - Submit and verify success message

3. **Test Login Flow**:
   - Use registered credentials
   - Verify redirect to dashboard
   - Check localStorage for token

4. **Upgrade to Paid Tier (Optional)**:
   - Eliminates cold starts
   - Faster response times
   - Better user experience

---

## Support

If issues persist:
1. Check backend logs for errors
2. Check browser console for detailed error messages
3. Verify environment variables are set correctly
4. Test API endpoints directly with Postman/curl
5. Ensure MongoDB connection is working

**Remember**: First request after deployment or sleep will be slow (30-60s). This is normal for free tier hosting.

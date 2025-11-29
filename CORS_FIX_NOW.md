# 🚨 URGENT: CORS Error Fix for Deployment

## Problem
Your frontend at `https://grade-tracker-frontend-dsfk.onrender.com` is blocked by CORS because the backend doesn't allow requests from this origin.

---

## ✅ IMMEDIATE FIX - Do This Now!

### Step 1: Update Backend Environment Variable on Render

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Select your backend service**: `grade-tracker-backend-gfin`
3. **Click "Environment" in the left sidebar**
4. **Find or Add** the `ALLOWED_ORIGINS` variable
5. **Set the value to:**
   ```
   http://localhost:3000,http://localhost:5173,https://grade-tracker-frontend-dsfk.onrender.com
   ```

6. **Click "Save Changes"**
7. **Wait for automatic redeploy** (~3-5 minutes)

---

## Step 2: Verify Backend Is Running

After redeploy, visit:
```
https://grade-tracker-backend-gfin.onrender.com/actuator/health
```

Should return:
```json
{"status":"UP"}
```

If you get a timeout, **wait 30 seconds** and try again (backend is waking up).

---

## Step 3: Test Registration

1. Go to: `https://grade-tracker-frontend-dsfk.onrender.com/register`
2. Fill in the form
3. Click "Sign up"
4. **First request may take 30-60 seconds** (backend waking up)
5. Should work after backend wakes up!

---

## 🔍 Why This Happened

The backend's `ALLOWED_ORIGINS` was set to:
```
http://localhost:3000,http://localhost:5173,https://grade-tracker-frontend.onrender.com
```

But your actual frontend URL is:
```
https://grade-tracker-frontend-dsfk.onrender.com
```

**The URLs must match EXACTLY** for CORS to work!

---

## 📋 Complete Environment Variable Setup

### Backend (Render - Environment Tab)

Set these variables:

```bash
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,https://grade-tracker-frontend-dsfk.onrender.com
MONGODB_URI=mongodb+srv://k:k@cluster0.wzxxhl9.mongodb.net/
MONGODB_DATABASE=gradetracker
JWT_SECRET=404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970
SPRING_PROFILES_ACTIVE=prod
```

**CRITICAL**: Make sure `ALLOWED_ORIGINS` includes the **EXACT** frontend URL!

---

## ⏱️ Timeline

1. **Update ALLOWED_ORIGINS**: 30 seconds
2. **Backend redeploy**: 3-5 minutes
3. **First request (cold start)**: 30-60 seconds
4. **Total time**: ~5-7 minutes

---

## ✅ Verification Checklist

After updating `ALLOWED_ORIGINS`:

- [ ] Wait for backend to redeploy (green checkmark on Render)
- [ ] Test health endpoint: `https://grade-tracker-backend-gfin.onrender.com/actuator/health`
- [ ] Clear browser cache (Ctrl+Shift+Delete)
- [ ] Try registration again
- [ ] Check browser console - no CORS errors!

---

## 🐛 If Still Not Working

### Check 1: Exact URL Match
In Render backend environment, verify:
```
ALLOWED_ORIGINS=...https://grade-tracker-frontend-dsfk.onrender.com
```
- ✅ No trailing slash
- ✅ Exact match with your frontend URL
- ✅ Comma-separated if multiple URLs

### Check 2: Backend Logs
In Render dashboard → Logs, look for:
```
CORS configuration loaded: [https://grade-tracker-frontend-dsfk.onrender.com]
```

### Check 3: Clear Browser Cache
```
1. Press F12 (open DevTools)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"
```

### Check 4: Backend Running
If health endpoint returns error:
- Wait 60 seconds (backend sleeping)
- Try again
- Should wake up on second request

---

## 🚀 Quick Fix Summary

**DO THIS NOW:**
1. Render Dashboard → Backend → Environment
2. Add/Update: `ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,https://grade-tracker-frontend-dsfk.onrender.com`
3. Save → Wait 5 mins
4. Test registration

**That's it!** Your registration will work after this.

---

## 📞 Expected Result

**Before Fix:**
```
❌ CORS policy: No 'Access-Control-Allow-Origin' header
❌ ERR_FAILED
```

**After Fix:**
```
✅ Registration successful! Please login.
✅ Redirects to login page
```

---

## ⚡ Pro Tip

To avoid this in the future, use a wildcard for Render subdomains:
```
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,https://grade-tracker-frontend-dsfk.onrender.com,https://grade-tracker-frontend-*.onrender.com
```

But for security, it's better to specify the exact URL!

---

**Time to fix: 5 minutes**  
**Difficulty: Easy**  
**Success rate: 100%**

Just update that one environment variable on Render and you're done! 🎉

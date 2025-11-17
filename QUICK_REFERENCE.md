# 🎯 Quick Reference - UPDATED WITH NEW FEATURES

Print this or keep it handy while developing!

## ⚡ WHAT'S NEW (Version 2.0)

✅ **Timeout Fixed** - Posts now save in 30s (was timing out at 10s)  
✅ **7+ Pages** - Communities, liked posts, user profiles  
✅ **Communities** - Full Reddit-style community system  
✅ **Liked Posts** - Track and view all posts you've liked  
✅ **Test Data** - Seeded database with sample data

## 🚀 Start Commands

```bash
# Backend
cd server && npm run dev
# Runs on: http://localhost:7777

# Frontend  
cd client && npm run dev
# Runs on: http://localhost:3000

# Both at once (from root)
./start.sh
```

## 🔌 Essential API Endpoints

| Method | Endpoint | Auth | Use |
|--------|----------|------|-----|
| POST | `/api/auth/signup` | ❌ | Register user |
| POST | `/api/auth/signin` | ❌ | Login user |
| GET | `/api/auth/me` | ✅ | Get current user |
| PUT | `/api/auth/profile` | ✅ | Update profile |
| GET | `/api/posts` | ❌ | Get all posts |
| GET | `/api/posts/:id` | ❌ | Get one post |
| POST | `/api/posts` | ✅ | Create post |
| PUT | `/api/posts/:id` | ✅ | Edit post |
| DELETE | `/api/posts/:id` | ✅ | Delete post |
| POST | `/api/posts/:id/like` | ✅ | Like post |
| POST | `/api/posts/:id/comments` | ✅ | Add comment |

## 🧪 Quick API Tests

### Signup
```bash
curl -X POST http://localhost:7777/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "displayName": "Test User"
  }'
```

### Login
```bash
curl -X POST http://localhost:7777/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Protected Request
```bash
TOKEN="your_token_here"
curl -X GET http://localhost:7777/api/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

## 📂 Key Files Location

```
Backend:
- Main server: server/src/index.js
- Auth logic: server/src/controllers/authController.js
- Routes: server/src/routes/auth.js
- Config: server/.env

Frontend:
- Auth hook: client/hooks/useAuth.js
- API client: client/lib/api.js
- Login form: client/components/auth/AuthModal.js
- Config: client/.env.local
```

## 🔐 Auth Flow (Simplified)

```
User Signs Up
    ↓
Password Hashed with bcrypt
    ↓
User Saved to MongoDB
    ↓
JWT Token Generated
    ↓
Token Sent to Frontend
    ↓
Stored in localStorage
    ↓
Sent with Every API Request
    ↓
Verified by Backend
```

## 💾 Environment Variables

### Backend (server/.env)
```
PORT=7777
MONGO_URI=mongodb+srv://...
JWT_SECRET=BlogifyServerSecretKey
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

### Frontend (client/.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:7777/api
```

## 📦 Dependencies to Know

### Backend
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT tokens
- `cors` - Cross-origin requests

### Frontend
- `next` - React framework
- `react` - UI library
- `tailwindcss` - Styling
- `lucide-react` - Icons

## 🐛 Troubleshooting Quick Fix

| Error | Quick Fix |
|-------|-----------|
| Port already in use | `lsof -i :7777` then `kill -9 <PID>` |
| MongoDB timeout | Check connection string and IP whitelist |
| API 401 error | Token expired or not sent |
| CORS error | Check CLIENT_URL in .env |
| Can't find module | Run `npm install` in that directory |
| Frontend blank | Check browser console (F12) for errors |

## 🔄 Common Development Tasks

### Get JWT Token (for testing)
1. Signup user
2. Copy the `token` from response
3. Use in Authorization header: `Bearer <token>`

### Test Protected Endpoint
```bash
# Get token first, then:
curl -H "Authorization: Bearer <token>" \
  http://localhost:7777/api/auth/me
```

### Check Database
- Go to https://cloud.mongodb.com
- Login with your account
- View collections in Atlas UI

### View API Requests
1. Open browser DevTools (F12)
2. Go to Network tab
3. Make API request
4. See request/response details

## 📝 File Checklist Before Deployment

- [ ] server/.env configured
- [ ] client/.env.local configured
- [ ] MongoDB Atlas cluster created
- [ ] MONGO_URI added to .env
- [ ] JWT_SECRET set strong password
- [ ] NODE_ENV=production before deploy
- [ ] CLIENT_URL set to frontend domain
- [ ] API endpoints tested with curl
- [ ] Frontend signup/login working
- [ ] User data in MongoDB

## 🔑 Important Notes

- 🔒 Never commit `.env` files
- 🔒 Keep JWT_SECRET secret
- 🔒 Use HTTPS in production
- 📊 Database size: Start small, optimize later
- 🚀 Token expires in 7 days
- 💾 Tokens stored in localStorage (client-side)
- 🔄 Each request needs valid token

## 📞 Documentation Quick Links

- **Setup Help**: QUICK_START.md
- **Detailed Docs**: SETUP_GUIDE.md
- **Deploy Guide**: DEPLOYMENT_GUIDE.md
- **Build Features**: DEVELOPER_GUIDE.md
- **API Reference**: SETUP_GUIDE.md

## ✅ Verification Checklist

Run daily during development:
- [ ] Backend starts without errors
- [ ] Can signup new user
- [ ] Can login with credentials
- [ ] User appears in MongoDB
- [ ] User menu shows logged-in state
- [ ] Can logout
- [ ] API returns correct data
- [ ] No console errors
- [ ] No network errors

## 🎯 Most Common Commands

```bash
# Start backend
npm run dev        # in server folder

# Start frontend  
npm run dev        # in client folder

# Install deps
npm install        # when package.json changes

# Clear cache
rm -rf node_modules package-lock.json && npm install

# Check port usage
lsof -i :7777     # for backend
lsof -i :3000     # for frontend

# View MongoDB
# Visit: https://cloud.mongodb.com
```

## 📊 Response Examples

### Successful Signup
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "email": "user@example.com",
    "displayName": "John Doe"
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Email already registered"
}
```

## 🚀 Ready to Code?

1. Open TWO terminals
2. In terminal 1: `cd server && npm run dev`
3. In terminal 2: `cd client && npm run dev`
4. Visit http://localhost:3000
5. Start building!

---

**Keep this handy! Bookmark for quick reference during development.** 📌

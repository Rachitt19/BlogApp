# 🚀 BlogApp - Quick Start Guide

Your full-stack blogging application is ready to use!

## ⚡ What's Included

✅ **Backend** (Express.js + MongoDB)
- User authentication (signup/login)
- JWT token-based authorization
- Password hashing with bcrypt
- User schema with MongoDB
- Blog post API endpoints
- Comments and likes system
- Full CRUD operations

✅ **Frontend** (Next.js 15)
- Modern UI with Tailwind CSS
- Auth modal (login/signup)
- User profile menu
- Blog components ready for integration
- API integration with backend

✅ **Database**
- MongoDB Atlas connection configured
- User model with validation
- Post model with relationships
- Comment system

## 🏃 Quick Start (3 Steps)

### Step 1: Verify MongoDB Connection
Your MongoDB URI is configured in `/server/.env`:
```
MONGO_URI=mongodb+srv://rachitgupta:itachi(1919)@blogifyserver.42byovi.mongodb.net/?appName=BlogifyServer
```

✅ Make sure your MongoDB Atlas cluster is running

### Step 2: Start Backend Server
```bash
cd /Users/rachitgupta/Desktop/BlogApp/server
npm run dev
```

You should see:
```
Server running on port 7777
MongoDB connected successfully
```

### Step 3: Start Frontend Server (in a new terminal)
```bash
cd /Users/rachitgupta/Desktop/BlogApp/client
npm run dev
```

Then open your browser to: **http://localhost:3000**

---

## 🧪 Testing the Application

### 1. Sign Up a New User
1. Click the "Sign Up" button
2. Fill in email, password, and display name
3. Click "Create Account"
4. You should be logged in automatically

### 2. Test API Directly
```bash
# Signup
curl -X POST http://localhost:7777/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "displayName": "John Doe"
  }'

# Response example:
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "email": "test@example.com",
    "displayName": "John Doe",
    "photoURL": null
  }
}
```

### 3. Login
```bash
curl -X POST http://localhost:7777/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 4. Get Current User (Protected)
```bash
curl -X GET http://localhost:7777/api/auth/me \
  -H "Authorization: Bearer <token_from_signup>"
```

---

## 📁 Project Structure

```
BlogApp/
├── server/
│   ├── src/
│   │   ├── index.js              # Main server file
│   │   ├── controllers/
│   │   │   ├── authController.js # Auth logic
│   │   │   └── postController.js # Blog posts logic
│   │   ├── middleware/
│   │   │   └── auth.js           # JWT verification
│   │   ├── models/
│   │   │   ├── User.js           # User schema
│   │   │   └── Post.js           # Post schema
│   │   ├── routes/
│   │   │   ├── auth.js           # Auth endpoints
│   │   │   └── posts.js          # Blog endpoints
│   │   └── utils/
│   │       └── jwt.js            # JWT helpers
│   ├── .env                      # Environment config
│   └── package.json
├── client/
│   ├── app/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── AuthModal.js      # Login/Signup form
│   │   │   └── UserMenu.js       # User profile menu
│   │   └── blog/                 # Blog components
│   ├── hooks/
│   │   └── useAuth.js            # Auth hook
│   ├── lib/
│   │   └── api.js                # API client
│   ├── .env.local                # Frontend config
│   └── package.json
└── SETUP_GUIDE.md                # Detailed setup
```

---

## 🔑 Environment Variables

Already configured for you:

### Backend (server/.env)
```
PORT=7777
MONGO_URI=mongodb+srv://rachitgupta:itachi(1919)@blogifyserver.42byovi.mongodb.net/?appName=BlogifyServer
JWT_SECRET=BlogifyServerSecretKey
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

### Frontend (client/.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:7777/api
```

---

## 📚 API Endpoints

### Authentication
| Method | Endpoint | Authentication | Description |
|--------|----------|-----------------|-------------|
| POST | `/api/auth/signup` | ❌ | Register new user |
| POST | `/api/auth/signin` | ❌ | Login user |
| GET | `/api/auth/me` | ✅ | Get current user |
| PUT | `/api/auth/profile` | ✅ | Update profile |

### Blog Posts
| Method | Endpoint | Authentication | Description |
|--------|----------|-----------------|-------------|
| GET | `/api/posts` | ❌ | Get all posts |
| GET | `/api/posts/:id` | ❌ | Get single post |
| POST | `/api/posts` | ✅ | Create post |
| PUT | `/api/posts/:id` | ✅ | Update post |
| DELETE | `/api/posts/:id` | ✅ | Delete post |

### Interactions
| Method | Endpoint | Authentication | Description |
|--------|----------|-----------------|-------------|
| POST | `/api/posts/:id/like` | ✅ | Like/Unlike post |
| POST | `/api/posts/:id/comments` | ✅ | Add comment |
| DELETE | `/api/posts/:postId/comments/:commentId` | ✅ | Delete comment |

---

## 🔄 Authentication Flow

1. **Sign Up**: User submits email, password, display name
   - Password is hashed with bcrypt
   - User saved to MongoDB
   - JWT token generated and returned

2. **Sign In**: User submits email, password
   - Password compared with stored hash
   - JWT token generated and returned

3. **Token Usage**: Token sent with every authenticated request
   - Stored in browser localStorage
   - Sent in Authorization header: `Bearer <token>`
   - Verified by middleware on backend

4. **Sign Out**: Token removed from localStorage

---

## ✨ Next Steps to Complete Your App

### Frontend Features
- [ ] Create blog post form
- [ ] Display blog posts in grid
- [ ] Individual post view page
- [ ] Edit/delete posts
- [ ] Comment system UI
- [ ] User profile page
- [ ] Search functionality
- [ ] Category filtering

### Backend Enhancements
- [ ] Email verification
- [ ] Password reset
- [ ] Follow/unfollow users
- [ ] Search with filtering
- [ ] Pagination optimization
- [ ] Rate limiting
- [ ] Input validation
- [ ] Error handling

### Deployment
- [ ] Deploy backend to Heroku/Railway/Render
- [ ] Deploy frontend to Vercel/Netlify
- [ ] Update environment variables for production
- [ ] Setup CI/CD pipeline

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 7777 is in use
lsof -i :7777

# Kill process if needed
kill -9 <PID>
```

### Can't connect to MongoDB
- Verify connection string in `.env`
- Check MongoDB Atlas cluster is running
- Add your IP to whitelist (0.0.0.0/0 for development)
- Check internet connectivity

### Frontend shows blank page
- Check browser console for errors (F12)
- Verify backend is running
- Check .env.local has correct API URL
- Clear browser cache

### Authentication not working
- Check localStorage has authToken
- Verify token format in Network tab
- Check backend logs for errors
- Ensure JWT_SECRET matches in signup and signin

---

## 📞 Common Commands

```bash
# Start backend
cd server && npm run dev

# Start frontend
cd client && npm run dev

# Stop all servers
# Press Ctrl+C in each terminal

# View database
# MongoDB Atlas console: https://cloud.mongodb.com

# Check MongoDB connection
curl http://localhost:7777/api/health

# View logs
tail -f /tmp/backend.log
tail -f /tmp/frontend.log
```

---

## 🎉 You're All Set!

Your blogging platform is ready. Users can now:
- ✅ Sign up with email and password
- ✅ Login with their credentials
- ✅ View their profile
- ✅ Sign out

The data is being stored in MongoDB, fully integrated with a modern UI.

**Start building amazing features! 🚀**

For detailed setup instructions, see `SETUP_GUIDE.md`

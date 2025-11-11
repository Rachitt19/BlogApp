# 📚 BlogApp - Full Stack Blogging Platform

A modern, full-stack blogging application built with Next.js, Express.js, MongoDB, and JWT authentication. Production-ready with complete signup/login functionality.

## ✨ Features

- 🔐 **User Authentication**
  - Email/password signup and login
  - Password hashing with bcrypt
  - JWT token-based authorization
  - Secure token storage

- 📝 **Blog Management**
  - Create, read, update, delete posts
  - Rich text content
  - Categories and tags
  - Post views tracking
  - Featured images

- 💬 **Community Features**
  - Like/unlike posts
  - Comment system
  - User profiles
  - Follow system (ready to implement)

- 🎨 **Modern UI/UX**
  - Responsive design
  - Tailwind CSS styling
  - Smooth animations
  - Mobile-friendly

- 🚀 **Production Ready**
  - Environment configuration
  - Error handling
  - Input validation
  - CORS support
  - Database indexing

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with SSR
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **JavaScript/JSX** - Core language

### Backend
- **Express.js** - Web server framework
- **Node.js** - JavaScript runtime
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Token authentication
- **bcryptjs** - Password hashing

### DevOps & Deployment
- **Git/GitHub** - Version control
- **Vercel** - Frontend hosting (recommended)
- **Render/Railway/Heroku** - Backend hosting
- **MongoDB Atlas** - Database hosting

## 📦 Project Structure

```
BlogApp/
├── client/                          # Next.js Frontend
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.js               # Root layout with AuthProvider
│   │   ├── page.js                 # Home page
│   │   └── loading.js
│   ├── components/
│   │   ├── auth/
│   │   │   ├── AuthModal.js        # Login/Signup modal
│   │   │   └── UserMenu.js         # User dropdown menu
│   │   ├── blog/
│   │   │   ├── BlogCard.js
│   │   │   ├── BlogGrid.js
│   │   │   ├── CategoryFilter.js
│   │   │   ├── CreatePostModal.js
│   │   │   └── PostViewModal.js
│   │   ├── layout/
│   │   │   ├── Header.js
│   │   │   └── Layout.js
│   │   └── ui/
│   │       ├── Button.js
│   │       └── Modal.js
│   ├── hooks/
│   │   ├── useAuth.js              # Authentication hook
│   │   └── useBlogPosts.js
│   ├── lib/
│   │   ├── api.js                  # API client
│   │   └── firebase.js             # (Removed - use api.js instead)
│   ├── data/
│   │   ├── constants.js
│   │   └── samplePosts.js
│   ├── public/
│   ├── .env.local                  # Frontend env vars
│   ├── jsconfig.json
│   ├── next.config.mjs
│   ├── postcss.config.mjs
│   ├── package.json
│   └── README.md
│
├── server/                          # Express.js Backend
│   ├── src/
│   │   ├── index.js                # Server entry point
│   │   ├── controllers/
│   │   │   ├── authController.js   # Auth logic
│   │   │   └── postController.js   # Blog posts logic
│   │   ├── middleware/
│   │   │   └── auth.js             # JWT verification
│   │   ├── models/
│   │   │   ├── User.js             # User schema
│   │   │   └── Post.js             # Post schema
│   │   ├── routes/
│   │   │   ├── auth.js             # Auth endpoints
│   │   │   └── posts.js            # Blog endpoints
│   │   └── utils/
│   │       └── jwt.js              # JWT helpers
│   ├── .env                        # Backend env vars
│   ├── package.json
│   └── README.md
│
├── QUICK_START.md                  # ⭐ Start here for setup
├── SETUP_GUIDE.md                  # Detailed setup instructions
├── DEPLOYMENT_GUIDE.md             # Deployment to production
├── README.md                       # This file
├── .gitignore
└── start.sh                        # Helper script
```

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- MongoDB Atlas account (free)
- npm or yarn

### 1️⃣ Setup Backend

```bash
cd server
npm install
npm run dev
```

Backend runs on: `http://localhost:7777`

### 2️⃣ Setup Frontend (new terminal)

```bash
cd client
npm install
npm run dev
```

Frontend runs on: `http://localhost:3000`

### 3️⃣ Test the App

1. Open http://localhost:3000
2. Click "Sign Up"
3. Create an account
4. You're logged in! 🎉

**For detailed setup, see [QUICK_START.md](./QUICK_START.md)**

## 📚 Complete Documentation

| Document | Purpose |
|----------|---------|
| [QUICK_START.md](./QUICK_START.md) | 5-minute setup guide |
| [SETUP_GUIDE.md](./SETUP_GUIDE.md) | Detailed architecture & API docs |
| [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) | Production deployment guide |

## 🔐 Authentication

### How It Works

```
User Signs Up
    ↓
Email & Password Validated
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
Verified by Middleware
```

### API Endpoints

**Public Endpoints:**
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login user
- `GET /api/posts` - Get all blog posts
- `GET /api/posts/:id` - Get single post

**Protected Endpoints (Require JWT Token):**
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/like` - Like post
- `POST /api/posts/:id/comments` - Add comment

## 🗄️ Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  email: String (unique),
  displayName: String,
  password: String (hashed),
  photoURL: String (optional),
  createdAt: Date
}
```

### Post Collection
```javascript
{
  _id: ObjectId,
  title: String,
  content: String,
  author: ObjectId (ref: User),
  authorName: String,
  category: String,
  tags: [String],
  image: String,
  views: Number,
  likes: [ObjectId],
  comments: [{
    author: ObjectId,
    authorName: String,
    content: String,
    createdAt: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

## 🌐 Environment Variables

### Backend `/server/.env`
```env
PORT=7777
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=BlogifyServer
JWT_SECRET=BlogifyServerSecretKey
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

### Frontend `/client/.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:7777/api
```

## 🚀 Deployment

### Recommended Stack
- **Frontend:** Vercel (free, optimized for Next.js)
- **Backend:** Render or Railway (free tier available)
- **Database:** MongoDB Atlas (free tier)

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for:
- Step-by-step deployment to Vercel, Render, Railway, Heroku
- Environment configuration for production
- Security checklist
- CI/CD pipeline setup
- Monitoring and logging

## 💡 Usage Examples

### Sign Up via API
```bash
curl -X POST http://localhost:7777/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepass123",
    "displayName": "John Doe"
  }'
```

### Login via API
```bash
curl -X POST http://localhost:7777/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepass123"
  }'
```

### Get Current User (Protected)
```bash
curl -X GET http://localhost:7777/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 🛠️ Available Scripts

### Backend
```bash
cd server
npm run dev      # Start development server
npm start        # Start production server
npm test         # Run tests
```

### Frontend
```bash
cd client
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run linter
```

## 🐛 Troubleshooting

### Backend Issues
- **Port 7777 in use:** `lsof -i :7777` then `kill -9 <PID>`
- **MongoDB connection error:** Check connection string and IP whitelist
- **Token invalid:** Verify JWT_SECRET is consistent

### Frontend Issues
- **Blank page:** Check browser console (F12), verify backend is running
- **API errors:** Check NEXT_PUBLIC_API_URL in .env.local
- **Auth not working:** Check localStorage has token, verify token format

See [QUICK_START.md](./QUICK_START.md#troubleshooting) for more solutions.

## 📝 What's Next?

### Phase 1: Core Features (Done ✅)
- [x] User authentication
- [x] JWT token system
- [x] MongoDB setup
- [x] API structure
- [x] Frontend-backend integration

### Phase 2: Blog Features (Ready to Build)
- [ ] Create/edit/delete blog posts
- [ ] Blog post display and grid
- [ ] Categories and tags filtering
- [ ] Search functionality
- [ ] Comments system

### Phase 3: Social Features
- [ ] Like/unlike posts
- [ ] Follow/unfollow users
- [ ] User profiles
- [ ] Activity feed
- [ ] Notifications

### Phase 4: Advanced Features
- [ ] Image upload
- [ ] Rich text editor
- [ ] Email notifications
- [ ] Analytics
- [ ] Moderation tools

## 📞 Support & Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Atlas Help](https://docs.atlas.mongodb.com)
- [JWT Handbook](https://auth0.com/resources/ebooks/jwt-handbook)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## 📄 License

MIT License - feel free to use for personal and commercial projects.

## 🤝 Contributing

Found a bug or want to improve something?
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 🎉 Success Checklist

- [ ] Backend running on port 7777
- [ ] Frontend running on port 3000
- [ ] Can sign up new account
- [ ] Can login with email/password
- [ ] User data stored in MongoDB
- [ ] JWT tokens working
- [ ] API endpoints responding
- [ ] Frontend receives auth data
- [ ] User menu displays logged-in user
- [ ] Can sign out

**If all ✅, your app is ready to build amazing features!**

---

## 🚀 Ready to Deploy?

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) to take your app live!

---

**Made with ❤️ | BlogApp 2025**

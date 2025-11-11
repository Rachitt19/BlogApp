# BlogApp - Full Stack Setup Guide

A modern blogging platform with user authentication, post creation, and community engagement.

## 🚀 Project Structure

```
BlogApp/
├── client/                 # Next.js Frontend
│   ├── app/               # App directory (Next.js 15)
│   ├── components/        # React components
│   ├── hooks/             # Custom hooks (useAuth)
│   ├── lib/               # Utilities (API client)
│   └── package.json
├── server/                # Express.js Backend
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── middleware/    # Auth middleware
│   │   ├── models/        # Mongoose schemas
│   │   ├── routes/        # API routes
│   │   ├── utils/         # Helpers
│   │   └── index.js       # Server entry
│   ├── .env              # Environment variables
│   └── package.json
└── README.md
```

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (free tier available)
- MongoDB connection string

## 🔧 Installation & Setup

### 1. MongoDB Setup

1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string in the format: `mongodb+srv://username:password@cluster.mongodb.net/?appName=YourApp`

### 2. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Your .env file is already configured with:
# - MongoDB connection string
# - JWT secret
# - Port (7777)
# - Client URL

# Start the server
npm run dev
```

The server will run on `http://localhost:7777`

### 3. Frontend Setup

```bash
cd client

# Install dependencies
npm install

# The .env.local is already configured with API URL

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🏗️ Backend Architecture

### Database Models

#### User Model
```javascript
{
  email: string (unique, required),
  displayName: string (required),
  password: string (hashed, required),
  photoURL: string (optional),
  createdAt: date
}
```

#### Post Model
```javascript
{
  title: string (required),
  content: string (required),
  author: ObjectId (references User),
  authorName: string,
  category: string,
  tags: [string],
  image: string (optional),
  views: number,
  likes: [ObjectId],
  comments: [
    {
      author: ObjectId,
      authorName: string,
      content: string,
      createdAt: date
    }
  ],
  createdAt: date,
  updatedAt: date
}
```

### API Endpoints

#### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/profile` - Update profile (protected)

#### Posts (Blog)
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create post (protected)
- `PUT /api/posts/:id` - Update post (protected)
- `DELETE /api/posts/:id` - Delete post (protected)
- `POST /api/posts/:id/like` - Like/Unlike post (protected)
- `POST /api/posts/:id/comments` - Add comment (protected)
- `DELETE /api/posts/:postId/comments/:commentId` - Delete comment (protected)

## 🔐 Authentication Flow

1. User signs up with email, password, and display name
2. Password is hashed with bcrypt before storing in database
3. JWT token is generated and sent to frontend
4. Token is stored in localStorage
5. Token is sent with every authenticated request in headers: `Authorization: Bearer <token>`
6. Middleware verifies token and attaches userId to request

## 📱 Frontend Components

### Key Components
- `AuthModal.js` - Login/Signup form
- `UserMenu.js` - User profile dropdown
- `Layout.js` - Main app wrapper
- `BlogCard.js` - Post display card
- `BlogGrid.js` - Grid of posts
- `CreatePostModal.js` - Post creation form

### Hooks
- `useAuth()` - Access authentication state and functions

## 🚀 Deployment

### Backend Deployment (Heroku, Render, Railway, etc.)

1. Set environment variables on hosting platform:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
   - `CLIENT_URL=<your-frontend-url>`

2. Update the server start script

### Frontend Deployment (Vercel, Netlify, etc.)

1. Update `.env.local` with production API URL
2. Deploy using hosting platform's CLI or GitHub integration

## 🛠️ Common Issues & Solutions

### Port Already in Use
```bash
# Kill process on port 7777 (Mac/Linux)
lsof -i :7777
kill -9 <PID>

# Or change PORT in .env
```

### MongoDB Connection Error
- Verify connection string is correct
- Check IP whitelist in MongoDB Atlas (add 0.0.0.0/0 for development)
- Ensure network connectivity

### CORS Issues
- Verify `CLIENT_URL` in server .env matches frontend URL
- Check browser console for specific CORS errors

### Authentication Not Working
- Check token is saved in localStorage
- Verify token is sent in Authorization header
- Check JWT_SECRET matches between signup and signin

## 📚 Development Tips

### Testing Endpoints
Use Postman or curl to test backend:

```bash
# Signup
curl -X POST http://localhost:7777/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","displayName":"John Doe"}'

# Signin
curl -X POST http://localhost:7777/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Database Inspection
Use MongoDB Atlas UI to view collections and documents

## 📝 Environment Variables

### Server `.env`
```
PORT=7777
MONGO_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

### Client `.env.local`
```
NEXT_PUBLIC_API_URL=http://localhost:7777/api
```

## 🎯 Next Steps for Production

1. **Security**
   - Use strong JWT_SECRET
   - Implement rate limiting
   - Add input validation
   - Use HTTPS in production

2. **Features**
   - Email verification
   - Password reset
   - User profiles
   - Follow system
   - Search functionality

3. **Optimization**
   - Database indexing
   - Caching strategy
   - Image optimization
   - CDN for static assets

## 📞 Support

For issues or questions, check:
- MongoDB Atlas documentation
- Express.js documentation
- Next.js documentation
- JWT documentation

---

**Happy Blogging! 🎉**

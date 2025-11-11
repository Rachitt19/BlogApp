# 🛠️ Developer Guide - Building on BlogApp

A guide for developers to understand the codebase and build features on top of the authentication foundation.

## 📚 Understanding the Codebase

### Backend Architecture

```
server/src/
├── index.js                    # Express app setup
├── controllers/
│   ├── authController.js       # Auth logic (signup, signin)
│   └── postController.js       # Post CRUD logic
├── middleware/
│   └── auth.js                 # JWT verification
├── models/
│   ├── User.js                 # MongoDB user schema
│   └── Post.js                 # MongoDB post schema
├── routes/
│   ├── auth.js                 # /api/auth routes
│   └── posts.js                # /api/posts routes
└── utils/
    └── jwt.js                  # JWT helpers
```

### Frontend Architecture

```
client/
├── app/
│   ├── layout.js               # Root layout + AuthProvider
│   ├── page.js                 # Home page
│   └── globals.css             # Global styles
├── components/
│   ├── auth/
│   │   ├── AuthModal.js        # Login/signup form
│   │   └── UserMenu.js         # User profile menu
│   ├── blog/
│   │   ├── BlogCard.js         # Post card component
│   │   ├── BlogGrid.js         # Posts grid layout
│   │   ├── CategoryFilter.js   # Category filter
│   │   ├── CreatePostModal.js  # Create post form
│   │   └── PostViewModal.js    # Full post view
│   ├── layout/
│   │   ├── Header.js           # App header
│   │   └── Layout.js           # Main layout wrapper
│   └── ui/
│       ├── Button.js           # Reusable button
│       └── Modal.js            # Reusable modal
├── hooks/
│   ├── useAuth.js              # Authentication hook
│   └── useBlogPosts.js         # Blog posts hook (ready)
└── lib/
    └── api.js                  # API client
```

## 🔄 Data Flow

### Authentication Flow

```
User Input (Signup/Login)
    ↓
Frontend: AuthModal.js
    ↓
API Call: lib/api.js (authAPI.signup/signin)
    ↓
Backend: controllers/authController.js
    ↓
Database: models/User.js (MongoDB)
    ↓
Response: {token, user}
    ↓
Frontend: hooks/useAuth.js
    ↓
localStorage + React State
    ↓
Update UI: UserMenu.js displays user
```

### Protected Request Flow

```
Frontend: Any Component
    ↓
API Call with: Authorization: Bearer <token>
    ↓
Backend: middleware/auth.js
    ↓
Verify JWT Token
    ↓
If valid: Extract userId, continue
If invalid: Return 401
    ↓
Controller processes request
    ↓
Response sent to frontend
```

## 💻 Adding New Features

### Example 1: Creating a Blog Post Form

**Step 1: Update API client** (`client/lib/api.js`)

```javascript
export const blogAPI = {
  createPost: async (token, title, content, category) => {
    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title, content, category })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },

  getPosts: async () => {
    const response = await fetch(`${API_URL}/posts`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  }
};
```

**Step 2: Create component** (`client/components/blog/BlogPostForm.js`)

```javascript
'use client';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { blogAPI } from '../../lib/api';

export default function BlogPostForm({ onPostCreated }) {
  const { user, token } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await blogAPI.createPost(token, title, content, category);
      alert('Post created successfully!');
      setTitle('');
      setContent('');
      onPostCreated(result.post);
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p>Please login to create posts</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
        className="w-full px-4 py-2 border rounded"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Post content"
        className="w-full px-4 py-2 border rounded"
        rows="6"
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full px-4 py-2 border rounded"
      >
        <option>General</option>
        <option>Technology</option>
        <option>Travel</option>
        <option>Food</option>
      </select>
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {loading ? 'Creating...' : 'Create Post'}
      </button>
    </form>
  );
}
```

**Step 3: Use in page** (`client/app/page.js`)

```javascript
'use client';
import BlogPostForm from '../components/blog/BlogPostForm';
import Layout from '../components/layout/Layout';

export default function Home() {
  const [posts, setPosts] = useState([]);

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <Layout>
      <BlogPostForm onPostCreated={handlePostCreated} />
      {/* Display posts here */}
    </Layout>
  );
}
```

### Example 2: Fetching and Displaying Posts

**Create `useBlogPosts` hook** (`client/hooks/useBlogPosts.js`)

```javascript
'use client';
import { useState, useEffect } from 'react';
import { blogAPI } from '../lib/api';

export const useBlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await blogAPI.getPosts();
        setPosts(result.posts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error, setPosts };
};
```

## 🔐 Using Authentication in Components

### Accessing User Data

```javascript
'use client';
import { useAuth } from '../hooks/useAuth';

export default function ProfileComponent() {
  const { user, token, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please login</p>;

  return (
    <div>
      <h1>Welcome, {user.displayName}</h1>
      <p>Email: {user.email}</p>
      <p>ID: {user.id}</p>
    </div>
  );
}
```

### Making Protected API Calls

```javascript
import { useAuth } from '../hooks/useAuth';

export default function ProtectedComponent() {
  const { token } = useAuth();

  const handleAction = async () => {
    const response = await fetch('http://localhost:7777/api/protected-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ data: 'value' })
    });
    
    const data = await response.json();
    console.log(data);
  };

  return <button onClick={handleAction}>Do Action</button>;
}
```

## 📡 Backend API Response Format

### Success Response
```javascript
{
  success: true,
  message: "Operation successful",
  data: { /* actual data */ }
}
```

### Error Response
```javascript
{
  success: false,
  message: "Error description"
}
```

## 🧪 Testing APIs

### Using curl

```bash
# GET request
curl -X GET http://localhost:7777/api/posts

# POST request with auth
curl -X POST http://localhost:7777/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token>" \
  -d '{"title": "Test", "content": "Test post"}'

# With variables
TOKEN="your_token"
curl -X GET http://localhost:7777/api/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

### Using Postman

1. Create new request
2. Set method (GET, POST, etc.)
3. Enter URL
4. Add headers: `Authorization: Bearer <token>`
5. Add body (for POST/PUT)
6. Click Send

## 🎯 Common Tasks

### Task: Add Like Button to Post

**Backend** (Already done in postController.js):
```javascript
router.post('/:id/like', authMiddleware, postController.likePost);
```

**Frontend** (Create component):
```javascript
'use client';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function LikeButton({ postId, initialLikes }) {
  const { token } = useAuth();
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    const response = await fetch(
      `http://localhost:7777/api/posts/${postId}/like`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    const data = await response.json();
    setLikes(data.post.likes.length);
    setLiked(!liked);
  };

  return (
    <button onClick={handleLike}>
      {liked ? '❤️' : '🤍'} {likes}
    </button>
  );
}
```

### Task: Add Comment to Post

**Backend** (Already done):
```javascript
router.post('/:id/comments', authMiddleware, postController.addComment);
```

**Frontend** (Create component):
```javascript
'use client';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function CommentForm({ postId, onCommentAdded }) {
  const { token } = useAuth();
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:7777/api/posts/${postId}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: comment })
      }
    );
    const data = await response.json();
    setComment('');
    onCommentAdded(data.post);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
        className="flex-1 px-4 py-2 border rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Post
      </button>
    </form>
  );
}
```

## 🔄 State Management Pattern

### Using Context + Hooks (Current Setup)

```javascript
// AuthProvider in layout.js
<AuthContext.Provider value={{ user, token, signUp, signIn, logout }}>
  {children}
</AuthContext.Provider>

// Using in component
const { user, token } = useAuth();
```

### For Blog Data (Recommended)

```javascript
// Create PostsContext
const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  
  const addPost = (post) => setPosts([post, ...posts]);
  const removePost = (id) => setPosts(posts.filter(p => p._id !== id));
  
  return (
    <PostsContext.Provider value={{ posts, addPost, removePost }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => useContext(PostsContext);
```

## 📊 Database Best Practices

### Adding Indexes

```javascript
// In model file
userSchema.index({ email: 1 });
postSchema.index({ author: 1, createdAt: -1 });
postSchema.index({ category: 1 });
```

### Query Optimization

```javascript
// Instead of:
const posts = await Post.find().limit(10);

// Use with populate:
const posts = await Post.find()
  .populate('author', 'displayName email')
  .limit(10)
  .sort({ createdAt: -1 });
```

## 🚀 Performance Tips

1. **Pagination**
   ```javascript
   const page = req.query.page || 1;
   const limit = req.query.limit || 10;
   const skip = (page - 1) * limit;
   
   const posts = await Post.find().skip(skip).limit(limit);
   ```

2. **Image Optimization**
   - Use Next.js Image component
   - Compress images before upload
   - Use WebP format

3. **Caching**
   - Cache frequently accessed data
   - Implement Redis for sessions
   - Set appropriate cache headers

## 🐛 Debugging

### Frontend Debugging
1. Open DevTools (F12)
2. Check Console tab for errors
3. Check Network tab for API calls
4. Check Application tab for localStorage

### Backend Debugging
1. Check server logs
2. Add console.logs in controllers
3. Test endpoints with curl
4. Check MongoDB Atlas for data

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| 401 Unauthorized | Invalid token | Check token in localStorage |
| CORS error | Wrong CLIENT_URL | Update .env CLIENT_URL |
| 404 Not Found | Wrong endpoint | Check route spelling |
| 500 Server Error | Database issue | Check MongoDB connection |

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Hooks Guide](https://react.dev/reference/react/hooks)
- [JWT.io](https://jwt.io/)

## ✅ Development Checklist

Before deploying new features:
- [ ] Test on backend with curl
- [ ] Test on frontend in dev
- [ ] Check error handling
- [ ] Validate user inputs
- [ ] Test with and without auth
- [ ] Check loading states
- [ ] Test on mobile view
- [ ] Update documentation

---

**Happy Coding! 🚀**

Build amazing features on this solid foundation!

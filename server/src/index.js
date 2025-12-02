const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const communityRoutes = require('./routes/communities');
const followRoutes = require('./routes/follows');
const chatRoutes = require('./routes/chats');
const forumRoutes = require('./routes/forums');

const app = express();

// Enhanced CORS Configuration - Works with all browsers and production
const corsOptions = {
  origin: function (origin, callback) {
    // Allowed origins for development and production
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:7777',
      'http://localhost:8888',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
      'http://127.0.0.1:7777',
      'http://127.0.0.1:8888',
      process.env.CLIENT_URL,
      process.env.PRODUCTION_URL || ''
    ].filter(url => url !== ''); // Remove empty strings

    // Log request origin for debugging
    if (origin) {
      console.log(`CORS request from: ${origin}`);
    }

    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`CORS blocked: ${origin} not in allowed origins`);
      callback(new Error(`CORS policy: ${origin} is not allowed`));
    }
  },
  credentials: true, // Allow cookies and credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400 // Cache preflight for 24 hours
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests explicitly
app.options('*', cors(corsOptions));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Attach io to req
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/blogs', postRoutes); // Alias for posts endpoint
app.use('/api/communities', communityRoutes);
app.use('/api/follows', followRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/forums', forumRoutes);
app.use('/api/upload', require('./routes/upload'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: err.message || 'Server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Create HTTP server and Socket.io instance
const server = http.createServer(app);
const io = new Server(server, { cors: corsOptions });

// Initialize socket handler
require('./socket/socketHandler')(io);

// Start server
const PORT = process.env.PORT || 8888;

const startServer = async () => {
  await connectDB();
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer().catch(console.error);

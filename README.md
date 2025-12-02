# 📚 BlogApp - Full Stack Blogging & Community Platform

A modern, full-stack application combining blogging, real-time chat, and community forums. Built with Next.js, Express.js, MongoDB, and Socket.io.

## ✨ Features

- 🔐 **User Authentication**
  - Email/password signup and login
  - JWT token-based authorization
  - Secure password hashing with bcrypt

- 📝 **Blog Management**
  - Create, read, update, delete posts
  - Rich text content
  - Categories and tags
  - Image uploads

- 💬 **Real-time Chat**
  - **Direct Messaging**: Private 1-on-1 chats
  - **Group Chats**: Create groups, add/remove members
  - **Admin Controls**: Group creators can edit group info and manage members
  - **Real-time Updates**: Instant message delivery via Socket.io

- 👥 **Communities & Forums**
  - **Communities**: Join or create topic-based communities
  - **Forums**: Threaded discussions within communities
  - **Comments**: Nested comments and discussions

- 👤 **Social Features**
  - **User Profiles**: Customizable profiles with avatars
  - **Follow System**: Follow other users to see their activity
  - **Activity Feed**: Personalized feed based on followed users and communities

- 🎨 **Modern UI/UX**
  - Responsive design with Tailwind CSS
  - Smooth animations and transitions
  - Interactive modals and real-time feedback

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework
- **Tailwind CSS** - Styling
- **Socket.io Client** - Real-time communication
- **Lucide React** - Icons
- **Axios** - API requests

### Backend
- **Express.js** - Web server
- **Node.js** - Runtime
- **MongoDB** - Database
- **Mongoose** - ODM
- **Socket.io** - Real-time server
- **JWT** - Authentication

## 📦 Project Structure

```
BlogApp/
├── client/                          # Next.js Frontend
│   ├── app/
│   │   ├── chat/                   # Chat page
│   │   ├── communities/            # Communities pages
│   │   ├── profile/                # User profile pages
│   │   ├── layout.js               # Root layout
│   │   └── page.js                 # Home page
│   ├── components/
│   │   ├── auth/                   # Auth components
│   │   ├── blog/                   # Blog components
│   │   ├── chat/                   # Chat components (GroupInfoModal, etc.)
│   │   ├── layout/                 # Header, Sidebar
│   │   └── ui/                     # Reusable UI components
│   ├── lib/
│   │   └── api.js                  # Centralized API client
│   └── ...
│
├── server/                          # Express.js Backend
│   ├── src/
│   │   ├── controllers/            # Request handlers
│   │   ├── models/                 # Mongoose schemas (User, Chat, Post, etc.)
│   │   ├── routes/                 # API routes
│   │   │   ├── auth.js
│   │   │   ├── chats.js            # Chat endpoints
│   │   │   ├── communities.js      # Community endpoints
│   │   │   ├── posts.js
│   │   │   └── ...
│   │   ├── socket/                 # Socket.io handlers
│   │   └── index.js                # Server entry point
│   └── ...
```

## 🚀 Quick Start

### 1️⃣ Setup Backend
```bash
cd server
npm install
npm run dev
```
Runs on: `http://localhost:8888`

### 2️⃣ Setup Frontend
```bash
cd client
npm install
npm run dev
```
Runs on: `http://localhost:3000`

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register
- `POST /api/auth/signin` - Login
- `GET /api/auth/me` - Get current user

### Chat
- `GET /api/chats` - Get all chats
- `POST /api/chats/group` - Create group chat
- `PUT /api/chats/group/:id` - Update group info
- `PUT /api/chats/group/:id/add` - Add member
- `PUT /api/chats/group/:id/remove` - Remove member

### Communities & Forums
- `GET /api/communities` - List communities
- `POST /api/communities` - Create community
- `GET /api/forums/community/:id` - Get community threads

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create post

## 🗄️ Database Schema

Key collections in MongoDB:
- **Users**: User profiles and auth data
- **Chats**: Direct and group chat metadata
- **Messages**: Chat messages linked to Chats
- **Posts**: Blog posts
- **Communities**: Community metadata
- **ForumThreads**: Discussion threads in communities

## 📝 What's Next?

- [x] **Core Features**: Auth, Database, API
- [x] **Blog System**: CRUD, Categories
- [x] **Chat System**: Real-time messaging, Groups
- [x] **Community System**: Forums, Threads
- [x] **Social**: Profiles, Follows
- [ ] **Advanced Search**: Global search across all content
- [ ] **Notifications**: System-wide notifications
- [ ] **Media Gallery**: Centralized media management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---
**Made with ❤️ | BlogApp 2025**

const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a community name'],
    unique: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: 500
  },
  icon: {
    type: String,
    default: '🚀'
  },
  category: {
    type: String,
    default: 'general'
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  moderators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
  memberCount: {
    type: Number,
    default: 0
  },
  postCount: {
    type: Number,
    default: 0
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  rules: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Community', communitySchema);

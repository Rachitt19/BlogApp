const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const forumController = require('../controllers/forumController');

// Get threads for a community (public)
router.get('/community/:communityId', forumController.getThreads);

// Get single thread (public)
router.get('/:id', forumController.getThread);

// Create thread (protected)
router.post('/', authMiddleware, forumController.createThread);

// Add comment (protected)
router.post('/:id/comments', authMiddleware, forumController.addComment);

module.exports = router;

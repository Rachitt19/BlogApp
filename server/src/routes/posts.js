const express = require('express');
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

/* USER ROUTES — must be FIRST */
router.get('/users/:userId/posts', postController.getUserPosts);
router.get('/users/:userId/liked-posts', postController.getLikedPosts);

/* PUBLIC ROUTES */
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPost);

/* AUTH ROUTES */
router.post('/', authMiddleware, postController.createPost);
router.put('/:id', authMiddleware, postController.updatePost);
router.delete('/:id', authMiddleware, postController.deletePost);
router.post('/:id/like', authMiddleware, postController.likePost);
router.post('/:id/comments', authMiddleware, postController.addComment);
router.delete('/:postId/comments/:commentId', authMiddleware, postController.deleteComment);

module.exports = router;

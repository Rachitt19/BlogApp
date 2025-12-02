const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const followController = require('../controllers/followController');

// Follow a user
router.post('/:id/follow', authMiddleware, followController.followUser);

// Unfollow a user
router.delete('/:id/follow', authMiddleware, followController.unfollowUser);

// Get followers
router.get('/:id/followers', followController.getFollowers);

// Get following
router.get('/:id/following', followController.getFollowing);

// Check follow status
router.get('/:id/status', authMiddleware, followController.checkFollowStatus);

module.exports = router;

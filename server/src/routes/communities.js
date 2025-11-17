const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const communityController = require('../controllers/communityController');

// Create community
router.post('/', authMiddleware, communityController.createCommunity);

// Get all communities
router.get('/', communityController.getAllCommunities);

// Get popular communities
router.get('/popular', communityController.getPopularCommunities);

// Get single community
router.get('/:id', communityController.getCommunity);

// Join community
router.post('/:id/join', authMiddleware, communityController.joinCommunity);

// Leave community
router.post('/:id/leave', authMiddleware, communityController.leaveCommunity);

// Get user's communities
router.get('/user/:userId', communityController.getUserCommunities);

module.exports = router;

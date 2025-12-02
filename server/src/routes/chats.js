const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const chatController = require('../controllers/chatController');

router.use(authMiddleware);

router.get('/', chatController.getChats);
router.get('/:chatId/messages', chatController.getMessages);
router.post('/', chatController.createChat);

module.exports = router;

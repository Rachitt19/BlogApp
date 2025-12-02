const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const chatController = require('../controllers/chatController');

router.use(authMiddleware);

router.get('/', chatController.getChats);
router.get('/unread', authMiddleware, chatController.getUnreadCount);
router.get('/:chatId/messages', authMiddleware, chatController.getMessages);
router.put('/:chatId/read', authMiddleware, chatController.markMessagesRead);
router.post('/', authMiddleware, chatController.createChat);

module.exports = router;


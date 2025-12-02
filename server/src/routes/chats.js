const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const chatController = require('../controllers/chatController');

router.use(authMiddleware);

router.get('/', chatController.getChats);
router.get('/unread', authMiddleware, chatController.getUnreadCount);
router.get('/:chatId/messages', authMiddleware, chatController.getMessages);
router.put('/:chatId/read', authMiddleware, chatController.markMessagesRead);
router.post('/group', authMiddleware, chatController.createGroupChat);
router.put('/group/:chatId', authMiddleware, chatController.updateGroup);
router.put('/group/:chatId/add', authMiddleware, chatController.addGroupMember);
router.put('/group/:chatId/remove', authMiddleware, chatController.removeGroupMember);
router.put('/group/:chatId/leave', authMiddleware, chatController.leaveGroup);
router.post('/', authMiddleware, chatController.createChat);

module.exports = router;


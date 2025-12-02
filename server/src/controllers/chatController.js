const Chat = require('../models/Chat');
const Message = require('../models/Message');
const User = require('../models/User');

// Get all chats for current user
exports.getChats = async (req, res) => {
    try {
        const chats = await Chat.find({ participants: req.userId })
            .populate('participants', 'displayName photoURL')
            .populate('groupAdmin', 'displayName photoURL')
            .populate({
                path: 'lastMessage',
                populate: { path: 'sender', select: 'displayName' }
            })
            .sort({ updatedAt: -1 });

        res.json({
            success: true,
            chats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// Get messages for a chat
exports.getMessages = async (req, res) => {
    try {
        const { chatId } = req.params;

        const messages = await Message.find({ chat: chatId })
            .populate('sender', 'displayName photoURL')
            .sort({ createdAt: 1 });

        res.json({
            success: true,
            messages
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// Create or get existing chat with a user
exports.createChat = async (req, res) => {
    try {
        const { userId } = req.body; // ID of the other user

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required'
            });
        }

        // Check if chat already exists
        const existingChat = await Chat.findOne({
            participants: { $all: [req.userId, userId] }
        }).populate('participants', 'displayName photoURL')
            .populate('groupAdmin', 'displayName photoURL');

        if (existingChat) {
            return res.json({
                success: true,
                chat: existingChat
            });
        }

        // Create new chat
        const chat = new Chat({
            participants: [req.userId, userId]
        });

        await chat.save();
        await chat.save();
        await chat.populate('participants', 'displayName photoURL');
        await chat.populate('groupAdmin', 'displayName photoURL');

        res.status(201).json({
            success: true,
            chat
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};
// Get unread message count
exports.getUnreadCount = async (req, res) => {
    try {
        // Find all chats where user is a participant
        const chats = await Chat.find({ participants: req.userId });
        const chatIds = chats.map(chat => chat._id);

        // Count messages in these chats where:
        // 1. Sender is NOT the current user
        // 2. Current user is NOT in readBy array
        const unreadCount = await Message.countDocuments({
            chat: { $in: chatIds },
            sender: { $ne: req.userId },
            readBy: { $ne: req.userId }
        });

        res.json({
            success: true,
            count: unreadCount
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// Mark messages in a chat as read
exports.markMessagesRead = async (req, res) => {
    try {
        const { chatId } = req.params;

        await Message.updateMany(
            {
                chat: chatId,
                sender: { $ne: req.userId },
                readBy: { $ne: req.userId }
            },
            {
                $addToSet: { readBy: req.userId }
            }
        );

        res.json({
            success: true
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};


// Create group chat
exports.createGroupChat = async (req, res) => {
    try {
        const { users, name } = req.body;

        if (!users || !name) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all the fields'
            });
        }

        if (users.length < 1) {
            return res.status(400).json({
                success: false,
                message: 'At least 1 user is required to form a group chat'
            });
        }

        // Add current user to participants
        users.push(req.userId);

        const groupChat = await Chat.create({
            groupName: name,
            participants: users,
            isGroup: true,
            groupAdmin: req.userId
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate('participants', 'displayName photoURL')
            .populate('groupAdmin', 'displayName photoURL');

        // Notify all participants
        if (req.io) {
            users.forEach(userId => {
                if (userId.toString() !== req.userId.toString()) {
                    req.io.to(userId.toString()).emit('new_group_chat', fullGroupChat);
                }
            });
        }

        res.status(200).json({
            success: true,
            chat: fullGroupChat
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// Update group details
exports.updateGroup = async (req, res) => {
    try {
        const { chatId } = req.params;
        const { groupName, groupImage } = req.body;

        const updatedChat = await Chat.findByIdAndUpdate(
            chatId,
            {
                groupName,
                groupImage
            },
            { new: true }
        )
            .populate('participants', 'displayName photoURL')
            .populate('groupAdmin', 'displayName photoURL');

        if (!updatedChat) {
            return res.status(404).json({
                success: false,
                message: 'Chat not found'
            });
        }

        // Notify participants
        if (req.io) {
            updatedChat.participants.forEach(participant => {
                req.io.to(participant._id.toString()).emit('chat_updated', updatedChat);
            });
        }

        res.json({
            success: true,
            chat: updatedChat
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// Add member to group
exports.addGroupMember = async (req, res) => {
    try {
        const { chatId } = req.params;
        const { userId } = req.body;

        const chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: 'Chat not found'
            });
        }

        if (chat.participants.some(p => p.toString() === userId)) {
            return res.status(400).json({
                success: false,
                message: 'User already in group'
            });
        }

        const updatedChat = await Chat.findByIdAndUpdate(
            chatId,
            {
                $addToSet: { participants: userId }
            },
            { new: true }
        )
            .populate('participants', 'displayName photoURL')
            .populate('groupAdmin', 'displayName photoURL');

        // Notify participants (including new member)
        if (req.io) {
            updatedChat.participants.forEach(participant => {
                req.io.to(participant._id.toString()).emit('chat_updated', updatedChat);
            });
            // Also emit new_group_chat to the added user so it appears in their list
            req.io.to(userId).emit('new_group_chat', updatedChat);
        }

        res.json({
            success: true,
            chat: updatedChat
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// Leave group
exports.leaveGroup = async (req, res) => {
    try {
        const { chatId } = req.params;

        const updatedChat = await Chat.findByIdAndUpdate(
            chatId,
            {
                $pull: { participants: req.userId }
            },
            { new: true }
        )
            .populate('participants', 'displayName photoURL')
            .populate('groupAdmin', 'displayName photoURL');

        if (!updatedChat) {
            return res.status(404).json({
                success: false,
                message: 'Chat not found'
            });
        }

        // Notify remaining participants
        if (req.io) {
            updatedChat.participants.forEach(participant => {
                req.io.to(participant._id.toString()).emit('chat_updated', updatedChat);
            });
        }

        res.json({
            success: true,
            chatId
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// Remove member from group (Admin only)
exports.removeGroupMember = async (req, res) => {
    try {
        const { chatId } = req.params;
        const { userId } = req.body;

        const chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: 'Chat not found'
            });
        }

        // Check if requester is admin
        if (chat.groupAdmin.toString() !== req.userId) {
            return res.status(403).json({
                success: false,
                message: 'Only group admin can remove members'
            });
        }

        const updatedChat = await Chat.findByIdAndUpdate(
            chatId,
            {
                $pull: { participants: userId }
            },
            { new: true }
        )
            .populate('participants', 'displayName photoURL')
            .populate('groupAdmin', 'displayName photoURL');

        // Notify participants
        if (req.io) {
            // Notify remaining participants
            updatedChat.participants.forEach(participant => {
                req.io.to(participant._id.toString()).emit('chat_updated', updatedChat);
            });
            // Notify removed user
            req.io.to(userId).emit('chat_updated', updatedChat);
        }

        res.json({
            success: true,
            chat: updatedChat
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

const Chat = require('../models/Chat');
const Message = require('../models/Message');
const User = require('../models/User');

// Get all chats for current user
exports.getChats = async (req, res) => {
    try {
        const chats = await Chat.find({ participants: req.userId })
            .populate('participants', 'displayName photoURL')
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
        }).populate('participants', 'displayName photoURL');

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
        await chat.populate('participants', 'displayName photoURL');

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

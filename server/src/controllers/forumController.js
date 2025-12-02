const ForumThread = require('../models/ForumThread');
const ForumComment = require('../models/ForumComment');
const Community = require('../models/Community');

// Create a new thread
exports.createThread = async (req, res) => {
    try {
        const { communityId, title, content } = req.body;

        const thread = new ForumThread({
            community: communityId,
            author: req.userId,
            title,
            content
        });

        await thread.save();
        await thread.populate('author', 'displayName photoURL');

        res.status(201).json({
            success: true,
            thread
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// Get threads for a community
exports.getThreads = async (req, res) => {
    try {
        const { communityId } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        const threads = await ForumThread.find({ community: communityId })
            .populate('author', 'displayName photoURL')
            .sort({ isPinned: -1, createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await ForumThread.countDocuments({ community: communityId });

        res.json({
            success: true,
            threads,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// Get single thread with comments
exports.getThread = async (req, res) => {
    try {
        const { id } = req.params;

        const thread = await ForumThread.findById(id)
            .populate('author', 'displayName photoURL');

        if (!thread) {
            return res.status(404).json({
                success: false,
                message: 'Thread not found'
            });
        }

        // Increment views
        thread.views += 1;
        await thread.save();

        const comments = await ForumComment.find({ thread: id })
            .populate('author', 'displayName photoURL')
            .sort({ createdAt: 1 });

        res.json({
            success: true,
            thread,
            comments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// Add comment to thread
exports.addComment = async (req, res) => {
    try {
        const { id } = req.params; // Thread ID
        const { content } = req.body;

        const comment = new ForumComment({
            thread: id,
            author: req.userId,
            content
        });

        await comment.save();
        await comment.populate('author', 'displayName photoURL');

        // Update thread comment count
        await ForumThread.findByIdAndUpdate(id, { $inc: { commentCount: 1 } });

        res.status(201).json({
            success: true,
            comment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

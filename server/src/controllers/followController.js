const Follow = require('../models/Follow');
const User = require('../models/User');

// Follow a user
exports.followUser = async (req, res) => {
    try {
        const { id } = req.params; // ID of user to follow
        const followerId = req.userId; // ID of current user

        if (id === followerId) {
            return res.status(400).json({
                success: false,
                message: 'You cannot follow yourself'
            });
        }

        const userToFollow = await User.findById(id);
        if (!userToFollow) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const existingFollow = await Follow.findOne({
            follower: followerId,
            following: id
        });

        if (existingFollow) {
            return res.status(400).json({
                success: false,
                message: 'You are already following this user'
            });
        }

        const follow = new Follow({
            follower: followerId,
            following: id
        });

        await follow.save();

        res.status(201).json({
            success: true,
            message: 'Successfully followed user'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// Unfollow a user
exports.unfollowUser = async (req, res) => {
    try {
        const { id } = req.params; // ID of user to unfollow
        const followerId = req.userId;

        const follow = await Follow.findOneAndDelete({
            follower: followerId,
            following: id
        });

        if (!follow) {
            return res.status(400).json({
                success: false,
                message: 'You are not following this user'
            });
        }

        res.json({
            success: true,
            message: 'Successfully unfollowed user'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// Get followers of a user
exports.getFollowers = async (req, res) => {
    try {
        const { id } = req.params;

        const followers = await Follow.find({ following: id })
            .populate('follower', 'displayName photoURL')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            followers: followers.map(f => f.follower).filter(user => user),
            count: followers.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// Get users followed by a user
exports.getFollowing = async (req, res) => {
    try {
        const { id } = req.params;

        const following = await Follow.find({ follower: id })
            .populate('following', 'displayName photoURL')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            following: following.map(f => f.following).filter(user => user),
            count: following.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// Check if following
exports.checkFollowStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const followerId = req.userId;

        const follow = await Follow.findOne({
            follower: followerId,
            following: id
        });

        res.json({
            success: true,
            isFollowing: !!follow
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

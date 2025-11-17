const Community = require('../models/Community');
const User = require('../models/User');
const Post = require('../models/Post');

// Create a new community
exports.createCommunity = async (req, res) => {
  try {
    const { name, description, icon, category, rules } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: 'Name and description are required'
      });
    }

    const existingCommunity = await Community.findOne({ name });
    if (existingCommunity) {
      return res.status(400).json({
        success: false,
        message: 'Community with this name already exists'
      });
    }

    const community = new Community({
      name,
      description,
      icon: icon || '🚀',
      category: category || 'general',
      rules: rules || [],
      creator: req.userId,
      members: [req.userId],
      moderators: [req.userId],
      memberCount: 1
    });

    await community.save();
    await community.populate('creator', 'displayName photoURL');

    res.status(201).json({
      success: true,
      message: 'Community created successfully',
      community
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// Get all communities
exports.getAllCommunities = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;

    let query = { isPublic: true };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;

    const communities = await Community.find(query)
      .populate('creator', 'displayName photoURL')
      .sort({ memberCount: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Community.countDocuments(query);

    res.json({
      success: true,
      communities,
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

// Get single community
exports.getCommunity = async (req, res) => {
  try {
    const { id } = req.params;

    const community = await Community.findById(id)
      .populate('creator', 'displayName photoURL')
      .populate('members', 'displayName photoURL')
      .populate('moderators', 'displayName photoURL')
      .populate({
        path: 'posts',
        populate: { path: 'author', select: 'displayName photoURL' }
      });

    if (!community) {
      return res.status(404).json({
        success: false,
        message: 'Community not found'
      });
    }

    res.json({
      success: true,
      community
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// Join community
exports.joinCommunity = async (req, res) => {
  try {
    const { id } = req.params;

    const community = await Community.findById(id);

    if (!community) {
      return res.status(404).json({
        success: false,
        message: 'Community not found'
      });
    }

    if (community.members.includes(req.userId)) {
      return res.status(400).json({
        success: false,
        message: 'You are already a member of this community'
      });
    }

    community.members.push(req.userId);
    community.memberCount = community.members.length;
    await community.save();

    res.json({
      success: true,
      message: 'Joined community successfully',
      community
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// Leave community
exports.leaveCommunity = async (req, res) => {
  try {
    const { id } = req.params;

    const community = await Community.findById(id);

    if (!community) {
      return res.status(404).json({
        success: false,
        message: 'Community not found'
      });
    }

    const memberIndex = community.members.indexOf(req.userId);

    if (memberIndex === -1) {
      return res.status(400).json({
        success: false,
        message: 'You are not a member of this community'
      });
    }

    community.members.splice(memberIndex, 1);
    community.memberCount = community.members.length;
    await community.save();

    res.json({
      success: true,
      message: 'Left community successfully',
      community
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// Get popular communities
exports.getPopularCommunities = async (req, res) => {
  try {
    const { limit = 6 } = req.query;

    const communities = await Community.find({ isPublic: true })
      .populate('creator', 'displayName photoURL')
      .sort({ memberCount: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      communities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// Get user's joined communities
exports.getUserCommunities = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    const communities = await Community.find({ members: userId })
      .populate('creator', 'displayName photoURL')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Community.countDocuments({ members: userId });

    res.json({
      success: true,
      communities,
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

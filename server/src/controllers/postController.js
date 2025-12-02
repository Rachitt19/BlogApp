const Post = require('../models/Post');
const User = require('../models/User');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { title, content, category, tags, image } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required' });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const post = new Post({
      title,
      content,
      category: category || 'General',
      tags: tags || [],
      image,
      author: req.userId,
      authorName: user.displayName
    });

    await post.save();

    res.status(201).json({ success: true, message: 'Post created successfully', post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search, sort = '-createdAt' } = req.query;

    let matchStage = {};

    if (category && category !== 'All') {
      matchStage.category = category;
    }

    if (search) {
      matchStage.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    let sortObj = { createdAt: -1 };
    if (sort === 'createdAt') sortObj = { createdAt: 1 };
    if (sort === '-likes') sortObj = { likeCount: -1 };
    if (sort === 'likes') sortObj = { likeCount: 1 };

    const skip = (Number(page) - 1) * Number(limit);

    const pipeline = [
      { $match: matchStage },
      { $addFields: { likeCount: { $size: '$likes' } } },
      { $sort: sortObj },
      { $skip: skip },
      { $limit: Number(limit) },
      {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: '_id',
          as: 'author'
        }
      },
      { $unwind: { path: '$author', preserveNullAndEmptyArrays: true } }
    ];

    const posts = await Post.aggregate(pipeline);

    const total = await Post.countDocuments(matchStage);

    res.json({
      success: true,
      posts,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single post
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    )
      .populate('author', 'displayName email photoURL')
      .populate('comments.author', 'displayName photoURL');

    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

    res.json({ success: true, post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    Object.assign(post, req.body, { updatedAt: Date.now() });

    await post.save();

    res.json({ success: true, message: 'Post updated', post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Like/Unlike
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

    const idx = post.likes.indexOf(req.userId);

    if (idx > -1) post.likes.splice(idx, 1);
    else post.likes.push(req.userId);

    await post.save();

    res.json({
      success: true,
      message: idx > -1 ? 'Post unliked' : 'Post liked',
      post
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add comment
exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ success: false, message: 'Comment content required' });
    }

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

    post.comments.push({
      author: req.userId,
      content,
      authorName: (await User.findById(req.userId)).displayName
    });

    await post.save();

    res.status(201).json({ success: true, message: 'Comment added', post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete comment
exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

    const commentIndex = post.comments.findIndex(c => c._id.toString() === req.params.commentId);

    if (commentIndex === -1)
      return res.status(404).json({ success: false, message: 'Comment not found' });

    if (post.comments[commentIndex].author.toString() !== req.userId)
      return res.status(403).json({ success: false, message: 'Not authorized' });

    post.comments.splice(commentIndex, 1);
    await post.save();

    res.json({ success: true, message: 'Comment deleted', post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// USER POSTS (fixed skip)
exports.getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    const posts = await Post.find({ author: userId })
      .populate('author', 'displayName email photoURL')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Post.countDocuments({ author: userId });

    res.json({
      success: true,
      posts,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// LIKED POSTS (fixed skip)
exports.getLikedPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    const posts = await Post.find({ likes: userId })
      .populate('author', 'displayName email photoURL')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Post.countDocuments({ likes: userId });

    res.json({
      success: true,
      posts,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

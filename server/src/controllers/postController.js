const Post = require('../models/Post');
const User = require('../models/User');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { title, content, category, tags, image } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required'
      });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
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

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
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

    // Parse sort parameter and build aggregation pipeline
    let sortObj = { createdAt: -1 }; // default
    if (sort) {
      if (sort === '-likes' || sort === 'likes') {
        // For likes, we need to sort by array length
        sortObj = sort === '-likes' 
          ? { likeCount: -1 } // Most liked first
          : { likeCount: 1 };  // Least liked first
      } else if (sort === '-views' || sort === 'views') {
        sortObj = sort === '-views'
          ? { views: -1 }  // Most viewed first
          : { views: 1 };  // Least viewed first
      } else if (sort === '-createdAt' || sort === 'createdAt') {
        sortObj = sort === '-createdAt'
          ? { createdAt: -1 }  // Newest first
          : { createdAt: 1 };  // Oldest first
      }
    }

    const skip = (page - 1) * parseInt(limit);

    // Use aggregation pipeline to properly handle array size sorting
    const pipeline = [
      { $match: matchStage },
      {
        $addFields: {
          likeCount: { $size: '$likes' }
        }
      },
      { $sort: sortObj },
      { $skip: skip },
      { $limit: parseInt(limit) },
      {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: '_id',
          as: 'author'
        }
      },
      {
        $unwind: {
          path: '$author',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          title: 1,
          content: 1,
          category: 1,
          authorName: 1,
          tags: 1,
          image: 1,
          views: 1,
          likes: 1,
          comments: 1,
          createdAt: 1,
          updatedAt: 1,
          author: {
            _id: '$author._id',
            displayName: '$author.displayName',
            email: '$author.email'
          }
        }
      }
    ];

    const posts = await Post.aggregate(pipeline);
    
    // Get total count for pagination
    const countPipeline = [
      { $match: matchStage },
      { $count: 'total' }
    ];
    const countResult = await Post.aggregate(countPipeline);
    const total = countResult.length > 0 ? countResult[0].total : 0;

    res.json({
      success: true,
      posts,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// Get single post
exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    )
      .populate('author', 'displayName email photoURL')
      .populate('comments.author', 'displayName photoURL');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    res.json({
      success: true,
      post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// Update post
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category, tags, image } = req.body;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    if (post.author.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this post'
      });
    }

    if (title) post.title = title;
    if (content) post.content = content;
    if (category) post.category = category;
    if (tags) post.tags = tags;
    if (image) post.image = image;
    post.updatedAt = Date.now();

    await post.save();

    res.json({
      success: true,
      message: 'Post updated successfully',
      post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// Delete post
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    if (post.author.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this post'
      });
    }

    await Post.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// Like/Unlike post
exports.likePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    const likeIndex = post.likes.indexOf(req.userId);

    if (likeIndex > -1) {
      post.likes.splice(likeIndex, 1);
    } else {
      post.likes.push(req.userId);
    }

    await post.save();

    res.json({
      success: true,
      message: likeIndex > -1 ? 'Post unliked' : 'Post liked',
      post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// Add comment
exports.addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Comment content is required'
      });
    }

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    const user = await User.findById(req.userId);

    const comment = {
      author: req.userId,
      authorName: user.displayName,
      content
    };

    post.comments.push(comment);
    await post.save();

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// Delete comment
exports.deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    const commentIndex = post.comments.findIndex(c => c._id.toString() === commentId);

    if (commentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    if (post.comments[commentIndex].author.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this comment'
      });
    }

    post.comments.splice(commentIndex, 1);
    await post.save();

    res.json({
      success: true,
      message: 'Comment deleted successfully',
      post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// Get all posts by a specific user
exports.getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    const posts = await Post.find({ author: userId })
      .populate('author', 'displayName email photoURL')
      .populate('comments.author', 'displayName photoURL')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Post.countDocuments({ author: userId });

    res.json({
      success: true,
      posts,
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

// Get all posts liked by a specific user
exports.getLikedPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    const posts = await Post.find({ likes: userId })
      .populate('author', 'displayName email photoURL')
      .populate('comments.author', 'displayName photoURL')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Post.countDocuments({ likes: userId });

    res.json({
      success: true,
      posts,
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

const { Comment } = require("../models");

// @desc    Create a new comment
// @route   POST /api/comments
// @access  Public
exports.createComment = async (req, res) => {
  try {
    const { name, email, phone, comment } = req.body;

    const newComment = await Comment.create({
      name,
      email,
      phone,
      comment,
    });

    res.status(201).json({ success: true, data: newComment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get all comments
// @route   GET /api/comments
// @access  Private/Admin
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({ success: true, data: comments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Update a comment
// @route   PUT /api/comments/:id
// @access  Private/Admin
exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { seen } = req.body;

    const comment = await Comment.findByPk(id);

    if (!comment) {
      return res
        .status(404)
        .json({ success: false, error: "Comment not found" });
    }

    comment.seen = seen;
    await comment.save();

    res.status(200).json({ success: true, data: comment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Delete a comment
// @route   DELETE /api/comments/:id
// @access  Private/Admin
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);

    if (!comment) {
      return res
        .status(404)
        .json({ success: false, error: "Comment not found" });
    }

    await comment.destroy();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

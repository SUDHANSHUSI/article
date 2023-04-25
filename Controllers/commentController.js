const Comment = require("../models/commentModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const BlogPostModel = require("../models/blogModel");
const { default: mongoose } = require("mongoose");

// **********************************GET ALL COMMENTS**********************************

const getAllComments = catchAsync(async (req, res, next) => {
  const comments = await Comment.find();

  res.status(200).json({
    numberOfComments: comments.length,
    comments,
  });
});

// *************************************CREATE COMMENT ***********************************

const createComment = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const newComment = await Comment.create({
    content: req.body.content,
    blog: id,
    author: req.user.id,
  });
 

  if (newComment) {
    res.status(201).json({
      comment: newComment,
    });
  } else {
    res.status(400).json({
      message: "comment not created",
    });
  }
});

// **************************************GET COMMENT BY ID************************************

const getCommentById = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(new AppError("Comment not found", 404));
  }

  res.status(200).json({
    comment,
  });
});

//****************************************DELETE COMMENT***********************************/

const deleteComment = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  if (!id) return next(new AppError("ID is not present in parameter", 403));

  const comment = await Comment.findById(id);

  if (!comment) {
    return next(new AppError("comment not found", 404));
  }
  if (req.user.id !== comment.author.toString()) {
    return next(
      new AppError("You are not authorized to delete this post", 401)
    );
  }
  const deleted = await Comment.findByIdAndDelete(id);

  if (deleted) {
    res.status(200).json({
      msg: "comment Deleted Successfully",
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
});

module.exports = {
  getAllComments,
  createComment,
  deleteComment,
  getCommentById,
};

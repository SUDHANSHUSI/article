const Comment = require("../models/commentModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// **********************************GET ALL COMMENTS**********************************

const getAllComments = catchAsync(async (req, res, next) => {
  const comments = await Comment.find();

  res.status(200).json({
    results: comments.length,
    data: {
      comments,
    },
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


//  ***********************************UPDATE COMMENT *************************************************
const updateComment = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  if (!id) return next(new AppError("ID is not present in parameter", 403));

  const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!comment) {
    return next(new AppError("Comment not found", 404));
  }

  if (req.user.id !== blogPost.user.toString()) {
    return next(
      new AppError("You are not authorized to update this post", 401)
    );
  }

  res.status(200).json({
    comment,
  });
});

//****************************************DELETE COMMENT***********************************/ 

const deleteComment = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  if (!id) return next(new AppError("ID is not present in parameter", 403));

  await Comment.findByIdAndDelete(req.params.id);

  if (!comment) {
    return next(new AppError("comment not found", 404));
  }
  if (req.user.id !== blogPost.user.toString()) {
    return next(
      new AppError("You are not authorized to delete this post", 401)
    );
  }

  if (deleted) {
    res.status(201).json({
      msg: "comment Deleted Successfully",
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
});

module.exports = {
  getAllComments,
  createComment,
  updateComment,
  deleteComment,
  getCommentById,
};

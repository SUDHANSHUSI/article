const BlogPostModel = require("../models/blogModel");
const mongoose = require("mongoose");
const catchAsync = require("express-async-handler");
const AppError = require("../utils/appError");

//******************************CREATE A NEW BLOGPOST******************************

const createBlogPost = catchAsync(async (req, res, next) => {
  const { title, author, content } = req.body;
  const blogPost = await BlogPostModel.create({
    title,
    author,
    content,
    user: req.user.id,
  });
  res.status(201).json(blogPost);
});

//*****************************GET ALL BLOGPOSTS************************************

const getAllBlogPosts = catchAsync(async (req, res, next) => {
  const blogPosts = await BlogPostModel.find();
  res.status(200).json(blogPosts);
});

// *******************************GET A BLOGPOST BY ID*******************************
const getBlogPostById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  if (!id) return next(new AppError("ID is not present in parameter", 403));

  const blogPost = await BlogPostModel.findById(id);

  if (!blogPost) {
    res.status(404).json({ message: "Blog post not found" });
  } else {
    res.status(200).json(blogPost);
  }
});

// ******************************UPDATE A BLOGPOST**************************************

const updateBlogPostById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  if (!id) return next(new AppError("ID is not present in parameter", 403));

  const { title, author, content } = req.body;

  const blogPost = await BlogPostModel.findById(id);

  if (!blogPost) {
    return next(new AppError("Blog not found", 404));
  }

  if (req.user.id !== blogPost.user.toString()) {
    return next(
      new AppError("You are not authorized to update this post", 401)
    );
  }

  const updated = await blogPost.updateOne(title, author, content);
  if (updated) {
    res.status(201).json({
      msg: "Blog Updated Successfully",
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
});

//******************************** DELETE A BLOGPOST***************************************

const deleteBlogPostById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  if (!id) return next(new AppError("ID is not present in parameter", 403));

  const blogPost = await BlogPostModel.findById(id);

  if (!blogPost) {
    return next(new AppError("Blog not found", 404));
  }

  if (req.user.id !== blogPost.user.toString()) {
    return next(
      new AppError("You are not authorized to update this post", 401)
    );
  }

  const updated = await blogPost.deleteOne(title, author, content);
  if (updated) {
    // TODO delete like and dislike of this particular blog
    res.status(201).json({
      msg: "Blog Updated Successfully",
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
});

// ************************************ GET POSTS BY TOPIC *****************************************

const getPostsByTopic = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  if (!id) return next(new AppError("ID is not present in parameter", 403));

  const posts = await BlogPostModel.find({ _id: id });
  if (!posts) return next(new AppError("Blog not found", 404));
  
  res.status(200).json(posts);
});

//************************************* GET MOST RECENT BLOGPOST *********************************

const getMostRecentBlogPost = catchAsync(async (req, res, next) => {
  const temp = await BlogPostModel.find().sort({ createdAt: -1 }).limit(1);

  res.status(200).json(temp);
});

module.exports = {
  createBlogPost,
  updateBlogPostById,
  deleteBlogPostById,
  getAllBlogPosts,
  getBlogPostById,
  getPostsByTopic,
  getMostRecentBlogPost,
};

const BlogPostModel = require("../models/blogModel");
const mongoose = require("mongoose");
const catchAsync = require("express-async-handler");
const AppError = require("../utils/appError");
const TopicModel = require("../models/topicModel");
const Comment = require("../models/commentModel");
const LikeDislike = require("../models/likeDislikeModel");

//******************************CREATE A NEW BLOGPOST******************************

const createBlogPost = catchAsync(async (req, res, next) => {
  const { title, author, content, blogTopic } = req.body;

  const topicName = await TopicModel.find({ name: blogTopic });
  const topicID = topicName[0]._id;

  const blogPost = await BlogPostModel.create({
    title,
    author,
    blogTopic: topicID,
    content,
    user: req.user.id,
  });

  res.status(201).json(blogPost);
});

//*****************************GET ALL BLOGPOSTS************************************

const getAllBlogPosts = catchAsync(async (req, res, next) => {
  const blogPosts = await BlogPostModel.find();
  res.status(200).json({
    numberOfBlogs: blogPosts.length,
    blogPosts,
  });
});

// *******************************GET A BLOGPOST BY ID********************************
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
  console.log(blogPost);

  const updated = await BlogPostModel.findByIdAndUpdate(
    id,
    { title, author, content },
    {
      new: true,
    }
  );
  // comment kem update karvi che pan??
  // definition ma given che?
  // ha la nai  nahi karvu
  if (updated) {
    res.status(201).json({
      msg: "Blog Updated Successfully",
      updated,
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
      new AppError("You are not authorized to delete this post", 401)
    );
  }

  await LikeDislike.deleteMany({ blogPost: id });
  await Comment.deleteMany({ blogPost: id });

  const deleted = await BlogPostModel.findByIdAndDelete(id);
  if (deleted) {
    res.status(201).json({
      msg: "Blog Deleted Successfully",
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
});

// ************************************ GET POSTS BY TOPIC *****************************************

const getPostsByTopic = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  if (!id) return next(new AppError("ID is not present in parameter", 403));

  const posts = await BlogPostModel.find({ blogTopic: id });
  if (!posts) return next(new AppError("Blog not found", 404));

  res.status(200).json(posts);
});

//************************************* GET MOST RECENT BLOGPOST *********************************

const getMostRecentBlogPost = catchAsync(async (req, res, next) => {
  const temp = await BlogPostModel.find().sort({ createdAt: -1 }).limit(1);

  res.status(200).json(temp);
});

// *************************************GET MOST LIKED BLOGS*****************************************
const getMostLikedBlog = catchAsync(async (req, res, next) => {
  const query = req.query.limit || 1;
  if (isNaN(query)) return next(new AppError("Query must be a Number"));

  const temp = await LikeDislike.aggregate([
    {
      $group: {
        _id: "$blog",
        count: { $sum: 1 }, // counting no. of documents pass
      },
    },
    {
      $sort: { count: -1 },
    },
    {
      $limit: +query,
    },
    {
      $lookup: {
        from: "blogposts",
        localField: "_id",
        foreignField: "_id",
        as: "blog",
      },
    },
    {
      // seperate from array
      $unwind: "$blog",
    },
    {
      $project: {
        _id: "$blog._id",
        total_likes: "$count",
        title: "$blog.title",
      },
    },
  ]).exec();

  if (temp) {
    res.json({
      output: temp,
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
});

module.exports = {
  createBlogPost,
  updateBlogPostById,
  deleteBlogPostById,
  getAllBlogPosts,
  getBlogPostById,
  getPostsByTopic,
  getMostLikedBlog,
  getMostRecentBlogPost,
};

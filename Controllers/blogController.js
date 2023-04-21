const BlogPostModel = require("../models/blogModel");
const mongoose = require("mongoose");
const catchAsync = require("../utils/catchAsync");

//******************************CREATE A NEW BLOGPOST******************************

const createBlogPost = catchAsync(async (req, res) => {
  const { title, author, content } = req.body;
  const blogPost = await BlogPostModel.create({ title, author, content });
  res.status(201).json(blogPost);
});

//*****************************GET ALL BLOGPOSTS************************************

const getAllBlogPosts = catchAsync(async (req, res) => {
  const blogPosts = await BlogPostModel.find();
  res.status(200).json(blogPosts);
});

// *******************************GET A BLOGPOST BY ID*******************************

const getBlogPostById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const blogPost = await BlogPostModel.findById(id);
  if (!blogPost) {
    res.status(404).json({ message: "Blog post not found" });
  } else {
    res.status(200).json(blogPost);
  }
});

// ******************************UPDATE A BLOGPOST**************************************

const updateBlogPostById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { title, author, content } = req.body;
  const blogPost = await BlogPostModel.findByIdAndUpdate(
    id,
    { title, author, content },
    { new: true }
  );
  if (!blogPost) {
    res.status(404).json({ message: "Blog post not found" });
  } else {
    res.status(200).json(blogPost);
  }
});

//******************************** DELETE A BLOGPOST***************************************

const deleteBlogPostById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const blogPost = await BlogPostModel.findByIdAndDelete(id);
  if (!blogPost) {
    res.status(404).json({ message: "Blog post not found" });
  } else {
    res.status(204).json({ message: "Blog post deleted" });
  }
});

// ************************************ GET POSTS BY TOPIC *****************************************

// const getPostsByTopic = catchAsync(async (req, res, next) => {
//   const { topic } = req.params;
//   const posts = await BlogPostModel.find({ topics: topic });
//   res.status(200).json(posts);
// });

//************************************* GET MOST RECENT BLOGPOST *********************************

const getMostRecentBlogPost = catchAsync(async (req, res, next) => {
  console.log("Jai Hind");
});

// ##################################################################################################################
// MARE RECENT BLOG POST JOIE CHE MAIN TIMESTAMP PRAMANE SET KARYU PAN MANE POSTMAN MA BTADE CHE BLOGPOST NOT FOUND**
// ******************************************************************************************************************

module.exports = {
  createBlogPost,
  updateBlogPostById,
  deleteBlogPostById,
  getAllBlogPosts,
  getBlogPostById,
  getMostRecentBlogPost,
};

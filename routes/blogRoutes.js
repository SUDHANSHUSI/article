const express = require("express");
const blogController = require("../Controllers/blogController");
const authController = require("../Controllers/authController");
const blogDetailValidation = require("../Middleware/blogDetailValidation");

const router = express.Router();
// ***********************GET MOST RECENT BLOGPOST***********************

router.get(
  "/getMostRecentBlog",
  authController.protect,
  blogController.getMostRecentBlogPost
);
// *****************************GET ALL BLOGS***************************
router.get(
  "/getAllBlogs",
  authController.protect,
  blogController.getAllBlogPosts
);

// **********************************CREATE A NEW BLOG********************
router.post(
  "/create",
  authController.protect,
  blogDetailValidation,
  blogController.createBlogPost
);

//*************************************************************
router
  .route("/:id")
  .get(authController.protect, blogController.getBlogPostById)
  .patch(authController.protect, blogController.updateBlogPostById)
  .delete(authController.protect, blogController.deleteBlogPostById);

//****************************GTE POST BY TOPIC*******************

router.get("/topics/:id", blogController.getPostsByTopic);

// GET most recent blog post,

module.exports = router;

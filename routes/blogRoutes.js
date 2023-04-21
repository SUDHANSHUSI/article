const express = require("express");
const blogController = require("../Controllers/blogController");
const authController = require("../Controllers/authController");
const blogDetailValidation = require("../Middleware/blogDetailValidation");

const router = express.Router();

router.get(
  "/getMostRecentBlog",
  authController.protect,
  blogDetailValidation,
  blogController.getMostRecentBlogPost
);
// GET all blogs
router.get(
  "/getAllBlogs",
  authController.protect,
  blogController.getAllBlogPosts
);

// CREATE a new blog
router.post("/create", authController.protect, blogController.createBlogPost);

// GET blog by ID
router.get("/:id", authController.protect, blogController.getBlogPostById);

// UPDATE blog
router.patch("/:id", authController.protect, blogController.updateBlogPostById);

// DELETE blog
router.delete(
  "/:id",
  authController.protect,
  blogController.deleteBlogPostById
);

// GET Post by topic

router.get("/topics/:topic", blogController.getPostsByTopic);

// GET most recent blog post,

module.exports = router;

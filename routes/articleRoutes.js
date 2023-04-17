const express = require("express");
const router = express.Router();
const articleController = require("../Controllers/articleController");
const authController = require("../Controllers/authController");

// GET all articles
router.get("/", articleController.getAllArticles);

// CREATE a new article
router.post("/", authController.protect, articleController.createArticle);

// GET article by ID
router.get("/:id", articleController.getArticleById);

// UPDATE an article
router.patch("/:id", authController.protect, articleController.updateArticle);

// DELETE an article
router.delete("/:id", authController.protect, articleController.deleteArticle);

// GET ARTICLE BY TOPIC
router.get(
  "/:topicId",
  authController.protect,
  articleController.getArticlesByTopic
);

// GET MOST RECENT ARTICLE
router.get("/getRecentArticle/:number", articleController.getMostRecentArticle);

module.exports = router;

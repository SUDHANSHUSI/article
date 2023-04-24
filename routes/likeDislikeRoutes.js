const express = require("express");
const authController = require("../Controllers/authController");
const likeDislikeController = require("../Controllers/likeDislikeController");

const router = express.Router();
//**************************GET ALL LIKES*********************************

router.get("/likes", likeDislikeController.getAllLikes);

//***************************GET ALL DISLIKES******************************
router.get("/dislikes", likeDislikeController.getAllDislikes);

// ****************************LIKE A PARTICULAR BLOG*********************
router
  .route("/:blogId/like")
  .post(authController.protect, likeDislikeController.likeBlog);

//   ******************************DISLIKE A PARTICULAR BLOG*****************
router
  .route("/:blogId/dislike")
  .post(authController.protect, likeDislikeController.dislikeBlog);

module.exports = router;

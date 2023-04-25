const express = require("express");
const blogController = require("../Controllers/blogController");
const authController = require("../Controllers/authController");
const commentController = require("../Controllers/commentController");
const IDvalidation = require("../Middleware/IDvalidation");

const router = express.Router();

router.route("/getAllComments").get(commentController.getAllComments);

router
  .route("/:id?")
  .post(authController.protect, IDvalidation, commentController.createComment)
  .get(authController.protect, IDvalidation, commentController.getCommentById)
  .delete(
    authController.protect,
    IDvalidation,
    commentController.deleteComment
  );

module.exports = router;

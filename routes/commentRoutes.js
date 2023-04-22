const express = require("express");
const blogController = require("../Controllers/blogController");
const authController = require("../Controllers/authController");
const commentController = require("../Controllers/commentController");
// const blogDetailValidation = require("../Middleware/blogDetailValidation");

const router = express.Router();

router.route("/getCreate").get(commentController.getAllComments);

router
  .route("/:id")
  .post(authController.protect, commentController.createComment)
  .get(authController.protect, commentController.getCommentById)
  .patch(authController.protect, commentController.updateComment)
  .delete(authController.protect, commentController.deleteComment);

module.exports = router;

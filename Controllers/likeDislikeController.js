const LikeDislike = require("../models/likeDislikeModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// ***************************************LIKE A BLOG***********************************************

const likeBlog = catchAsync(async (req, res, next) => {
  const { blogId } = req.params;
  const { _id: userId } = req.user;

  const likeDislike = await LikeDislike.findOne({ blog: blogId, user: userId });

  if (likeDislike) {
    // User already liked or disliked the blog
    if (likeDislike.like) {
      return next(new AppError("You have already liked the blog", 400));
    }

    likeDislike.like = true;
    await likeDislike.save();

    res.status(200).json({
      status: "success",
      data: {
        likeDislike,
      },
    });
  } else {
    // User did not like or dislike the blog before
    const newLikeDislike = await LikeDislike.create({
      user: userId,
      blog: blogId,
    });

    res.status(201).json({
      status: "success",
      data: {
        likeDislike: newLikeDislike,
      },
    });
  }
});

// ************************************DISLIKE A BLOG **********************************************

const dislikeBlog = catchAsync(async (req, res, next) => {
  const { blogId } = req.params;
  const { _id: userId } = req.user;

  const likeDislike = await LikeDislike.findOne({ blog: blogId, user: userId });

  if (likeDislike) {
    // User already liked or disliked the blog

    if (!likeDislike.like) {
      return next(new AppError("You have already disliked the blog", 400));
    }

    likeDislike.like = false;
    await likeDislike.save();

    res.status(200).json({
      status: "success",
      data: {
        likeDislike,
      },
    });
  } else {
    // User did not like or dislike the blog before
    const newLikeDislike = await LikeDislike.create({
      user: userId,
      blog: blogId,
      like: false,
    });

    res.status(201).json({
      status: "success",
      data: {
        likeDislike: newLikeDislike,
      },
    });
  }
});

// *********************************************GET ALL LIKES ****************************************

const getAllLikes = catchAsync(async (req, res, next) => {
  const likes = await LikeDislike.find({ like: true })
    .populate({
      path: "user",
      select: "name -_id",
      strictPopulate: false,
    })
    .populate({
      path: "blogpost",
      select: "title -_id",
      strictPopulate: false,
    });

  console.log(likes);

  res.status(200).json({
    status: "success",
    results: likes.length,
    data: {
      likes,
    },
  });
});

//************************************************GET ALL DISLIKES**************************************/

const getAllDislikes = catchAsync(async (req, res, next) => {
  const dislikes = await LikeDislike.find({ like: false })
    .populate({
      path: "user",
      select: "name -_id",
      strictPopulate: false,
    })
    .populate({
      path: "blogpost",
      select: "title -_id",
      strictPopulate: false,
    });

  res.status(200).json({
    status: "success",
    results: dislikes.length,
    data: {
      dislikes,
    },
  });
});

module.exports = {
  getAllLikes,
  getAllDislikes,
  likeBlog,
  dislikeBlog,
};

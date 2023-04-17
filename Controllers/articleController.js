const Article = require("../models/articleModel");
const mongoose = require("mongoose");
const catchAsync = require("../utils/catchAsync")



exports.getAllArticles =catchAsync(async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json({ articles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

exports.getArticleById =catchAsync(async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.status(200).json({ article });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

exports.createArticle =catchAsync(async (req, res) => {
  const { title, author, content, category } = req.body;
  try {
    const article = await Article.create({ title, author, content, category });
    res.status(201).json({ article });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

exports.updateArticle =catchAsync(async (req, res) => {
  const { id } = req.params;
  const { title, author, content, category } = req.body;
  try {
    const article = await Article.findByIdAndUpdate(
      id,
      { title, author, content, category },
      { new: true }
    );
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.status(200).json({ article });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

exports.deleteArticle =catchAsync(async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Article.findByIdAndDelete(id);
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



//****************************  article find by topics  ************************************

exports.getArticlesByTopic = catchAsync(async (req, res, next) => {
  // console.log(req.params.topicId);
  const articles = await Article.find({ topicId: req.params.topicId })

  console.log(articles);

  res.status(200).json({
      length: articles.length,
      articles
  })
})

//************************************* get most recent articles  *********************************

exports.getMostRecentArticle = catchAsync(async (req, res, next) => {
  // console.log('hello', req.params.number);
  const article = await Article.aggregate([
      {
          $sort: { createdAt: -1 }
      },
      {
          $limit: Number(req.params.number)
      }
  ])

  // const article = await Articlefind({}).sort({ cre: -1 }).limit(10, function (err, docs) { }

  res.json({
      status: "success",
      article
  })
})
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const Blogs = require("./data/blogs");

router.get("/", (req, res, next) => {
  let newBlog = new Blogs({
    blogId: mongoose.Types.ObjectId().toHexString(),
    author: "Sagar",
    title: "BLOG",
    content: "created a blog",
    imageUrl: "https://unsplash.com/photos/dqx3HQDrXuw",
  });
  newBlog
    .save()
    .then((blog) => {
      console.log("blog", blog);
    })
    .catch((err) => {
      console.log(err);
    });
  next();
});

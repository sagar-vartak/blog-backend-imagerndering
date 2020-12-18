const Blog = require("../data/blogs.js");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { request } = require("express");
const multer = require("multer");
const upload = multer({ dest: "images/" });

const getAllBlogs = async (req, res) => {
  let allblogs = await Blog.find({});
  console.log("ALL BLOGS:", allblogs);
  res.send(allblogs);
};
app.use(bodyParser.json());
const getById = async (req, res) => {
  try {
    let getblog = await Blog.find({ blogId: req.body.blogId });
    console.log("blog=", getblog);
    res.send(getblog);
  } catch (err) {
    console.log(err);
  }
};

const addBlogs = async (req, res) => {
  try {
    let addBlog = await Blog.insertMany({
      blogId: mongoose.Types.ObjectId().toHexString(),
      author: req.body.author,
      title: req.body.title,
      content: req.body.content,
      imageUrl: req.body.imageUrl,
    });
    console.log(addBlog);
    res.send(addBlog);
  } catch (err) {
    console.log(err);
    res.send("PLEASE ENTER VALID DETAILS");
  }
};

module.exports.getAllBlogs = getAllBlogs;
module.exports.getById = getById;
module.exports.addBlogs = addBlogs;

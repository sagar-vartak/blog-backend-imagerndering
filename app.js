const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
dotenv.config({ path: "./config.env" });
const multer = require("multer");
const upload = multer({ dest: "images/" });
const app = express();
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const Blogs = require("./data/blogs");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome To the SERVER");
});

mongoose.connect(
  process.env.MONGO_URL || process.env.DATABASE_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, connection) => {
    if (err) {
      return console.log("error in connecting");
    }
    console.log("connected to database");

    /* let newBlog = new Blogs({
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
      }); */
  }
);

app.listen(process.env.PORT || 4000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});

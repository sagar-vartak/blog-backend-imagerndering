const mongoose = require("mongoose");
const blogSchema = mongoose.Schema(
  {
    blogId: {
      type: mongoose.ObjectId,
    },
    author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    links: {},
  },
  {
    timestamps: true,
  }
);

var Blogs = mongoose.model("Blog", blogSchema);

module.exports = Blogs;

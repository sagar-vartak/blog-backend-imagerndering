const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const Blogs = require("./data/blog");

const multer = require("multer");

app.use("/images", express.static("images"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

mongoose.connect(
  process.env.DATABASE_URL || process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, connection) => {
    if (err) {
      return console.log("error in connecting");
    }
    console.log("connected to database");
  }
);

/* app.use("/", (req, res, next) => {
  res.status(200).json({
    message: "Welcome To server",
  });
});
 */
app.get("/all", (req, res) => {
  Blogs.find()
    .then((docs) => {
      const response = {
        blogs: docs.map((doc) => {
          return {
            _id: doc._id,
            blogId: doc.blogId,
            author: doc.author,
            title: doc.title,
            content: doc.content,
            imageUrl: doc.imageUrl,
            request: {
              type: "GET",
              url: `http://localhost:${process.env.PORT}/` + doc.imageUrl,
            },
          };
        }),
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
  /*  console.log(allblogs);
  res.send(allblogs); */
});

app.post("/add", upload.single("imageUrl"), (req, res, next) => {
  console.log(req.file);
  let newBlog = new Blogs({
    blogId: mongoose.Types.ObjectId().toString(),
    author: req.body.author,
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.file.path,
  });
  newBlog
    .save()
    .then((blog) => {
      console.log("blog", blog);
      res.status(201).json({
        message: "Blog Created Sucessfully",
        createdBlogs: {
          _id: blog._id,
          blogId: blog.blogId,
          author: blog.author,
          title: blog.title,
          content: blog.content,
          imageUrl: req.file.path,
          request: {
            message: "IF ON LOCAL HOST THEN REQUEST",
            type: "GET",
            url: `http://localhost:${process.env.PORT}/` + req.file.path,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

app.get("/:blogId", (req, res) => {
  const id = req.params.blogId;
  Blogs.findById(id)
    .exec()
    .then((doc) => {
      console.log("From database", doc);
      //res.send(doc);
      if (doc) {
        res.status(200).json({
          _id: doc._id,
          blogId: doc.blogId,
          author: doc.author,
          title: doc.title,
          content: doc.content,
          imageUrl: doc.imageUrl,
          request: {
            message: "IF ON LOCAL HOST THEN REQUEST",
            type: "GET",
            url: `http://localhost:${process.env.PORT}/` + doc.imageUrl,
          },
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

app.delete("/:blogId", (req, res) => {
  const id = req.params.blogId;
  //Blogs.findById(id)
  Blogs.deleteOne({ blogId: id })
    .exec()
    .then((doc) => {
      console.log("From database", doc.deletedCount);
      //res.send(doc);
      if (doc.deletedCount == 1) {
        res.status(200).json({
          message: "DELETED THE BLOG",
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

app.listen(process.env.PORT || 4000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});

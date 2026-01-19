const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const upload = require("../middleware/upload");

/* GET ALL BLOGS */
router.get("/", async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
});

/* ADD BLOG */
/* ADD BLOG */
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image upload failed" });
    }

    const blog = new Blog({
      title: req.body.title,
      excerpt: req.body.excerpt,
      content: req.body.content,
      // FIXED: Use req.file.path to get the full https://res.cloudinary.com/... URL
      image: req.file.path, 
    });

    await blog.save();
    res.json({ message: "Blog added successfully", blog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* DELETE BLOG */
router.delete("/delete/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog deleted" });
});

module.exports = router;

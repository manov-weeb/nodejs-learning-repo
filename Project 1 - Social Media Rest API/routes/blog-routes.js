const express = require("express");
const {
  getAllBlogs,
  addBlog,
  updateBlog,
  getById,
  deleteBlog,
  getUserBlogs,
} = require("../controllers/blog-controller");
const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.get("/:id", getById);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.delete("/:id", deleteBlog);
blogRouter.get("/user/:id", getUserBlogs);

module.exports = blogRouter;

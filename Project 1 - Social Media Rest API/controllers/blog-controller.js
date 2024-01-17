const mongoose = require("mongoose");
const Blog = require("../models/Blog");
const User = require("../models/User");

const { handleErrors } = require("./utils");

const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    if (!blogs || blogs.length === 0) {
      return handleErrors(res, 404, "No blogs found");
    }
    return res.status(200).json({ success: true, blogs });
  } catch (error) {
    console.error(error);
    return handleErrors(res, 500, "Internal Server Error");
  }
};

const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;

  if (!title || !description || !image || !user) {
    return handleErrors(
      res,
      400,
      "Please provide all required fields for the blog."
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const isValidUser = mongoose.Types.ObjectId.isValid(user);
    if (!isValidUser) {
      return handleErrors(res, 400, "Invalid user ID.");
    }

    const existingUser = await User.findById(user);
    if (!existingUser) {
      return handleErrors(res, 400, "Unable to find User.");
    }

    const newBlog = new Blog({
      title,
      description,
      image,
      user,
    });

    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });

    await session.commitTransaction();

    return res.status(200).json({ success: true, newBlog });
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    return handleErrors(res, 500, "Internal Server Error");
  } finally {
    session.endSession();
  }
};

const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;

  try {
    const blog = await Blog.findByIdAndUpdate(blogId, { title, description });
    if (!blog) {
      return handleErrors(res, 500, "Unable to complete the update operation.");
    }
    return res.status(200).json({ success: true, blog });
  } catch (error) {
    console.error(error);
    return handleErrors(res, 500, "Internal Server Error");
  }
};

const getById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return handleErrors(res, 404, "No Blog Found");
    }
    return res.status(200).json({ success: true, blog });
  } catch (error) {
    console.error(error);
    return handleErrors(res, 500, "Internal Server Error");
  }
};

const deleteBlog = async (req, res, next) => {
  const id = req.params.id;

  try {
    const blog = await Blog.findByIdAndDelete(id).populate("user");
    if (!blog) {
      return handleErrors(res, 404, "No Blog Found");
    }

    const user = blog.user;
    user.blogs.pull(blog);
    await user.save();

    return res.status(200).json({ success: true, blog });
  } catch (error) {
    console.error(error);
    return handleErrors(res, 500, "Internal Server Error");
  }
};

const getUserBlogs = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const userBlogs = await User.findById(userId).populate("blogs");
    if (!userBlogs) {
      return handleErrors(res, 404, "No Blogs found.");
    }
    return res.status(200).json({ success: true, userBlogs });
  } catch (error) {
    console.error(error);
    return handleErrors(res, 500, "Internal Server Error");
  }
};

module.exports = {
  getAllBlogs,
  addBlog,
  updateBlog,
  getById,
  deleteBlog,
  getUserBlogs,
};

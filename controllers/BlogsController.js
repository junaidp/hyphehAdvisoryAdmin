import Blogs from "../models/Blogs.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

// Save a blog
const saveBlog = async (req, res) => {
  const { title, description, image, category } = req.body;

  if (!title || !description || !image || !category) {
    throw new BadRequestError("Please provide all values");
  }

  const blog = await Blogs.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Blog Saved Successfully", blog });
};

// Get all blogs
const getAllBlogs = async (req, res) => {
  const blogs = await Blogs.find().select("title image category createdAt");
  res.status(StatusCodes.OK).json({ blogs });
};
// Get blogs by category
const getBlogsByCategory = async (req, res) => {
  const { category } = req.query;

  if (!category) {
    throw new BadRequestError("Please provide a category");
  }

  const allowedCategories = [
    "Manufacturing Industry",
    "Telecom Industry",
    "Energy",
    "Utilities",
    "Healthcare",
    "Real Estate",
    "Basic Materials",
    "Technology",
  ];

  if (!allowedCategories.includes(category)) {
    throw new BadRequestError("Invalid category provided");
  }

  const blogs = await Blogs.find({ category });

  res.status(StatusCodes.OK).json({ blogs });
};

// Get a single blog by ID
const getSingleBlog = async (req, res) => {
  const { id } = req.params;

  const blog = await Blogs.findById(id);

  if (!blog) {
    throw new NotFoundError(`Blog with ID ${id} not found`);
  }

  res.status(StatusCodes.OK).json({ blog });
};

// Delete a single blog by ID
const deleteBlog = async (req, res) => {
  const { id } = req.params;

  const blog = await Blogs.findByIdAndDelete(id);

  if (!blog) {
    throw new NotFoundError(`Blog with ID ${id} not found`);
  }

  res.status(StatusCodes.OK).json({ msg: "Blog deleted successfully" });
};

// Edit (update) a blog by ID
const editBlog = async (req, res) => {
  const { id } = req.params;
  const { title, description, image, category } = req.body;

  // Validate input
  if (!title || !description || !image || !category) {
    throw new BadRequestError("Please provide all values");
  }

  // Check if the category is valid
  const allowedCategories = [
    "Manufacturing Industry",
    "Telecom Industry",
    "Energy",
    "Utilities",
    "Healthcare",
    "Real Estate",
    "Basic Materials",
    "Technology",
  ];

  if (!allowedCategories.includes(category)) {
    throw new BadRequestError("Invalid category provided");
  }

  const blog = await Blogs.findByIdAndUpdate(
    id,
    { title, description, image, category },
    { new: true, runValidators: true }
  );

  if (!blog) {
    throw new NotFoundError(`Blog with ID ${id} not found`);
  }

  res.status(StatusCodes.OK).json({ msg: "Blog updated successfully", blog });
};

export {
  saveBlog,
  getAllBlogs,
  getBlogsByCategory,
  getSingleBlog,
  deleteBlog,
  editBlog,
};

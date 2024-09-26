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
  const blogs = await Blogs.find();
  res.status(StatusCodes.OK).json({ blogs });
};

// Get blogs by category
const getBlogsByCategory = async (req, res) => {
  const { category } = req.query;

  if (!category) {
    throw new BadRequestError("Please provide a category");
  }

  // Check if the category is valid by comparing it with the allowed enum values
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

export { saveBlog, getAllBlogs, getBlogsByCategory };

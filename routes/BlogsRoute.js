import express from "express";
const router = express.Router();

import {
  saveBlog,
  getAllBlogs,
  getBlogsByCategory,
} from "../controllers/BlogsController.js";

// router.route("/:category").get(getBlogsByCategory);
router.route("/").post(saveBlog).get(getBlogsByCategory);
router.route("/getAll").get(getAllBlogs);

export default router;

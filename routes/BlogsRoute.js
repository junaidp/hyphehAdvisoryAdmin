import express from "express";
const router = express.Router();

import {
  saveBlog,
  getAllBlogs,
  getBlogsByCategory,
  getSingleBlog,
  deleteBlog,
  editBlog,
} from "../controllers/BlogsController.js";

router.route("/").post(saveBlog).get(getBlogsByCategory);
router.route("/getAll").get(getAllBlogs);
router.route("/:id").get(getSingleBlog).delete(deleteBlog).put(editBlog);

export default router;

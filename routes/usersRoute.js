import express from "express";
const router = express.Router();

import {
  saveUser,
  getAllUsers,
  deleteUser,
} from "../controllers/usersControllers.js";

router.route("/").post(saveUser).get(getAllUsers);
router.route("/:id").delete(deleteUser);

export default router;

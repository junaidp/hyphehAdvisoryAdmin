import express from "express";
const router = express.Router();

import { saveUser, getAllUsers } from "../controllers/usersControllers.js";

router.route("/").post(saveUser).get(getAllUsers);

export default router;

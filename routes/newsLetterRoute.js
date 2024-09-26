import express from "express";
const router = express.Router();

import {
  saveEmail,
  getAllEmails,
} from "../controllers/newsLetterController.js";

router.route("/").post(saveEmail).get(getAllEmails);

export default router;

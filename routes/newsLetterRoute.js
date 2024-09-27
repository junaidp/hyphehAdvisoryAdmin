import express from "express";
const router = express.Router();

import {
  saveEmail,
  getAllEmails,
  deleteNewsLetter,
} from "../controllers/newsLetterController.js";

router.route("/").post(saveEmail).get(getAllEmails);
router.route("/:id").delete(deleteNewsLetter);

export default router;

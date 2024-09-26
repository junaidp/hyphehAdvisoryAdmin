import express from "express";
const router = express.Router();

import {
  saveConsultation,
  getAllConsultations,
} from "../controllers/consultationController.js";

router.route("/").post(saveConsultation).get(getAllConsultations);

export default router;

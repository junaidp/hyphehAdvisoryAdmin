import express from "express";
const router = express.Router();

import {
  saveConsultation,
  getAllConsultations,
  deleteConsultation,
} from "../controllers/consultationController.js";

router.route("/").post(saveConsultation).get(getAllConsultations);
router.route("/:id").delete(deleteConsultation);

export default router;

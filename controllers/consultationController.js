import Consultation from "../models/Consultation.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";

const saveConsultation = async (req, res) => {
  const { name, phone, email, message } = req.body;

  if (!name || !phone || !email || !message) {
    throw new BadRequestError("Please provide all values");
  }

  const consultation = await Consultation.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Consultation Saved Successfully", consultation });
};

const getAllConsultations = async (req, res) => {
  const consultations = await Consultation.find();
  res.status(StatusCodes.OK).json({ consultations });
};

export { saveConsultation, getAllConsultations };

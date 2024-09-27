import Consultation from "../models/Consultation.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const saveConsultation = async (req, res) => {
  const { name, phone, email, message } = req.body;

  if (!name || !phone || !email || !message) {
    throw new BadRequestError("Please provide all values");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: [process.env.TO_EMAIL],
    subject: "New Consultation Request Received",
    text: `Hello Admins,

A new consultation request has been submitted with the following details:

Name: ${name}
Phone: ${phone}
Email: ${email}
Message: ${message}

Please reach out to the customer at your earliest convenience.

Best regards,
Sardar Ali Murad`,
  };

  await transporter.sendMail(mailOptions);
  const consultation = await Consultation.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Consultation Saved Successfully", consultation });
};

const getAllConsultations = async (req, res) => {
  const consultations = await Consultation.find();
  res.status(StatusCodes.OK).json({ consultations });
};

// Delete a single deleteConsultation by ID
const deleteConsultation = async (req, res) => {
  const { id } = req.params;
  const consultation = await Consultation.findByIdAndDelete(id);
  if (!consultation) {
    throw new NotFoundError(`Consultation with ID ${id} not found`);
  }

  res.status(StatusCodes.OK).json({ msg: "Consultation deleted successfully" });
};

export { saveConsultation, getAllConsultations, deleteConsultation };

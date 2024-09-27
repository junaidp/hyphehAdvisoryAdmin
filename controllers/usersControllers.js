import Users from "../models/Users.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const saveUser = async (req, res) => {
  const { firstname, lastname, email, phone, message, company } = req.body;

  if (!firstname || !lastname || !email || !phone || !message || !company) {
    throw new BadRequestError("Please provide all required values");
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

First Name: ${firstname}
Last Name: ${lastname}
Email: ${email}
Phone: ${phone}
Company: ${company}
Message: ${message}

Please reach out to the customer at your earliest convenience.

Best regards,
Sardar Ali Murad`,
  };

  await transporter.sendMail(mailOptions);

  const user = await Users.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "User Saved Successfully", user });
};

const getAllUsers = async (req, res) => {
  const users = await Users.find();
  res.status(StatusCodes.OK).json({ users });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await Users.findByIdAndDelete(id);
  if (!user) {
    throw new NotFoundError(`User with ID ${id} not found`);
  }

  res.status(StatusCodes.OK).json({ msg: "User deleted successfully" });
};

export { saveUser, getAllUsers, deleteUser };

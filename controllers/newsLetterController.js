import NewsLetter from "../models/NewsLetter.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";

const saveEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new BadRequestError("Please provide all values");
  }
  await NewsLetter.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "Email Saved Successfully" });
};

const getAllEmails = async (req, res) => {
  const emails = await NewsLetter.find();
  res.status(StatusCodes.OK).json({ emails });
};

export { saveEmail, getAllEmails };

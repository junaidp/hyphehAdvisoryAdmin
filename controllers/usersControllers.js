import Users from "../models/Users.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";

const saveUser = async (req, res) => {
  const { firstname, lastname, email, phone, message ,company} = req.body;

  if (!firstname || !lastname || !email || !phone || !message || !company) {
    throw new BadRequestError("Please provide all required values");
  }

  const user = await Users.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "User Saved Successfully", user });
};

const getAllUsers = async (req, res) => {
  const users = await Users.find();
  res.status(StatusCodes.OK).json({ users });
};

export { saveUser, getAllUsers };

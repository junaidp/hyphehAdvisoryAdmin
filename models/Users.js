import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please provide your first name"],
    },
    lastname: {
      type: String,
      required: [true, "Please provide your last name"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
    },
    phone: {
      type: String,
      required: [true, "Please provide your phone number"],
    },
    company: {
      type: String,
      required: [true, "Please provide company name"],
    },
    message: {
      type: String,
      required: [true, "Please provide your message"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Users", UserSchema);

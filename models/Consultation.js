import mongoose from "mongoose";

const ConsultationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },
    phone: {
      type: String,
      required: [true, "Please provide your phone number"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
    },
    message: {
      type: String,
      required: [true, "Please provide your message"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Consultation", ConsultationSchema);

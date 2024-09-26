import mongoose from "mongoose";

const NewsLetterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide email"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("NewsLetter", NewsLetterSchema);

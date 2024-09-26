import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    image: {
      type: String,
      required: [true, "Please provide an image URL"],
    },
    category: {
      type: String,
      enum: [
        "Manufacturing Industry",
        "Telecom Industry",
        "Energy",
        "Utilities",
        "Healthcare",
        "Real Estate",
        "Basic Materials",
        "Technology",
      ],
      required: [true, "Please provide a category"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blogs", BlogSchema);

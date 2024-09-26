import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./db/connect.js";
import newsLetterRouter from "./routes/newsLetterRoute.js";
import Consultation from "./routes/consultationRoute.js";
import Users from "./routes/usersRoute.js";
import Blogs from "./routes/BlogsRoute.js";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

dotenv.config();

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors({ origin: "*" }));
// Routes
app.use("/api/v1/newsLetter", newsLetterRouter);
app.use("/api/v1/consultation", Consultation);
app.use("/api/v1/users", Users);
app.use("/api/v1/blogs", Blogs);

// Error handling middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

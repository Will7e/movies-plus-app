import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import "dotenv/config";
import routes from "./src/routes/index.js";


const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", routes);

const port = process.env.PORT || 8000;
const server = http.createServer(app);
mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGODB_URL.toString())
  .then(() => {
    console.log("Connected to MongoDB");
    server.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

app.get("/home", (req, res) => {});

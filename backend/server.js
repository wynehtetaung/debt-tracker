import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./db/db.js";
import userRouter from "./routes/user.route.js";
import itemRouter from "./routes/Item.route.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true }));

// route setup
app.use("/api/static", (req, res) => {
  res.send("server is live");
});
app.use("/api/user", userRouter);
app.use("/api/item", itemRouter);

await connectDB();

app.listen(4000, () => console.log("server is running at 4000"));

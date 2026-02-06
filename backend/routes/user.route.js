import express from "express";
import {
  addUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/add", addUser);
userRouter.put("/update/:uid", updateUser);
userRouter.delete("/delete/:uid", deleteUser);

export default userRouter;

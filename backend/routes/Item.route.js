import express from "express";
import {
  addItem,
  deleteItem,
  getItems,
  updateItem,
} from "../controller/item.controller.js";

const itemRouter = express.Router();

itemRouter.get("/", getItems);
itemRouter.post("/add", addItem);
itemRouter.put("/update/:id", updateItem);
itemRouter.delete("/delete/:id", deleteItem);

export default itemRouter;

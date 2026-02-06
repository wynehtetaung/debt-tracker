import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, default: 0 },
  },
  { timestamps: true },
);
const Item = mongoose.model("Item", itemSchema);
export default Item;

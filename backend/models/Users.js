import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    date: { type: String, required: true },
    items: [
      {
        name: { type: String },
        price: { type: Number },
        qty: { type: Number },
      },
    ],
    paidStatus: { type: String, required: true, default: "unpaid" },
    paidAmount: { type: Number },
    unPaidAmount: { type: Number },
    totalPaid: { type: Number, required: true },
  },
  { timestamps: true },
);
const User = mongoose.model("User", userSchema);
export default User;

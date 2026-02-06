import Item from "../models/Items.js";
import User from "../models/Users.js";
import moment from "moment";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: 1 });
    res.json({
      success: true,
      users,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
    console.log(error.message);
  }
};

export const addUser = async (req, res) => {
  try {
    const { name, paidAmount, items } = req.body;

    const totalPaid = items.reduce((sum, item) => sum + item.price, 0);
    await Promise.all(
      items.map(async (item) => {
        await Item.findByIdAndUpdate(
          item._id,
          { $inc: { qty: -item.qty } },
          { new: true },
        );
      }),
    );
    const unPaidAmount = totalPaid - paidAmount || 0;
    const newUser = await new User({
      name,
      date: moment().format("LLL"),
      items,
      paidStatus: paidAmount
        ? paidAmount >= totalPaid
          ? "paid"
          : "partial"
        : "unpaid",
      paidAmount,
      unPaidAmount,
      totalPaid,
    }).save();
    res.json({
      success: true,
      newUser,
      message: "created new user",
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
    console.log(error.message);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const { amount, name } = req.body;

    const user = await User.findById(uid);
    if (!user)
      res.json({
        success: false,
        message: "user not found",
      });
    const paidAmount =
      user.paidAmount > 0 ? user.paidAmount + amount : amount || 0;
    const unPaidAmount = user.totalPaid - paidAmount;
    const paidStatus = paidAmount >= user.totalPaid ? "paid" : "partial";
    const updateUser = await User.findByIdAndUpdate(
      uid,
      {
        name,
        paidAmount,
        paidStatus,
        unPaidAmount,
      },
      { new: true },
    );
    res.json({
      success: true,
      message: "user updated",
      updateUser,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
    console.log(error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { uid } = req.params;
    await User.findByIdAndDelete(uid);
    res.json({
      success: true,
      message: "user deleted",
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
    console.log(error.message);
  }
};

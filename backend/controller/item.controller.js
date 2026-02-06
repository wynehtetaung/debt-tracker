import Item from "../models/Items.js";

export const getItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: 1 });
    res.json({
      success: true,
      items,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
    console.log(error.message);
  }
};

export const addItem = async (req, res) => {
  try {
    const { name, price, qty } = req.body;
    const newItem = await new Item({
      name,
      price,
      qty,
    }).save();
    res.json({
      success: true,
      item: newItem,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
    console.log(error.message);
  }
};

export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, qty } = req.body;
    const item = await Item.findByIdAndUpdate(
      id,
      { name, price, qty },
      { new: true },
    );
    res.json({
      success: true,
      item,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
    console.log(error.message);
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    await Item.findByIdAndDelete(id);
    res.json({
      success: true,
      message: "item deleted",
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
    console.log(error.message);
  }
};

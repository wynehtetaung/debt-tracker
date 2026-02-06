import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("connected database");
    });

    await mongoose.connect(`${process.env.DB_URL}/debt-tracker`);
  } catch (error) {
    console.log(error.message);
  }
};

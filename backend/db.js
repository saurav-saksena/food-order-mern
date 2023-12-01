const mongoose = require("mongoose");
require("dotenv").config();

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("database connected with mongodb");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectMongo;

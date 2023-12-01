const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  foodid: {
    type: String,
  },
  name: {
    type: String,
  },
  CategoryName: {
    type: String,
  },
  img: {
    type: String,
  },
  size: {
    type: String,
  },
  qty: {
    type: String,
  },
  totalPrice: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("foodcarts", CartSchema);

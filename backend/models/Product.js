const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  CategoryName: {
    type: String,
  },
  name: {
    type: String,
  },
  img: {
    type: String,
  },
  options: {
    type: Array,
  },
  description: {
    type: String,
  },
});
module.exports = mongoose.model("foodnames", productSchema);

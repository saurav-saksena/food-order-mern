const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  location: {
    type: String,
    required: [true, "location for address is required"],
  },
  city: {
    type: String,
    default: "",
  },
  pincode: {
    type: String,
    default: "",
  },
  phone: {
    type: Number,
    default: "",
  },
  pic: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("users", UserSchema);

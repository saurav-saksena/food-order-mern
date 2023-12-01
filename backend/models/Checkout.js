const mongoose = require("mongoose");

const CheckoutSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: [true, "User Id Must Required"],
  },
  useremail: {
    type: String,
  },
  foodtype: {
    type: String,
  },
  totalqty: {
    type: String,
  },
  totalbillprice: {
    type: Number,
  },
  deliverycharge: {
    type: Number,
    default: 0,
  },
  paymentmethod: {
    type: String,
    default: "cod",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  foodproducts: [
    {
      foodid: {
        type: String,
      },
      name: {
        type: String,
      },
      CategoryName: {
        type: String,
      },
      size: {
        type: String,
      },
      totalPrice: {
        type: Number,
      },
      qty: {
        type: String,
      },
      img: {
        type: String,
      },
    },
  ],
});
const Checkout = new mongoose.model("checkouts", CheckoutSchema);

module.exports = Checkout;

const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Category = require("../models/Category");

router.get("/fetchfood", async (req, res) => {
  try {
    const foodList = await Product.find({});
    const foodCategory = await Category.find({}).sort({ _id: -1 });

    res.send({ foodList, foodCategory });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;

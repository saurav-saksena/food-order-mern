const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

router.get("/fetchfoodcategory", async (req, res) => {
  try {
    let data = await Category.find({});
    res.send({ data });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;

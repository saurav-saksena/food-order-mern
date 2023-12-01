const router = require("express").Router();
const Foodcart = require("../models/Foodcart");
const Product = require("../models/Product");

const fetchuser = require("../verify/fetchuser");

router.post("/foodcart", fetchuser, async (req, res) => {
  try {
    let data = await Foodcart.find({
      userid: req.user.id,
      foodid: req.body.foodid,
    });
    if (data.length !== 0) {
      data = await Foodcart.deleteOne({
        userid: req.user.id,
        foodid: req.body.foodid,
      });
    }

    let foodDetail = await Product.findById(req.body.foodid);
    let result = await Foodcart.create({
      userid: req.user.id,
      foodid: req.body.foodid,
      size: req.body.size,
      qty: req.body.qty,
      totalPrice: req.body.totalPrice,
      name: foodDetail.name,
      img: foodDetail.img,
      CategoryName: foodDetail.CategoryName,
    });

    res.send({ success: true, data: result });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "server error !" });
  }
});

router.get("/foodcart/get", fetchuser, async (req, res) => {
  try {
    const cart = await Foodcart.find({ userid: req.user.id }).sort({ _id: -1 });
    res.send({ success: true, data: cart });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "server error" });
  }
});

router.delete("/foodcart/delete/:id", fetchuser, async (req, res) => {
  try {
    const cart = await Foodcart.deleteOne({ _id: req.params.id });
    res.send({ success: true, data: cart });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "server error" });
  }
});
module.exports = router;

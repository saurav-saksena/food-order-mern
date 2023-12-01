const router = require("express").Router();
const Checkout = require("../models/Checkout");
const fetchuser = require("../verify/fetchuser");
const User = require("../models/User");

router.post("/checkout", fetchuser, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    let data = new Checkout(req.body);
    data.userid = user._id;
    data.useremail = user.email;
    await data.save();
    res.send({ success: true, data: data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "server error" });
  }
});

router.get("/checkoutdata", fetchuser, async (req, res) => {
  try {
    const checkout = await Checkout.find({ userid: req.user.id }).sort({
      _id: -1,
    });
    res.send({ success: true, data: checkout });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "server error" });
  }
});
module.exports = router;

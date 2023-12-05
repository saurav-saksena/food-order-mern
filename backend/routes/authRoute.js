const express = require("express");
const router = express.Router();
const fs = require("fs");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Jwt = require("jsonwebtoken");
const fetchuser = require("../verify/fetchuser");
const { body, validationResult } = require("express-validator");
const multer = require("multer");

//multer logic for update profile pic

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/user");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
  size: 10485760, //10MB Limit
});

const upload = multer({ storage: storage });

//create user endpoint for signup
router.post(
  "/createuser",
  body("email", "email is not valid !").isEmail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ msg: "email is not valid" });
    }
    try {
      // checking whether user already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .send({ msg: "user with this email id already exist" });
      }
      let bodyPassword = req.body.password;
      if (!bodyPassword) {
        return res.status(400).send({ msg: "email and password required" });
      }
      //hashing password for security reasons
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(bodyPassword, salt);

      let newuser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
        location: req.body.location,
      });
      res.send({ success: true, data: newuser });
    } catch (error) {
      if (error.keyValue) {
        res.status(400).send({ msg: "user with this email id already exists" });
      } else if (error.errors.name) {
        res.status(400).send({ msg: "name is required" });
      } else if (error.errors.email) {
        res.status(400).send({ msg: "email is required" });
      } else if (error.errors.password) {
        res.status(400).send({ msg: "please create password" });
      } else if (error.errors.location) {
        res.status(400).send({ msg: "please provide address or location" });
      } else {
        res.status(500).send({ msg: "something went wrong !" });
      }
    }
  }
);

// login end point for user to get access to application api/auth/login method:POST

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ msg: "email and password required" });
  }
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ msg: "invalid email or password" });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).send({ msg: "invalid email or password" });
    }
    const data = {
      user: {
        id: user.id,
      },
    };

    const authToken = Jwt.sign(data, process.env.SEC_TOKEN_KEY);
    res.send({ success: true, authToken });
  } catch (error) {
    res.status(500).send({ msg: "something went wrong" });
  }
});
//fetching userdetails with authorization

router.get("/userdetails", fetchuser, async (req, res) => {
  try {
    const userid = req.user.id;
    const user = await User.findById(userid).select("-password");
    res.send({ success: true, user });
  } catch (error) {
    res.status(500).send({ msg: "server error" });
  }
});

//update userdetails
router.put(
  "/updateprofile/:id",
  fetchuser,
  upload.single("pic"),
  async (req, res) => {
    try {
      let data = await User.findById(req.params.id);
      if (!data) {
        return res.status(404).send({ msg: "user not found" });
      }
      if (data.id !== req.user.id) {
        return res.status(401).send({ msg: "not allowed !!!" });
      }
      let { name, phone, city, location, pincode } = req.body;

      if (name) {
        data.name = name;
      }
      if (phone) {
        data.phone = phone;
      }
      if (city) {
        data.city = city;
      }
      if (location) {
        data.location = location;
      }
      if (pincode) {
        data.pincode = pincode;
      }
      if (req.file) {
        try {
          fs.unlinkSync("public/uploads/user/" + data.pic);
        } catch (error) {}
        data.pic = req.file.filename;
      }
      await data.save();
      res.send({ success: true, msg: "profile updated successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ msg: "server error" });
    }
  }
);

module.exports = router;

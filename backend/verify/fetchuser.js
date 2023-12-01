const Jwt = require("jsonwebtoken");
require("dotenv").config();
const fetchuser = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(403).send({ msg: "Please provide token" });
  }
  try {
    const data = Jwt.verify(token, process.env.SEC_TOKEN_KEY);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ msg: "you are not authorized !" });
  }
};
module.exports = fetchuser;

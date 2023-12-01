const express = require("express");
const cors = require("cors");
const connectMongo = require("./db");
require("dotenv").config();
connectMongo();
const app = express();
const port = 4000;
app.get("/", (req, res) => {
  res.send(
    `    backend of Food_Hunger application running succesfully by ${process.env.AUTHOR} !
`
  );
});
app.use(express.json());
app.use(cors());
app.use("/public", express.static("public"));
app.use("/api", require("./routes/authRoute"));
app.use("/api", require("./routes/productRoutes"));
app.use("/api", require("./routes/productCategoryRoutes"));
app.use("/api", require("./routes/foodcartRoute"));
app.use("/api", require("./routes/checkoutRoute"));

app.listen(port, () => {
  console.log("app listening at http://localhost:" + port);
});

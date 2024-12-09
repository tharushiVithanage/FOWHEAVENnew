const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
require("./Models/db.js");
const cors = require("cors"); // Import cors

const AuthRouter = require("./Routers/AuthRouter.js");
const ProductRouter = require("./Routers/ProductRouter.js");

const PORT = process.env.PORT || 8080;

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use(bodyParser.json());
app.use(cors()); // Enable CORS
app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

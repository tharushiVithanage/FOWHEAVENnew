const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./Models/db.js");

const AuthRouter = require("./Routers/AuthRouter.js");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

app.use("/auth", AuthRouter);

app.get("/ping", (req, res) => res.send("pong"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const mongoose = require("mongoose");
require("dotenv").config(); // Ensure environment variables are loaded

const mongo_url = process.env.MONGO_CONN;

if (!mongo_url) {
  console.error("Error: MongoDB connection string (MONGO_CONN) is undefined.");
  process.exit(1); // Exit if no connection string is provided
}

mongoose
  .connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

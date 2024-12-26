const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
require("dotenv").config();
require("./Models/db.js");
require("./Models/Recepies.js");

const AuthRouter = require("./Routers/AuthRouter.js");
const RecepiesRoter = require("./Routers/RecepiesRoter.js");

const app = express();
const PORT = process.env.PORT || 8080;

// Define storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload/images"); // Path to store uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Ensure unique filenames
  },
});

const upload = multer({ storage: storage });

// Serve static files (images) from the upload directory
app.use("/upload", express.static(path.join(__dirname, "upload")));

// Define a route for uploading an image
app.post("/upload", upload.single("profile"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "No file uploaded",
      success: false,
    });
  }

  // If file uploaded successfully, return the file details
  res.status(200).json({
    message: "File uploaded successfully",
    file: req.file,
  });
});

app.use(cors());
app.use(bodyParser.json());

app.use(RecepiesRoter);
app.use("/auth", AuthRouter);

// Middleware
app.use(express.json());

app.use("/", RecepiesRoter);

app.get("/ping", (req, res) => res.send("pong"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

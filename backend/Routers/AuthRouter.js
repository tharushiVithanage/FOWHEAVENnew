const express = require("express");
const {
  signup,
  login,
  updateProfile,
} = require("../Controllers/AuthController");
const {
  signupValidation,
  loginValidation,
  updateProfileValidation,
} = require("../Middlewares/AuthValidation");
const ensureAuthenticated = require("../Middlewares/Auth");

const router = express.Router();

// Define routes with necessary middlewares

// POST /signup: User signup route with validation
router.post("/signup", signupValidation, signup);

// POST /login: User login route with validation
router.post("/login", loginValidation, login);

// PUT /update-profile: User profile update route with authentication and validation
router.put(
  "/update-profile",
  ensureAuthenticated, // Ensure user is authenticated
  updateProfileValidation, // Validate input data
  updateProfile // Controller to handle the request
);

module.exports = router;

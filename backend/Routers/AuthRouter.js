const { signup, login } = require("../Controllers/AuthController");
const { signupValidation, loginValidation } = require("../Middlewares/AuthValidation"); // Import signupValidation middleware

const router = require("express").Router();




router.post("/login", loginValidation, login);
router.post("/signup", signupValidation, signup); // Use signupValidation middleware before signup

module.exports = router;

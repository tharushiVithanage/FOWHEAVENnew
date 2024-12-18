const express = require("express");
const {
  signup,
  login,
  updateProfile,
  logout,
} = require("../Controllers/AuthController");
const {
  signupValidation,
  loginValidation,
  updateProfileValidation,
} = require("../Middlewares/AuthValidation");
const ensureAuthenticated = require("../Middlewares/Auth");

const router = express.Router();

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.get("/profile", ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    res.status(200).json({
      message: "User profile fetched successfully",
      success: true,
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
});
router.put(
  "/update-profile",
  ensureAuthenticated,
  updateProfileValidation,
  updateProfile
);
router.post("/logout", ensureAuthenticated, logout);

module.exports = router;

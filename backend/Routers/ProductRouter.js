// Import signupValidation middleware
const ensureAuthenticated = require("../Middlewares/Auth");
const router = require("express").Router();

router.get("/", ensureAuthenticated, (req, res) => {
  res.status(200).json([
    {
      name: "rotti",
      discription: "hhhhhhhhhhhhhhhhhhhhhhhhhhhh",
    },
    {
      name: "bun",
      discription: "bbbbbbbb",
    },
  ]);
});
// Use signupValidation middleware before signup

module.exports = router;

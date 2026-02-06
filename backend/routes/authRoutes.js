const express = require("express");
const router = express.Router();

router.options("*", (req, res) => res.sendStatus(204));

const {
  register,
  login,
  getMe,
  updateDetails,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.put("/updatedetails", protect, updateDetails);

module.exports = router;

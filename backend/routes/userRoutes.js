const express = require("express");
const protect = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

router.get("/dashboard", protect, async (req, res) => {
  const user = await User.findById(req.user.id).populate("registeredEvents");

  const upcoming = user.registeredEvents.filter(
    (event) => new Date(event.date) > new Date()
  );

  const past = user.registeredEvents.filter(
    (event) => new Date(event.date) <= new Date()
  );

  res.json({ upcoming, past });
});

module.exports = router;

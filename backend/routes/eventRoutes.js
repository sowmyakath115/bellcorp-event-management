const express = require("express");
const Event = require("../models/Event");
const protect = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

// GET EVENTS with search + filter + pagination
router.get("/", async (req, res) => {
  const { search, location, category, page = 1, limit = 10 } = req.query;

  const query = {};

  if (search) query.$text = { $search: search };
  if (location) query.location = location;
  if (category) query.category = category;

  const events = await Event.find(query)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.json(events);
});


// GET single event by ID
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// REGISTER EVENT
router.post("/:id/register", protect, async (req, res) => {
  const event = await Event.findById(req.params.id);
  const user = await User.findById(req.user.id);

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  // 🚫 Prevent duplicate registration
  if (user.registeredEvents.includes(event._id)) {
    return res.status(400).json({ message: "Already registered" });
  }

  if (event.availableSeats <= 0) {
    return res.status(400).json({ message: "No seats available" });
  }

  event.availableSeats -= 1;
  user.registeredEvents.push(event._id);

  await event.save();
  await user.save();

  res.json({ message: "Registered successfully" });
});


// CANCEL REGISTRATION
router.post("/:id/cancel", protect, async (req, res) => {
  const event = await Event.findById(req.params.id);
  const user = await User.findById(req.user.id);

  event.availableSeats += 1;
  user.registeredEvents = user.registeredEvents.filter(
    (id) => id.toString() !== event._id.toString()
  );

  await event.save();
  await user.save();

  res.json({ message: "Registration cancelled" });
});

module.exports = router;

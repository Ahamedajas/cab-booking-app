const express = require("express");
const router = express.Router();

const { bookRide, getRides } = require("../controllers/rideController");
const auth = require("../middleware/authMiddleware");

// ✅ APPLY MIDDLEWARE HERE
router.post("/book", auth, bookRide);
router.get("/", auth, getRides);

module.exports = router;
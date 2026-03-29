const Ride = require("../models/Ride");

// 🚖 BOOK RIDE
exports.bookRide = async (req, res) => {
  try {
    console.log("USER IN CONTROLLER:", req.user); // 👈 ADD

    const ride = await Ride.create({
      ...req.body,
      user: req.user?.id,
    });

    res.json(ride);
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// 📜 GET USER RIDES
exports.getRides = async (req, res) => {
  try {
    const rides = await Ride.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
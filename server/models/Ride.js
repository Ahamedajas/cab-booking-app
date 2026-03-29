const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  userId: String,
  pickup: [Number],
  drop: [Number],
  distance: Number,
  fare: Number,
  user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
},
  status: {
    type: String,
    default: "pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Ride", rideSchema);
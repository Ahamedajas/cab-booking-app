import { useEffect, useState } from "react";
import { getRides } from "../api/ride";

function Rides() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    try {
      const res = await getRides();
      console.log("Rides:", res.data);
      setRides(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
  <h2 className="text-xl font-bold mb-4">Ride History 🚖</h2>

  {rides.length === 0 ? (
    <p>No rides found 🚫</p>
  ) : (
    rides.map((ride) => (
      <div key={ride._id} className="bg-white p-4 mb-3 rounded-xl shadow">
        <p><b>Pickup:</b> {ride.pickup?.join(", ")}</p>
        <p><b>Drop:</b> {ride.drop?.join(", ")}</p>
        <p><b>Distance:</b> {ride.distance?.toFixed(2)} km</p>
        <p><b>Fare:</b> ₹{ride.fare}</p>
      </div>
    ))
  )}
</div>
  );
}

export default Rides;
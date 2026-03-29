import MapComponent from "../components/Map";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import { useEffect, useState } from "react";
import { getRides } from "../api/ride";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [rides, setRides] = useState([]);

  // ✅ FETCH RIDES (THIS WAS MISSING)
  useEffect(() => {
    const fetchRides = async () => {
      try {
        const res = await getRides();
        console.log("RIDES:", res.data); // debug
        setRides(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRides();
  }, []);

  // ✅ CALCULATIONS
  const totalRides = rides.length;
  const totalSpent = rides.reduce((sum, ride) => sum + (ride.fare || 0), 0);
  const lastRide = rides[0]?.fare || 0;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto">

        {/* 🔹 HEADER */}
        <div className="bg-white p-5 rounded-2xl shadow mb-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">🚖 Cab Dashboard</h1>
            <p className="text-gray-500 text-sm">
              Welcome {user?.name || "User"} 👋
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => navigate("/rides")}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              History
            </button>

            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>

        {/* 🔹 STATS (DYNAMIC) */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-white p-4 rounded-xl shadow text-center">
            <p className="text-gray-500 text-sm">Total Rides</p>
            <h2 className="text-xl font-bold">{totalRides}</h2>
          </div>

          <div className="bg-white p-4 rounded-xl shadow text-center">
            <p className="text-gray-500 text-sm">Total Spent</p>
            <h2 className="text-xl font-bold">₹{totalSpent}</h2>
          </div>

          <div className="bg-white p-4 rounded-xl shadow text-center">
            <p className="text-gray-500 text-sm">Last Ride</p>
            <h2 className="text-xl font-bold">₹{lastRide}</h2>
          </div>
        </div>

        {/* 🔹 MAIN GRID */}
        <div className="grid grid-cols-3 gap-4">

          {/* 🗺️ MAP */}
          <div className="col-span-2 bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold mb-2">Select Pickup & Drop 📍</h2>
            <MapComponent />
          </div>

          {/* 📋 SIDE PANEL */}
          <div className="flex flex-col gap-4">

            {/* 💡 TIP */}
            <div className="bg-yellow-100 p-4 rounded-xl shadow">
              <h3 className="font-semibold mb-1">💡 Tip</h3>
              <p className="text-sm text-gray-700">
                Click once for pickup and again for drop to calculate fare.
              </p>
            </div>

            {/* 🚖 QUICK ACTION */}
            <div className="bg-white p-4 rounded-xl shadow">
              <h3 className="font-semibold mb-2">Quick Actions</h3>

              <button
                onClick={() => navigate("/rides")}
                className="w-full bg-blue-500 text-white py-2 rounded mb-2"
              >
                View Rides
              </button>

              <button
                onClick={() => window.scrollTo({ top: 300, behavior: "smooth" })}
                className="w-full bg-green-500 text-white py-2 rounded"
              >
                Book Ride
              </button>
            </div>

            {/* 📊 INFO */}
            <div className="bg-white p-4 rounded-xl shadow">
              <h3 className="font-semibold mb-2">About App</h3>
              <p className="text-sm text-gray-600">
                Smart cab booking app with real-time fare calculation,
                car selection, and secure authentication.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
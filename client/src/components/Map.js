import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents
} from "react-leaflet";
import { useState } from "react";
import { bookRide } from "../api/ride";
import CarSelector from "./CarSelector";

function LocationSelector({ setPickup, setDrop, pickup }) {
  useMapEvents({
    click(e) {
      if (!pickup) {
        setPickup([e.latlng.lat, e.latlng.lng]);
      } else {
        setDrop([e.latlng.lat, e.latlng.lng]);
      }
    }
  });
  return null;
}

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

function MapComponent() {
  const [pickup, setPickup] = useState(null);
  const [drop, setDrop] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);

  let distance = 0;
  let fare = 0;

  if (pickup && drop && selectedCar) {
    distance = calculateDistance(
      pickup[0],
      pickup[1],
      drop[0],
      drop[1]
    );

    fare = (50 + distance * 10) * selectedCar.priceMultiplier;
  }

  const handleBookRide = async () => {
    try {
      await bookRide({
        pickup,
        drop,
        distance,
        fare,
        carType: selectedCar.name
      });

      alert("Ride Booked 🚖");

      setPickup(null);
      setDrop(null);
      setSelectedCar(null);
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Booking Failed ❌");
    }
  };

  return (
    <div>
      <MapContainer center={[13.0827, 80.2707]} zoom={13} style={{ height: "400px" }}>
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationSelector
          setPickup={setPickup}
          setDrop={setDrop}
          pickup={pickup}
        />

        {pickup && (
          <Marker position={pickup}>
            <Popup>Pickup 📍</Popup>
          </Marker>
        )}

        {drop && (
          <Marker position={drop}>
            <Popup>Drop 📍</Popup>
          </Marker>
        )}
      </MapContainer>

      <div className="mt-3">
        <p>Pickup: {pickup ? pickup.join(", ") : "Not selected"}</p>
        <p>Drop: {drop ? drop.join(", ") : "Not selected"}</p>

        <CarSelector
          selectedCar={selectedCar}
          setSelectedCar={setSelectedCar}
        />

        {pickup && drop && selectedCar && (
          <>
            <p>Distance: {distance.toFixed(2)} km</p>
            <p>Fare: ₹{fare.toFixed(0)}</p>

            <button
              onClick={handleBookRide}
              className="bg-green-500 text-white px-4 py-2 rounded mt-2"
            >
              Book Ride 🚖
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default MapComponent;
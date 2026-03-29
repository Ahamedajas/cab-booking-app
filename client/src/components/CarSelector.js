import MiniCooper from "../assets/cars/MiniCooper.jpeg";
import Benz from "../assets/cars/Benz.jpeg";
import Defender from "../assets/cars/Defender.jpeg";
import RollsRoyce from "../assets/cars/RollsRoyce.jpeg";

const cars = [
  { name: "MiniCooper", priceMultiplier: 1, image: MiniCooper },
  { name: "Benz", priceMultiplier: 1.5, image: Benz },
  { name: "Defender", priceMultiplier: 2, image: Defender },
  { name: "RollsRoyce", priceMultiplier: 3, image: RollsRoyce }
];

function CarSelector({ selectedCar, setSelectedCar }) {
  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {cars.map((car) => (
        <div
          key={car.name}
          onClick={() => setSelectedCar(car)}
          className={`
            p-4 rounded-xl cursor-pointer transition-all duration-300
            border shadow-sm hover:shadow-lg hover:scale-105
            ${selectedCar?.name === car.name
              ? "border-blue-500 bg-blue-50 shadow-md"
              : "bg-white"
            }
          `}
        >
          {/* 🚗 IMAGE */}
          <img
            src={car.image}
            alt={car.name}
            className="h-28 w-full object-contain rounded-lg"
          />

          {/* 🏷️ NAME */}
          <p className="text-center mt-3 font-semibold text-gray-800">
            {car.name}
          </p>

          {/* 💰 PRICE */}
          <p className="text-center text-sm text-gray-500">
            ₹{car.priceMultiplier}x fare
          </p>
        </div>
      ))}
    </div>
  );
}

export default CarSelector;
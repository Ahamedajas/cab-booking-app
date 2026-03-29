import { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import redLambo from "../assets/cars/RedLambo.jpg";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(form);
      alert("Registered Successfully 🎉");
      navigate("/");
    } catch (err) {
      alert("Registration Failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">

      {/* 🔥 APP TITLE */}
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        🚖 SmartCab
      </h1>

      {/* 🔹 CARD */}
      <div className="flex bg-white rounded-2xl shadow-lg overflow-hidden w-[800px]">

        {/* 🚗 LEFT IMAGE */}
        <div className="w-1/2 hidden md:block">
          <img
            src={redLambo}
            alt="car"
            className="h-full w-full object-cover"
          />
        </div>

        {/* 🔹 RIGHT FORM */}
        <div className="w-full md:w-1/2 p-8">

          <p className="text-gray-500 text-sm text-center mb-4">
            Create your account 🚀
          </p>

          <form onSubmit={handleSubmit}>
            <h2 className="text-lg font-semibold mb-4 text-center">
              Register
            </h2>

            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mb-3"
              required
            />

            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mb-3"
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mb-4"
              required
            />

            <button className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg">
              Register ✅
            </button>
          </form>

          {/* 🔹 LOGIN LINK */}
          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => navigate("/")}
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;
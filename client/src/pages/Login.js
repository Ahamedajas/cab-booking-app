import { useState } from "react";
import { loginUser } from "../api/auth";
import { setToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import poschepink from "../assets/cars/poschepink.avif";

function Login() {
  const [form, setForm] = useState({
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
      const res = await loginUser(form);

      setToken(res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      alert("Login Failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">

      {/* 🔥 MAIN APP TITLE */}
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Eber Cabs
      </h1>

      {/* 🔹 CARD */}
      <div className="flex bg-white rounded-2xl shadow-lg overflow-hidden w-[800px]">

        {/* 🚗 LEFT IMAGE */}
        <div className="w-1/2 hidden md:block">
          <img
            src={poschepink}
            alt="car"
            className="h-full w-full object-cover"
          />
        </div>

        {/* 🔹 RIGHT FORM */}
        <div className="w-full md:w-1/2 p-8">

          <p className="text-gray-500 text-sm text-center mb-4">
            Fast • Reliable • Affordable
          </p>

          <form onSubmit={handleSubmit}>
            <h2 className="text-lg font-semibold mb-4 text-center">
              Login to your account
            </h2>

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

            <button className="w-full bg-blue-500 text-white p-3 rounded-lg">
              Login 🚀
            </button>
          </form>

          <p className="text-center mt-4 text-sm">
            Don't have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;
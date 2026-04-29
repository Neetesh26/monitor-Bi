import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { registerUser, setLoading, setError } from "../../feature/AuthSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.users);

  const [form, setForm] = useState({
    email: "sufiyan@gmil.com",
    password: "sufn@123",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(setLoading(true));

    try {
      const res = await axiosInstance.post("/auth/login", form);

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
      }

      dispatch(registerUser(res.data));
      dispatch(setLoading(false));

      alert("Login successful ✅");
      navigate("/dashboard");
    } catch (err) {
      dispatch(setError(err.response?.data || "Error"));
      dispatch(setLoading(false));
      alert("Login failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <div className="bg-white border rounded-lg shadow-lg w-[400px] p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">Sign In</h2>

        <p className="text-sm text-gray-500 mb-6 text-center">
          Use <span className="font-medium">sufiyan@gmil.com</span> / <span className="font-medium">sufn@123</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

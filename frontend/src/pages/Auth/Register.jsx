import React, { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  setLoading,
  setError,
} from "../../feature/AuthSlice";
import { axiosInstance } from "../../config/axiosInstance";

const Register = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.users);

  const [searchParams] = useSearchParams();
  const [token, setToken] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // ✅ Get token from URL
  useEffect(() => {
    const t = searchParams.get("token");
    if (t) setToken(t);
  }, [searchParams]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(setLoading(true));

    try {
      const payload = {
        ...form,
        token,
      };

      const res = await axiosInstance.post("/auth/register", payload);

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
      }

      dispatch(registerUser(res.data));
      dispatch(setLoading(false));

      alert("Registered Successfully ✅");
      navigate("/dashboard");
    } catch (err) {
      dispatch(setError(err.response?.data || "Error"));
      dispatch(setLoading(false));
      alert("Registration Failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <div className="bg-white border rounded-lg shadow-lg w-[400px] p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
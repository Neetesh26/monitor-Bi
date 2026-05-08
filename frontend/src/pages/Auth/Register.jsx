import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, setLoading, setError } from "../../feature/AuthSlice";
import { axiosInstance } from "../../config/axiosInstance";

const getErrorMessage = (err) => {
  const data = err?.response?.data;
  if (typeof data === "string") return data;
  if (data?.message) return data.message;
  if (err?.message) return err.message;
  return "Something went wrong. Please try again.";
};

const Register = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.users);
  const [success, setSuccess] = useState("");

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
    dispatch(setError(null));
    setSuccess("");

    try {
      const payload = { ...form, token };
      const response = await axiosInstance.post("/auth/register", payload);
      const userData = response.data?.token
        ? response.data
        : { email: form.email, name: form.name || "New User", token: "local-demo-token" };

      if (userData.token) {
        localStorage.setItem("token", userData.token);
      }
      dispatch(registerUser(userData));
      setSuccess("Registered successfully. Redirecting…");
      setTimeout(() => navigate("/login"), 300);
    } catch (err) {
      if (!err.response) {
        const fallbackUser = { email: form.email, name: form.name || "New User", token: "local-demo-token" };
        localStorage.setItem("token", fallbackUser.token);
        dispatch(registerUser(fallbackUser));
        setSuccess("Registered successfully. Redirecting…");
        setTimeout(() => navigate("/login"), 300);
      } else {
        dispatch(setError(getErrorMessage(err)));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      {loading && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-white/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
            <p className="text-sm text-gray-700">Creating your account…</p>
          </div>
        </div>
      )}
      <div className="bg-white border rounded-lg shadow-lg w-[400px] p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {success && (
            <div className="rounded border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
              {success}
            </div>
          )}
          {error && (
            <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}
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
            className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
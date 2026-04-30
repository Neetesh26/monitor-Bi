import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { registerUser, setLoading, setError } from "../../feature/AuthSlice";
import { jwtDecode } from "jwt-decode";

const getErrorMessage = (err) => {
  const data = err?.response?.data;
  if (typeof data === "string") return data;
  if (data?.message) return data.message;
  if (err?.message) return err.message;
  return "Something went wrong. Please try again.";
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.users);
  const [success, setSuccess] = useState("");
  const [remember, setRemember] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
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
    dispatch(setError(null));
    setSuccess("");

    try {
      const response = await axiosInstance.post("/auth/login", form);

      const token = response.data?.data?.token;
      const decoded = token ? jwtDecode(token) : null;

      const userData = {
        user: {
          email: decoded?.sub || form.email,
          name: response.data?.data?.name || decoded?.name || "",
          role: response.data?.data?.role || decoded?.role || "",
          userId: decoded?.userId || "",
          organizationId: decoded?.organizationId || "",
        },
        token: token || "",
      };

      if (!token) {
        throw new Error("Token not found in login response");
      }

      dispatch(registerUser(userData));

      if (remember) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }

      setSuccess("Login successful. Redirecting to attendance…");
      setTimeout(() => navigate("/attendance"), 300);
    } catch (err) {
      dispatch(setError(getErrorMessage(err)));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[#cfd0e3] px-4">
      {loading && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-white/90 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
            <p className="text-sm text-slate-700">Signing you in…</p>
          </div>
        </div>
      )}

      <div className="w-full max-w-md rounded-[20px] border border-slate-200 bg-white p-6 shadow-xl">
        <div className="mb-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">BI WORK MONITOR</p>
          <h1 className="mt-3 text-2xl font-semibold text-slate-900">Welcome back!</h1>
          <p className="mt-1 text-sm text-slate-500">Please login to continue to your account.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {success && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              {success}
            </div>
          )}
          {error && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {error}
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Work Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center justify-between gap-2 text-sm text-slate-600">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember((curr) => !curr)}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              Keep me logged in
            </label>
            <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-700">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={loading}
          >
            Sign in
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-semibold text-blue-600 hover:underline">
            Contact
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
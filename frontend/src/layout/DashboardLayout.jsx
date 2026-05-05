import React, { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  Search,
  Plus,
  LogOut,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../config/axiosInstance";
import { jwtDecode } from "jwt-decode";
import { removeUser } from "../feature/AuthSlice";
import DashPng from "../assets/Layout.svg";
import BagSimple from "../assets/BagSimple.svg";
import Clock from "../assets/Clock.svg";
import UserFour from "../assets/UsersFour.svg";
import FileText from "../assets/FileText.svg";
import Images from "../assets/Images.svg";
import DashPngActive from "../assets/icons/LayoutActive.svg";
import BagSimpleActive from "../assets/icons/BagSimpleActive.svg";
import ClockActive from "../assets/icons/ClockActive.svg";
import UserFourActive from "../assets/icons/UsersFourActive.svg";
import ImagesActive from "../assets/icons/ImagesActive.svg";

const navItems = [
  {
    label: "Dashboard",
    icon: { inactive: DashPng, active: DashPngActive },
    path: "/dashboard",
  },
  {
    label: "Time & Attendance",
    icon: { inactive: Clock, active: ClockActive },
    path: "/time-attendance",
  },
  {
    label: "Teams",
    icon: { inactive: UserFour, active: UserFourActive },
    path: "/teams",
  },
  {
    label: "Projects",
    icon: { inactive: BagSimple, active: BagSimpleActive },
    path: "/projects",
  },
  {
    label: "Screenshots",
    icon: { inactive: Images, active: ImagesActive },
    path: "/screenshots",
  },
  {
    label: "Reports",
    icon: { inactive: FileText },
    children: [{ label: "Apps & Websites", path: "/setting" }],
  },
];

const getInitials = (name = "") => {
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

const DashboardLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const menuRef = useRef(null);

  const [profile, setProfile] = useState(null);
  const [loadingName, setLoadingName] = useState(false);
  const [nameError, setNameError] = useState("");
  const [query, setQuery] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token && !user) {
      navigate("/login");
      return;
    }

    const fetchUserByEmail = async () => {
      try {
        setLoadingName(true);
        setNameError("");

        const decoded = token ? jwtDecode(token) : null;
        const email = decoded?.sub || user?.email;

        if (!email) {
          setProfile(null);
          return;
        }

        const res = await axiosInstance.get(
          `/users/by-email/${encodeURIComponent(email)}`
        );
        setProfile(res.data?.data || null);
      } catch (err) {
        setNameError(
          err?.response?.data?.error?.message ||
            err.message ||
            "Failed to load user"
        );
      } finally {
        setLoadingName(false);
      }
    };

    fetchUserByEmail();
  }, [user, navigate]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    dispatch(removeUser());
    navigate("/login");
  };

  const displayName =
    profile?.name || user?.name || user?.email?.split("@")[0] || "User";
  const initials = getInitials(displayName);

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-800">
      <div className="flex min-h-screen">
        {/* SIDEBAR */}
        <aside className="hidden lg:flex w-64 flex-col border-r border-slate-200 bg-white px-4 py-5">
          <div className="flex items-center gap-3 px-2 mb-8">
            <div className="h-10 w-10 rounded-xl bg-black text-white flex items-center justify-center font-bold">
              bi
            </div>
            <div>
              <p className="text-sm font-semibold tracking-wide text-blue-600">
                WORK MONITOR
              </p>
              <p className="text-xs text-slate-400">Dashboard</p>
            </div>
          </div>

          {/* NAVIGATION */}
          <nav className="space-y-1">
            {navItems.map(({ label, icon, path, children }) => {
              const isOpen = openDropdown === label;

              // DROPDOWN ITEM (Reports)
              if (children) {
                return (
                  <div key={label}>
                    <button
                      onClick={() =>
                        setOpenDropdown(isOpen ? null : label)
                      }
                      className="w-full flex items-center justify-between rounded-xl px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={icon.inactive}
                          alt={label}
                          className="h-4 w-4 object-contain opacity-80"
                        />
                        <span>{label}</span>
                      </div>

                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          isOpen ? "rotate-180" : ""
                        } text-slate-400`}
                      />
                    </button>

                    {isOpen && (
                      <div className="ml-6 mt-1 space-y-1">
                        {children.map((sub) => (
                          <NavLink
                            key={sub.label}
                            to={sub.path}
                            className={({ isActive }) =>
                              `block rounded-lg px-3 py-2 text-sm ${
                                isActive
                                  ? "bg-blue-50 text-blue-600"
                                  : "text-slate-500 hover:bg-slate-50"
                              }`
                            }
                          >
                            {sub.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              // NORMAL ITEM: switch icon src based on isActive
              return (
                <NavLink
                  key={label}
                  to={path}
                  className={({ isActive }) =>
                    `w-full flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
                      isActive
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-slate-600 hover:bg-slate-50"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <img
                        src={isActive ? icon.active : icon.inactive}
                        alt={label}
                        className="h-4 w-4 object-contain"
                      />
                      <span>{label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </aside>

        {/* MAIN */}
        <main className="flex-1 px-4 pb-4 pt-3 sm:px-6 sm:pb-6 sm:pt-4 lg:px-8 lg:pb-8 lg:pt-5">
          <div className="mx-auto max-w-[1400px]">
            {/* HEADER */}
            <header className="mb-4 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-blue-600">
                  Hello, {loadingName ? "Loading..." : displayName}
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Keep track of your team’s work and productivity.
                </p>
                {nameError && (
                  <p className="mt-2 text-xs text-red-500">{nameError}</p>
                )}
              </div>

              <div className="flex flex-1 items-center gap-3 sm:justify-end">
                <div className="hidden md:flex max-w-md flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2">
                  <Search size={16} className="text-slate-400" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                    placeholder="Search Employees, Dates..."
                  />
                </div>

                <button className="h-10 w-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50">
                  <Bell size={16} />
                </button>

                <button className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700">
                  <Plus size={18} />
                </button>

                {/* PROFILE DROPDOWN */}
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() =>
                      setShowMenu((prev) => !prev)
                    }
                    className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-1 hover:bg-slate-50"
                  >
                    <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold">
                      {initials}
                    </div>
                    <ChevronDown
                      size={16}
                      className="text-slate-500"
                    />
                  </button>

                  {showMenu && (
                    <div className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
                      <div className="border-b border-slate-100 px-4 py-3">
                        <p className="text-sm font-semibold text-slate-900">
                          {displayName}
                        </p>
                        <p className="text-xs text-slate-500">
                          {profile?.email || user?.email}
                        </p>
                      </div>

                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </header>

            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
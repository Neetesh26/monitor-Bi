import React, { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  Search,
  Plus,
  LogOut,
  Menu,
  X,
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
import BiIcon from "../assets/icons/BiIcon.svg";

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
  const navigate   = useNavigate();
  const dispatch   = useDispatch();
  const { user }   = useSelector((state) => state.users);
  const menuRef    = useRef(null);
  const sidebarRef = useRef(null);

  const [profile,       setProfile]       = useState(null);
  const [loadingName,   setLoadingName]   = useState(false);
  const [nameError,     setNameError]     = useState("");
  const [query,         setQuery]         = useState("");
  const [showMenu,      setShowMenu]      = useState(false);
  const [openDropdown,  setOpenDropdown]  = useState(null);
  const [sidebarOpen,   setSidebarOpen]   = useState(false);

  // Fetch user profile
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
        const email   = decoded?.sub || user?.email;

        if (!email) { setProfile(null); return; }

        const res = await axiosInstance.get(
          `/users/by-email/${encodeURIComponent(email)}`
        );
        setProfile(res.data?.data || null);
      } catch (err) {
        setNameError(
          err?.response?.data?.error?.message || err.message || "Failed to load user"
        );
      } finally {
        setLoadingName(false);
      }
    };

    fetchUserByEmail();
  }, [user, navigate]);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handle = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setShowMenu(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  // Close mobile sidebar on outside click
  useEffect(() => {
    const handle = (e) => {
      if (
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target)
      )
        setSidebarOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [sidebarOpen]);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    dispatch(removeUser());
    navigate("/login");
  };

  const displayName =
    profile?.name || user?.name || user?.email?.split("@")[0] || "User";
  const initials = getInitials(displayName);

  // ── Shared nav content (desktop sidebar + mobile drawer) ──────────────────
  const NavContent = ({ onLinkClick }) => (
    <>
      {/* Brand */}
      <div className="flex items-center gap-3 px-2 mb-8">
       <div className="h-10 w-10 rounded-xl text-white flex items-center justify-center flex-shrink-0">
  <img src={BiIcon} alt="BI Logo" className="h-6 w-6" />
</div>
        <div className="min-w-0">
          <p className="text-sm font-semibold tracking-wide text-blue-600 truncate">
            WORK MONITOR
          </p>
          <p className="text-xs text-slate-400">Dashboard</p>
        </div>
      </div>

      {/* Nav items */}
      <nav className="space-y-1 overflow-y-auto flex-1">
        {navItems.map(({ label, icon, path, children }) => {
          const isOpen = openDropdown === label;

          // Dropdown (Reports)
          if (children) {
            return (
              <div key={label}>
                <button
                  onClick={() => setOpenDropdown(isOpen ? null : label)}
                  className="w-full flex items-center justify-between rounded-xl px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={icon.inactive}
                      alt={label}
                      className="h-4 w-4 object-contain opacity-80 flex-shrink-0"
                    />
                    <span className="truncate">{label}</span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`transition-transform flex-shrink-0 ${
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
                        onClick={onLinkClick}
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

          // Normal item
          return (
            <NavLink
              key={label}
              to={path}
              onClick={onLinkClick}
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
                    className="h-4 w-4 object-contain flex-shrink-0"
                  />
                  <span className="truncate">{label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </>
  );

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-800 overflow-x-hidden">
      <div className="flex min-h-screen">

        {/* ── DESKTOP SIDEBAR ───────────────────────────────────────────────── */}
        <aside className="hidden lg:flex w-64 flex-col border-r border-slate-200 bg-white px-4 py-5 flex-shrink-0">
          <NavContent onLinkClick={() => {}} />
        </aside>

        {/* ── MOBILE OVERLAY ────────────────────────────────────────────────── */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            aria-hidden="true"
          />
        )}

        {/* ── MOBILE SIDEBAR DRAWER ─────────────────────────────────────────── */}
        <aside
          ref={sidebarRef}
          className={`
            fixed top-0 left-0 z-50 h-full w-72 max-w-[85vw]
            flex flex-col
            border-r border-slate-200 bg-white px-4 py-5
            shadow-2xl
            transition-transform duration-300 ease-in-out
            lg:hidden
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          {/* Close button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>

          <NavContent onLinkClick={() => setSidebarOpen(false)} />
        </aside>

        {/* ── MAIN CONTENT ──────────────────────────────────────────────────── */}
        <main className="flex-1 min-w-0 px-3 pb-4 pt-3 sm:px-5 md:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1400px]">

            {/* ── HEADER ────────────────────────────────────────────────────── */}
            <header className="mb-4 flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-3 sm:p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">

              {/* Left: hamburger + title */}
              <div className="flex items-center gap-3 min-w-0">

                {/* Hamburger — only on mobile/tablet */}
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden h-10 w-10 flex-shrink-0 rounded-xl border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 active:bg-slate-100 transition-colors"
                  aria-label="Open navigation menu"
                >
                  <Menu size={20} className="text-slate-600" />
                </button>

                <div className="min-w-0">
                  <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-600 truncate">
                    Hello, {loadingName ? "Loading..." : displayName}
                  </h1>
                  <p className="mt-1 text-xs sm:text-sm text-slate-500">
                    Keep track of your team's work and productivity.
                  </p>
                  {nameError && (
                    <p className="mt-1 text-xs text-red-500">{nameError}</p>
                  )}
                </div>
              </div>

              {/* Right: search + actions */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto sm:justify-end">

                {/* Full search bar — md and up */}
                <div className="hidden md:flex w-full max-w-sm items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                  <Search size={16} className="text-slate-400 flex-shrink-0" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                    placeholder="Search Employees, Dates..."
                  />
                </div>

                {/* Search icon only — below md */}
                <button
                  className="md:hidden h-10 w-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50"
                  aria-label="Search"
                >
                  <Search size={16} className="text-slate-500" />
                </button>

                {/* Bell */}
                <button className="h-10 w-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 flex-shrink-0">
                  <Bell size={16} />
                </button>

                {/* Plus */}
                <button className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 flex-shrink-0">
                  <Plus size={18} />
                </button>

                {/* Profile dropdown */}
                <div className="relative flex-shrink-0" ref={menuRef}>
                  <button
                    onClick={() => setShowMenu((prev) => !prev)}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-1 hover:bg-slate-50"
                    aria-label="Account menu"
                  >
                    <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold flex-shrink-0">
                      {initials}
                    </div>
                    <ChevronDown
                      size={16}
                      className="text-slate-500 hidden sm:block"
                    />
                  </button>

                  {showMenu && (
                    <div className="absolute right-0 top-12 z-50 w-52 sm:w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
                      <div className="border-b border-slate-100 px-4 py-3">
                        <p className="text-sm font-semibold text-slate-900 truncate">
                          {displayName}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
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
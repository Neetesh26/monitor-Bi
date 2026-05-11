import {MapPin,Monitor} from "lucide-react";
import {Link} from "react-router-dom";

function timeToMinutes(timeStr) {
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  return hours * 60 + minutes;
}

function getCheckInColor(actual, target) {
  if (actual === target) return "text-blue-500";
  if (actual < target) return "text-green-500";
  return "text-red-500";
}

function getCheckOutColor(actual, target) {
  if (actual === target) return "text-blue-500";
  if (actual > target) return "text-green-500";
  return "text-red-500";
}

const CHECKIN_TARGET = timeToMinutes("10:30 AM");
const CHECKOUT_TARGET = timeToMinutes("7:30 PM");

export const timesheetColumns = [
    {
        header: "Employee list",
        render: emp => (
            <div className="flex items-center gap-3">
                <img src={emp.avatar} className="w-9 h-9 rounded-full" />
                <div>
                    <div className="font-medium">{emp.name}</div>
                    <div className="text-xs text-gray-400">{emp.id}</div>
                </div>
            </div>
        )
    },
    {
    header: "Status",
    render: (emp) => (
      <div>
        <div className="text-green-600">{emp.status}</div>
        <div className="flex items-center gap-1 text-gray-400 text-xs">
          <MapPin size={12} />
          {emp.location}
        </div>
      </div>
    ),
  },
  {
    header: "Check In",
    render: (emp) => {
      const min = timeToMinutes(emp.checkIn);
      const color = getCheckInColor(min, CHECKIN_TARGET);

      return (
        <div>
          <div>{emp.checkIn}</div>
          <div className={`text-xs ${color}`}>
            {emp.checkInDiff}
          </div>
        </div>
      );
    },
  },
  {
    header: "Check Out",
    render: (emp) => {
      const min = timeToMinutes(emp.checkOut);
      const color = getCheckOutColor(min, CHECKOUT_TARGET);

      return (
        <div>
          <div>{emp.checkOut}</div>
          <div className={`text-xs ${color}`}>
            {emp.checkOutDiff}
          </div>
        </div>
      );
    },
  },
  {
    header: "Work time",
    render: (emp) => emp.workTime || "HH:MM",
  },
  {
    header: "Manual Time",
    render: (emp) => emp.manualTime || "HH:MM",
  },
  {
    header: "Computer Act.",
    render: (emp) => emp.computerAct || "HH:MM",
  },
  {
    header: "Productive",
    render: (emp) => emp.productiveTime || "HH:MM",
  },
  {
    header: "Unproductive",
    render: (emp) => emp.unproductiveTime || "HH:MM",
  },
  {
    header: "Neutral",
    render: (emp) => emp.neutralTime || "HH:MM",
  },
  {
    header: "Idle Time",
    render: (emp) => emp.idleTime || "HH:MM",
  },
  {
    header: "Break Time",
    render: (emp) => emp.breakTime || "HH:MM",
  },
];

export const insightsColumns = [
  {
    header: "Employee",
    render: (emp) => (
      <div className="flex items-center gap-3">
        <img src={emp.avatar} className="w-9 h-9 rounded-full" />
        <div>
          <div className="font-medium">{emp.name}</div>
          <div className="text-xs text-gray-400">{emp.id}</div>
        </div>
      </div>
    ),
  },
  {
    header: "Team",
    render: (emp) => emp.team,
  },
  {
    header: "Role",
    render: (emp) => (
      <div>
        <div>{emp.role}</div>
        <div className="text-xs text-gray-400">{emp.dept}</div>
      </div>
    ),
  },
  {
    header: "Check In",
    render: (emp) => {
      const min = timeToMinutes(emp.checkIn);
      const color = getCheckInColor(min, CHECKIN_TARGET);

      return (
        <div>
          <div>{emp.checkIn}</div>
          <div className={`text-xs ${color}`}>
            {emp.checkInDiff}
          </div>
        </div>
      );
    },
  },
  {
    header: "Check Out",
    render: (emp) => {
      const min = timeToMinutes(emp.checkOut);
      const color = getCheckOutColor(min, CHECKOUT_TARGET);

      return (
        <div>
          <div>{emp.checkOut}</div>
          <div className={`text-xs ${color}`}>
            {emp.checkOutDiff}
          </div>
        </div>
      );
    },
  },
  {
    header: "Currently Using",
    render: (emp) => (
      <span
        className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs w-fit border
        ${
          emp.productivity === "Productive"
            ? "bg-green-50 text-green-600 border-green-200"
            : "bg-red-50 text-red-600 border-red-200"
        }`}
      >
        <Monitor size={12} />
        {emp.app}
      </span>
    ),
  },
  {
    header: "Status",
    render: (emp) => (
      <div>
        <div className="text-green-600">{emp.status}</div>
        <div className="flex items-center gap-1 text-gray-400 text-xs">
          <MapPin size={12} />
          {emp.location}
        </div>
      </div>
    ),
  },
];

export const manualTimeColumns = [
  {
    header: "Employee list",
    render: (emp) => (
      <div className="flex items-center gap-3">
        <img src={emp.avatar} className="w-9 h-9 rounded-full" />
        <div>
          <div className="font-medium">{emp.name}</div>
          <div className="text-xs text-gray-400">{emp.id}</div>
        </div>
      </div>
    ),
  },

  {
    header: "Task",
    render: (emp) => (
      <div>
        <div>{emp.task || "HH:MM"}</div>
        <div className="text-xs text-gray-400">
          {emp.project || ""}
        </div>
      </div>
    ),
  },

  {
    header: "Date",
    render: (emp) => emp.date || "HH:MM",
  },

  {
    header: "Start time",
    render: (emp) => emp.startTime || "HH:MM",
  },

  {
    header: "End Time",
    render: (emp) => emp.endTime || "HH:MM",
  },

  {
    header: "Duration (H)",
    render: (emp) => emp.duration || "HH:MM",
  },

  {
    header: "Location",
    render: (emp) => emp.location || "-",
  },

  {
    header: "Productivity",
    render: (emp) => (
      <span
        className="text-sm text-gray-500"
      >
        {emp.productivity || "-"}
      </span>
    ),
  },

  {
    header: "Status",
    render: (emp) => {
      const statusStyles = {
        Approved: "bg-[#E6F4EE] text-[#1F9D63]",
        Rejected: "bg-[#FDEBEC] text-[#E5484D]",
        Pending: "bg-[#FFF2E3] text-[#FF9B28]",
      };

      return (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            statusStyles[emp.status] || "bg-gray-100 text-gray-500"
          }`}
        >
          {emp.status || "-"}
        </span>
      );
    },
  },
];

export const employeeColumns = [
  {
    header: "Employee list",
    render: (emp) => (
      <Link 
      className="flex items-center gap-3 cursor-pointer"
      to={`/employees/${emp.id}`}
      >
        <img
          src={emp.avatar}
          className="w-9 h-9 rounded-full object-cover"
        />
        <div>
          <div className="font-medium text-gray-800">{emp.name}</div>
          <div className="text-xs text-gray-400">{emp.id}</div>
        </div>
      </Link>
    ),
  },

  {
    header: "Team",
    render: (emp) => (
      <span className="text-gray-700">{emp.team || "-"}</span>
    ),
  },


  {
    header: "Status",
    render: (emp) => (
      <div>
        <div className="text-green-600 text-sm font-medium">
          {emp.status}
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <MapPin size={12} />
          {emp.location}
        </div>
      </div>
    ),
  },


  {
    header: "Work time",
    render: (emp) => emp.workTime || "HH:MM",
  },

  {
    header: "Manual Time",
    render: (emp) => emp.manualTime || "HH:MM",
  },

  {
    header: "Computer Act.",
    render: (emp) => emp.computerAct || "HH:MM",
  },

  {
    header: "Productive",
    render: (emp) => emp.productiveTime || "HH:MM",
  },

  {
    header: "Unproductive",
    render: (emp) => emp.unproductiveTime || "HH:MM",
  },

  {
    header: "Neutral",
    render: (emp) => emp.neutralTime || "HH:MM",
  },

  {
    header: "Idle Time",
    render: (emp) => emp.idleTime || "HH:MM",
  },

  {
    header: "Break Time",
    render: (emp) => emp.breakTime || "HH:MM",
  }
];

export const employeeTimesheetColumns = [
    {
        header: "Date",
        render: emp => (
            <div>
                <div className="text-[#101828] font-medium">
                  {emp.date}
                </div>

              <div className="text-xs text-[#667085]">
                {emp.day}
              </div>
            </div>
        )
    },
    {
    header: "Status",
    render: (emp) => (
      <div>
        <div className="text-green-600">{emp.status}</div>
        <div className="flex items-center gap-1 text-gray-400 text-xs">
          <MapPin size={12} />
          {emp.location}
        </div>
      </div>
    ),
  },
  {
    header: "Check In",
    render: emp=>emp.checkIn || "HH:MM",
  },
  {
    header: "Check Out",
    render: emp=>emp.checkOut || "HH:MM",
  },
  {
    header: "Work time",
    render: (emp) => emp.workTime || "HH:MM",
  },
  {
    header: "Manual Time",
    render: (emp) => emp.manualTime || "HH:MM",
  },
  {
    header: "Computer Act.",
    render: (emp) => emp.computerActivity || "HH:MM",
  },
  {
    header: "Productive",
    render: (emp) => emp.productive || "HH:MM",
  },
  {
    header: "Unproductive",
    render: (emp) => emp.unproductive || "HH:MM",
  },
  {
    header: "Neutral",
    render: (emp) => emp.neutral || "HH:MM",
  },
  {
    header: "Idle Time",
    render: (emp) => emp.idleTime || "HH:MM",
  },
  {
    header: "Break Time",
    render: (emp) => emp.breakTime || "HH:MM",
  },
];
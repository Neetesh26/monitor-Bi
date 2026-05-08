import { ArrowUpRight } from "lucide-react";

const appsData = [
  {
    name: "Figma",
    status: "Productive",
    percentage: "28.50%",
    change: "+24%",
  },
  {
    name: "app.insightful.io",
    status: "Productive",
    percentage: "28.50%",
    change: "+24%",
  },
  {
    name: "Slack",
    status: "Neutral",
    percentage: "28.50%",
    change: "+24%",
  },
  {
    name: "insightful.io",
    status: "Unproductive",
    percentage: "28.50%",
    change: "+24%",
  },
  {
    name: "chatgpt.com",
    status: "Productive",
    percentage: "28.50%",
    change: "+24%",
  },
];

const statusStyles = {
  Productive: "bg-green-100 text-green-600",
  Neutral: "bg-orange-100 text-orange-500",
  Unproductive: "bg-red-100 text-red-500",
};

const AppsWebsites = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#D1D5E4] w-full mt-4">
      {/* Header */}
      <div className="w-full border-b border-[#D1D5E4] px-4 py-4 flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">
          Apps & Websites
        </h2>
        <button className="text-sm text-blue-600 hover:underline">
          View All
        </button>
      </div>

      {/* List */}
      <div className="space-y-3 p-4">
        {appsData.map((app, index) => (
          <div
            key={index}
            className="flex items-center justify-between  shadow rounded-xl px-4 py-3"
          >
            {/* Left: App Name */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-800 font-medium">
                {app.name}
              </span>

              {/* Status Badge */}
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${statusStyles[app.status]}`}
              >
                {app.status}
              </span>
            </div>

            {/* Right: Metrics */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-gray-700">
                {app.percentage}
              </span>

              <span className="flex items-center text-xs text-green-600 font-medium">
                <ArrowUpRight size={14} className="mr-1" />
                {app.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppsWebsites;
const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { key: "timesheet", label: "Timesheet" },
    { key: "attendance", label: "Attendance" },
    { key: "manual", label: "Manual Time" },
  ];

  return (
    <div className="flex gap-8 border-b border-slate-200 text-sm mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`relative pb-2 ${
            activeTab === tab.key
              ? "text-blue-600 font-medium"
              : "text-slate-500"
          }`}
        >
          {tab.label}
          {activeTab === tab.key && (
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-600"></span>
          )}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
const StatusBadge = ({ status }) => {
  const styles = {
    Present: "bg-green-100 text-green-600",
    WFH: "bg-yellow-100 text-yellow-600",
    Weekend: "bg-purple-100 text-purple-600",
    Absent: "bg-red-100 text-red-600",
  };

  return (
    <span
      className={`inline-block px-2 py-0.5 text-[10px] rounded-full ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
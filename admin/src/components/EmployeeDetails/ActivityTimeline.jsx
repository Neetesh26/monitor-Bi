// components/Activities/ActivityTimeline.jsx

const timelineData = [
  {
    date: "Mar 6, 2026",
    day: "Friday",
    active: "HH:MM",
    utilization: "00.00%",
  },
  {
    date: "Mar 5, 2026",
    day: "Thursday",
    active: "HH:MM",
    utilization: "00.00%",
  },
  {
    date: "Mar 4, 2026",
    day: "Wednesday",
    active: "HH:MM",
    utilization: "00.00%",
  },
  {
    date: "Mar 3, 2026",
    day: "Tuesday",
    active: "HH:MM",
    utilization: "00.00%",
  },
  {
    date: "Mar 2, 2026",
    day: "Monday",
    active: "HH:MM",
    utilization: "00.00%",
  },
  {
    date: "Mar 1, 2026",
    day: "Sunday",
    active: "HH:MM",
    utilization: "00.00%",
  },
];

const hours = [
  "6:00 AM",
  "8:00 AM",
  "10:00 AM",
  "12:00 PM",
  "2:00 PM",
  "4:00 PM",
  "6:00 PM",
  "8:00 PM",
  "10:00 PM",
  "12:00 AM",
  "2:00 AM",
  "4:00 AM",
];

export default function ActivityTimeline() {
  return (
    <div className="w-full ">
      
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-6 mb-5 text-sm text-[#344054] ">
        
        <Legend color="bg-[#C7D7FF]" label="Active Time" />
        <Legend color="bg-[#F4DF88]" label="Break Time" />
        <Legend color="bg-[#E9C38A]" label="Break Time Overages" />
        <Legend color="bg-[#E9C4E4]" label="Manual Time" />
        <Legend color="bg-[#F2B1B1]" label="Unreviewed Manual Time" />
        <Legend color="bg-[#C7A5FF]" label="Manual Time (processing)" />
        
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border border-black bg-[radial-gradient(circle,black_1px,transparent_1px)] bg-[size:4px_4px]" />
          <span>Idle Time</span>
        </div>

        <Legend color="bg-[#B6EBC8]" label="Scheduled Time" />

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border border-black flex items-center justify-center text-[10px]">
            ☾
          </div>
          <span>Overnight Shift</span>
        </div>
      </div>

      {/* Table */}
      <div className="border border-[#D1D5E4] rounded-2xl overflow-hidden">
        
        {/* Header */}
        <div
          className="
            grid
            border-b border-[#D1D5E4]
            bg-white
          "
          style={{
            gridTemplateColumns:
              "160px 120px 120px repeat(12, 1fr)",
          }}
        >
          <HeaderCell text="DATE" />
          <HeaderCell text="ACTIVE TIME" />
          <HeaderCell text="UTILIZATION" />

          {hours.map((hour) => (
            <HeaderCell key={hour} text={hour} />
          ))}
        </div>

        {/* Rows */}
        {timelineData.map((item, index) => (
          <div
            key={index}
            className="grid border-b border-[#E4E7EC] "
            style={{
              gridTemplateColumns:
                "160px 120px 120px repeat(12, 1fr)",
            }}
          >
            
            {/* Date */}
            <div className="px-4 py-4 flex flex-col justify-center">
              <span className="text-[14px] font-semibold text-[#101828]">
                {item.date}
              </span>

              <span className="text-[13px] text-[#667085]">
                {item.day}
              </span>
            </div>

            {/* Active */}
            <div className="flex items-center justify-center text-[#344054] font-semibold">
              {item.active}
            </div>

            {/* Utilization */}
            <div className="flex items-center justify-center text-[#344054] font-semibold">
              {item.utilization}
            </div>

            {/* Timeline */}
            <div className="col-span-12 relative border-l border-[#E4E7EC]">
              
              {/* Grid */}
              <div className="absolute inset-0 grid grid-cols-12">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="border-r border-[#E4E7EC]"
                  />
                ))}
              </div>

              {/* Activity Blocks */}
              <div className="relative h-full flex items-center px-8">
                
                <div className="flex h-7 rounded overflow-hidden">
                  
                  <div className="w-20 bg-[#C7D7FF]" />
                  <div className="w-10 bg-[#F4DF88]" />
                  <div className="w-16 bg-[#C7D7FF]" />
                  <div className="w-6 bg-[#F4DF88]" />
                  <div className="w-4 bg-[#E9C4E4]" />
                  <div className="w-20 bg-[#C7D7FF]" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Reusable Components ---------- */

function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-4 h-4 rounded-full ${color}`} />
      <span>{label}</span>
    </div>
  );
}

function HeaderCell({ text }) {
  return (
    <div className="h-12 flex items-center justify-center text-[12px] font-semibold text-[#475467] border-r border-[#E4E7EC]">
      {text}
    </div>
  );
}
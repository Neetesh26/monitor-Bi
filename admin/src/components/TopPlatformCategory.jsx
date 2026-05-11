import Success from "./../assets/dashboard/Vector.svg?react"

const data = [
  { name: "Services", value: "28.50%", change: "+24%" },
  { name: "Advertising Tools", value: "28.50%", change: "+24%" },
  { name: "Arts & Entertainment", value: "28.50%", change: "+24%" },
  { name: "Communication", value: "28.50%", change: "+24%" },
  { name: "AI Tools", value: "28.50%", change: "+24%" },
  { name: "Shopping", value: "28.50%", change: "+24%" },
];

export default function TopPlatformCategories() {
  return (
    <div className="flex items-center justify-center ">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-[#D1D5E4] ">
        
        {/* Header */}
        <h2 className="w-full text-lg font-bold text-gray-800 mb-6 border-b border-[#D1D5E4] px-4 py-4">
          Top Platform Categories
        </h2>
        {/* Table Header */}
        <div className="flex justify-between text-xs font-medium text-[#3A3F55] ">
          <span className="px-6">CATEGORY NAME</span>
          <span className="px-16">TIME</span>
        </div> 
    
        {/* List */}
        <div className="space-y-3 p-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between shadow border border-[#D1D5E4] rounded-xl px-4 py-3"
            >
              <span className="text-sm font-medium text-[#1C1F2E]">
                {item.name}
              </span>

              <div className="flex items-center gap-3">
                <span className="text-sm text-[#3A3F55]">
                  {item.value}
                </span>

                <div className="flex items-center text-green-500 text-sm font-medium">
                  <Success className="mr-1" />
                  {item.change}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
import ScreenshotCard from "./ScreenshotCard";

const screenshots = [
    {
        id:1 ,
        title: "Visual Studio Code",
        image: "https://code.visualstudio.com/assets/docs/getstarted/userinterface/hero.png",
        time: "05:43 PM",
        employee: "Satyam Kaurav",
        team: "Team Spectra",
    },
    {
    id: 2,
    title: "figma.com",
    image: "https://framerusercontent.com/images/Mjs5JFKVxxGZWVhepNzgXEpI.png?width=2000&height=1268",
    time: "04:13 PM",
    employee: "Satyam Kaurav",
    team: "Team Spectra",
  },
  {
    id: 3,
    title: "Windows Explorer",
    image: "https://www.pcworld.com/wp-content/uploads/2025/04/Files-Datei-Explorer-fur-Windows.jpg?quality=50&strip=all",
    time: "03:08 PM",
    employee: "Satyam Kaurav",
    team: "Team Spectra",
  },
    
];

export default function Screenshots() {
  return (
    <div className="w-full mb-6  bg-white rounded-2xl shadow-sm border border-[#D1D5E4]">
      
      {/* Title */}
      <div className="w-full border-b border-[#D1D5E4] px-4 py-4 flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-gray-800">
            Screenshot
            </h2>
            <button className="text-sm font-semibold text-blue-600 hover:underline">
            View All
            </button>
        </div>
      
      {/* Cards */}
      <div className="flex gap-6 flex-wrap justify-between p-2">
        {screenshots.map((item) => (
          <ScreenshotCard
            key={item.id}
            title={item.title}
            image={item.image}
            time={item.time}
            employee={item.employee}
            team={item.team}
          />
        ))}
      </div>
    </div>
  );
}
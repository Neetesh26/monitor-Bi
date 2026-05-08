function Tabs({active, setActive,tabs}) {
  return (
    <div className="w-full ">
      <div className="flex justify-evenly border-b border-[#D1D5E4]">
        {tabs.map((tab) => (
          <span
            key={tab}
            onClick={() => setActive(tab)}
            className={`cursor-pointer pb-2 ${
              active === tab
                ? 'border-b-[3px] border-[#1B48DE] font-semibold'
                : ''
            }`}
          >
            {tab}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Tabs

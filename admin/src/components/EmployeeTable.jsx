export default function EmployeeTable({columns,data}) {
  const gridStyle = {
  gridTemplateColumns: `minmax(200px, auto) repeat(${columns.length - 1}, 1fr)`
};
  return (
    <div className="w-full rounded-xl border border-[#D1D5E4] overflow-hidden">
      
      {/* Header */}
      <div className="grid text-gray-500 text-sm px-5 py-3 gap-6"
            style={gridStyle}>
        {columns.map((col, i) => (
          <div 
          key={i}
          className="flex items-center"
          >{col.header}</div>
        ))}
      </div>
        
      {/* Rows */}
      {data.map((emp, index) => (
        <div key={index}>
          <div
            className="grid px-5 py-3 text-sm gap-6"
             style={gridStyle}
          >
            {columns.map((col, i) => (
              <div key={i} className="flex items-center">
               {col.render
                 ? col.render(emp)
                : emp[col.accessor]
              }
              </div>
            ))}
          </div>

          {index !== data.length - 1 && (
            <div className="px-4">
              <div className="border-b border-[#D1D5E4]" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
   
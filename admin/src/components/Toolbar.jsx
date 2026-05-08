import { Calendar, Filter } from 'lucide-react'

function Toolbar({data}) {
  return (
    <div className="flex w-full items-center justify-between p-4">
      
      {/* Today Button */}
      <button className="flex items-center text-sm gap-2 rounded-lg border border-gray-500 px-4 py-2 text-gray-700 hover:bg-gray-50">
        <Calendar size={16} />
        <span>{data}</span>
      </button>

      {/* Filter Button */}
      <button className="flex items-center text-sm gap-2 rounded-lg border border-gray-500 px-4 py-2 text-gray-700 hover:bg-gray-50">
        <Filter size={16} />
        <span>Filter</span>
      </button>

    </div>
  )
}

export default Toolbar
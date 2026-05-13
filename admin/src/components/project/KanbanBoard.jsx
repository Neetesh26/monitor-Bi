import React from "react";
import { Search, Plus } from "lucide-react";

const columns = [
  {
    title: "To Do",
    tasks: [
      {
        id: 1,
        name: "Task Name",
        description: "Lorem Ipsum a big long description",
        comments: 18,
        priority: "Low",
      },
    ],
  },
  {
    title: "In Progress",
    tasks: [],
  },
  {
    title: "Review",
    tasks: [],
  },
  {
    title: "Completed",
    tasks: [],
  },
];

function KanbanBoard() {
  return (
    <div className="w-full border border-[#D1D5E4] rounded-2xl bg-white p-4 mb-6">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        
        <h2 className="text-[32px] font-semibold text-[#111827]">
          Tasks
        </h2>

        <div className="flex items-center gap-3">
          
          {/* Search */}
          <div className="flex items-center gap-2 border border-[#D1D5E4] rounded-xl px-4 py-3 w-[260px]">
            <Search size={18} className="text-[#6B7280]" />

            <input
              type="text"
              placeholder="Search tasks"
              className="outline-none w-full text-sm"
            />
          </div>

          {/* Add Task */}
          <button className="bg-[#1B48DE] text-white rounded-xl px-5 py-3 flex items-center gap-2 font-medium">
            <Plus size={18} />
            Add Task
          </button>
        </div>
      </div>

      {/* Columns */}
      <div className="grid grid-cols-4 gap-4">
        
        {columns.map((column) => (
          <div key={column.title} className="flex flex-col">
            
            {/* Separate Column Header */}
            <div className="bg-[#D1D5E4] rounded-lg px-4 py-3 mb-3">
              <span className="text-sm font-medium text-[#111827]">
                {column.title}
              </span>
            </div>

            {/* Column Container */}
            <div className="bg-[#F4F6FB] rounded-xl p-3 min-h-[650px]">
              
              <div className="flex flex-col gap-3">

                {/* Tasks */}
                {column.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white border border-[#D1D5E4] rounded-xl p-4"
                  >
                    
                    {/* Top Row */}
                    <div className="flex items-center justify-between mb-3">
                      
                      {/* Avatars */}
                      <div className="flex -space-x-2">
                        <img
                          src="https://i.pravatar.cc/32?img=1"
                          alt=""
                          className="w-6 h-6 rounded-full border border-white"
                        />

                        <img
                          src="https://i.pravatar.cc/32?img=2"
                          alt=""
                          className="w-6 h-6 rounded-full border border-white"
                        />

                        <img
                          src="https://i.pravatar.cc/32?img=3"
                          alt=""
                          className="w-6 h-6 rounded-full border border-white"
                        />
                      </div>

                      {/* Comments */}
                      <div className="flex items-center gap-1 text-xs text-[#6B7280]">
                        <span>💬</span>
                        <span>{task.comments}</span>
                      </div>
                    </div>

                    {/* Task Name */}
                    <h3 className="text-[#1B48DE] text-lg font-medium">
                      {task.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[#6B7280] mt-1">
                      {task.description}
                    </p>

                    {/* Divider */}
                    <div className="border-t border-[#E5E7EB] my-3"></div>

                    {/* Priority */}
                    <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-[#EEF2FF] text-[#6366F1]">
                      🚩 {task.priority}
                    </span>
                  </div>
                ))}

                {/* Add Task Button */}
                <button className="w-full bg-white border border-[#D1D5E4] rounded-xl px-4 py-3 text-[#1B48DE] font-medium flex items-center gap-2">
                  <Plus size={18} />
                  Add Task
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;
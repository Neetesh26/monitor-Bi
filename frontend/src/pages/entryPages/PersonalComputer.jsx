import React, { useState } from "react";

const PersonalComputer = () => {
  const [employees, setEmployees] = useState([
    { name: "", email: "" },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...employees];
    updated[index][field] = value;
    setEmployees(updated);
  };

  const addRow = () => {
    setEmployees([...employees, { name: "", email: "" }]);
  };

  // ✅ REMOVE ROW FUNCTION
  const removeRow = (index) => {
    if (employees.length === 1) return; // prevent deleting last row
    const updated = employees.filter((_, i) => i !== index);
    setEmployees(updated);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Add new Employee</h2>

      {employees.map((emp, index) => (
        <div key={index} className="flex gap-2 mb-3 items-center">
          
          <input
            type="text"
            placeholder="Full Name"
            value={emp.name}
            onChange={(e) =>
              handleChange(index, "name", e.target.value)
            }
            className="border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-2 rounded-md w-full outline-none"
          />

          <input
            type="email"
            placeholder="Email ID"
            value={emp.email}
            onChange={(e) =>
              handleChange(index, "email", e.target.value)
            }
            className="border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-2 rounded-md w-full outline-none"
          />

          {/* ❌ REMOVE BUTTON */}
          <button
            onClick={() => removeRow(index)}
            className="text-gray-400 hover:text-red-500 text-lg px-2"
          >
            ✕
          </button>
        </div>
      ))}

      <button
        onClick={addRow}
        className="text-blue-600 mb-4"
      >
        + Add new
      </button>

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition">
        Send Invite
      </button>
    </div>
  );
};

export default PersonalComputer;
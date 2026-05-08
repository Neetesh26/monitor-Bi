import React, { useState } from "react";

const CompanyComputer = () => {
  const [employees, setEmployees] = useState([
    { name: "", deviceId: "", email: "" },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...employees];
    updated[index][field] = value;
    setEmployees(updated);
  };

  const addRow = () => {
    setEmployees([...employees, { name: "", deviceId: "", email: "" }]);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Add new Employee</h2>

      {employees.map((emp, index) => (
        <div key={index} className="flex gap-2 mb-3">
          <input
            type="text"
            placeholder="Full Name"
            value={emp.name}
            onChange={(e) =>
              handleChange(index, "name", e.target.value)
            }
            className="border p-2 rounded w-1/3"
          />

          <input
            type="text"
            placeholder="Device ID"
            value={emp.deviceId}
            onChange={(e) =>
              handleChange(index, "deviceId", e.target.value)
            }
            className="border p-2 rounded w-1/3"
          />

          <input
            type="email"
            placeholder="Email ID"
            value={emp.email}
            onChange={(e) =>
              handleChange(index, "email", e.target.value)
            }
            className="border p-2 rounded w-1/3"
          />
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

export default CompanyComputer;
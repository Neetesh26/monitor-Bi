import React, { useState } from "react";
import Modal from "../../components/Modal";
import PersonalComputer from "./PersonalComputer";
import CompanyComputer from "./CompanyComputer";
import { Laptop, Monitor } from "lucide-react";

const AddEmployee = () => {
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState("select");

  // ✅ FIXED CLOSE LOGIC
  const handleClose = () => {
    if (step !== "select") {
      setStep("select"); // go back
    } else {
      setOpen(false); // close modal
    }
  };

  return (
    <Modal isOpen={open} onClose={handleClose}>

      {/* STEP 1 */}
      {step === "select" && (
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-1">Add new Employee</h2>
          <p className="text-gray-500 text-sm mb-6">
            Set up a new employee with either a personal or company-provided system.
          </p>

          <div className="flex gap-4">

            {/* Personal */}
            <div
              onClick={() => setStep("personal")}
              className="flex-1 border rounded-xl p-5 cursor-pointer hover:shadow-md hover:border-blue-500 transition"
            >
              <div className="bg-blue-50 w-12 h-12 flex items-center justify-center rounded-lg mx-auto mb-3">
                <Laptop className="text-blue-600" size={22} />
              </div>

              <h3 className="font-medium">Personal Computer</h3>
              <p className="text-sm text-gray-500 mt-1">
                Employees work on their personal computers
              </p>
            </div>

            {/* Company */}
            <div
              onClick={() => setStep("company")}
              className="flex-1 border rounded-xl p-5 cursor-pointer hover:shadow-md hover:border-blue-500 transition"
            >
              <div className="bg-blue-50 w-12 h-12 flex items-center justify-center rounded-lg mx-auto mb-3">
                <Monitor className="text-blue-600" size={22} />
              </div>

              <h3 className="font-medium">Company Computer</h3>
              <p className="text-sm text-gray-500 mt-1">
                Employees use company devices
              </p>
            </div>

          </div>
        </div>
      )}

      {/* STEP 2 */}
      {step === "personal" && <PersonalComputer />}

      {/* STEP 3 */}
      {step === "company" && <CompanyComputer />}

    </Modal>
  );
};

export default AddEmployee;
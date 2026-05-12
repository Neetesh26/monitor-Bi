import { employeeColumns } from "../../components/Columns.jsx"
import EmployeeTable from "../../components/EmployeeTable.jsx"
import { employees } from "../../data/employees.js"
import Heading from "../../components/Heading.jsx"

export default function Employees(){
    return(
        <div className="w-full overflow-x-auto">
            <Heading title="Employees" content="Access employee details, roles, and activity easily" />
            <EmployeeTable columns={employeeColumns} data={employees}/>
        </div>
    )
};


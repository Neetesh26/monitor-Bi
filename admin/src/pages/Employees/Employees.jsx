import { employeeColumns } from "../../components/Columns"
import EmployeeTable from "../../components/EmployeeTable"
import { employees } from "../../data/employees.js"
import Heading from "../../components/Heading"

export default function Employees(){
    return(
        <div className="w-full overflow-x-auto">
            <Heading title="Employees" content="Access employee details, roles, and activity easily" />
            <EmployeeTable columns={employeeColumns} data={employees}/>
        </div>
    )
};


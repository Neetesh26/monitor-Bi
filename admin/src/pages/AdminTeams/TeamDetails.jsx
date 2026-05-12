import TeamDetailHeader from '../../components/Teams/TeamDetailsHeader';
import StatCard from '../../components/Dashboard/Statcard';
import Bag from "./../../assets/dashboard/BagSimple.svg?react";
import Chart from "./../../assets/dashboard/ChartLine.svg?react";
import Clock from "./../../assets/dashboard/ClockUser.svg?react";
import Desktop from "./../../assets/dashboard/Desktop.svg?react";
import EmployeeTable from '../../components/EmployeeTable';
import { employeeColumns} from '../../components/Columns';
import { employees } from '../../data/employees';

function TeamDetails() {
  return (
    <>
        <TeamDetailHeader />
        <div className="grid grid-cols-4 gap-4 mb-6 w-full">
            <StatCard title="Work Time" value="01:42 h" change="+99%" icon={Bag}/>
            <StatCard title="Active Time" value="01:42 h" change="+99%" icon={Chart}/>
            <StatCard title="Idle Time" value="01:42 h" change="+99%" icon={Clock}/>
            <StatCard title="Manual Time" value="01:42 h" change="+99%" icon={Desktop}/>
        </div>
        <EmployeeTable columns={employeeColumns} data={employees} />
    </>
  )
}

export default TeamDetails
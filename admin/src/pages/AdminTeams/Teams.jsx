import EmployeeTable from "../../components/EmployeeTable.jsx";
import Heading from "../../components/Heading.jsx";
import { teamColumns } from "../../components/Columns.jsx";
import { teamData } from "../../data/teamData.js";

function Teams() {
  return (
    <>
      <Heading title="Teams" content="Access team details, roles, and activity easily" />
      <EmployeeTable columns={teamColumns} data={teamData} />
    </>
  )
}

export default Teams
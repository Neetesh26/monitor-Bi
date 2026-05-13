import React from 'react'
import Heading from "./../../components/Heading"
import EmployeeTable from '../../components/EmployeeTable'
import { projectColumns } from '../../components/Columns'
import { projectsData } from '../../data/projectData'
function Project() {
  return (
   <>
        <Heading title="Projects" content="Track project progress, tasks, and team involvement" />
        <EmployeeTable columns={projectColumns} data={projectsData}/>
   </>
  )
}

export default Project
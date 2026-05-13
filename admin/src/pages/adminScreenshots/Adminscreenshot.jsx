import React from 'react'
import Heading from "../../components/Heading";
import DateAccordion from '../../components/Screenshots/DateAccordion';
import ScreenshotCard from '../../components/EmployeeDetails/ScreenshotCard';
import {screenshotData} from "./../../data/screenshot";

function Adminscreenshots() {
  return (
   <>
        <Heading title="Screenshots" content="View periodic screenshots to track work activity" />
        <DateAccordion date="10-05-2026"/>
        <div className="flex gap-6 flex-wrap justify-between p-2 mb-6">
                {screenshotData.map((item) => (
                  <ScreenshotCard
                    key={item.id}
                    title={item.title}
                    image={item.image}
                    time={item.time}
                    employee={item.employee}
                    team={item.team}
                  />
                ))}
          </div>
          <DateAccordion date="09-05-2026"/>
          <div className="flex gap-6 flex-wrap justify-between p-2 mb-6">
                  {screenshotData.map((item) => (
                    <ScreenshotCard
                      key={item.id}
                      title={item.title}
                      image={item.image}
                      time={item.time}
                      employee={item.employee}
                      team={item.team}
                    />
                  ))}
          </div>
   </>
  )
}

export default Adminscreenshots
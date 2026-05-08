import {NavLink} from "react-router-dom";
import logo from "./../assets/sidebar/logo.png";
import Dashboard from "./../assets/sidebar/Dashboard.svg?react";
import RealTimeInsights from "./../assets/sidebar/RealTimeInsights.svg?react";
import Team from "./../assets/sidebar/team.svg?react";
import Project from "./../assets/sidebar/Project.svg?react";
import Screenshot from "./../assets/sidebar/screenshot.svg?react";
import Alert from "./../assets/sidebar/alert.svg?react";
import Activity from "./../assets/sidebar/activity.svg?react";

import {
  Clock,
  Users,
  FileText,
  Settings,
  ArrowLeftToLine
} from "lucide-react";

const menuItems = [
    {name: "Dashboard",icon:Dashboard, path:"/"},
    {name: "Real Time Insights",icon:RealTimeInsights, path: "/insights"},
    {name: "Time & Attendance",icon:Clock, path: "/attendance"},
    {name: "Employees",icon:Users, path: "/employees"},
    {name: "Teams", icon:Team, path: "/teams"},
    {name: "Projects", icon:Project, path: "/projects"},
    {name: "Screenshots",icon:Screenshot, path: "/screenshots"},
    {name: "Alerts", icon:Alert, path: "/alerts"},
    {name: "Activities",icon:Activity, path: "/activities"},
    {name: "Reports",icon:FileText, path: "/reports"},
    {name: "Settings",icon: Settings, path: "/settings"},
];

export default function Sidebar({collapsed, setCollapsed}){
    return(
        <div className={`${collapsed ? "w-24" : "w-64"} h-screen sticky top-0 bg-[#F8FAFC] border-r flex flex-col p-4`}>
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-2">
                    {
                        !collapsed && <img src={logo}/>
                    }
                    
                    {
                        !collapsed && <span className="text-blue-600 font-bold text-sm">WORK MONITOR</span>
                    }
                </div>
                <div 
                className="flex items-center justify-center rounded w-8 h-8 bg-gray-200"
                onClick={()=>setCollapsed(!collapsed)}
                >
                    <ArrowLeftToLine 
                    size={18} 
                    className={`cursor-pointer text-gray-500 transition-transform ${collapsed ? "rotate-180" : ""}`}/>
                </div>
            </div>
            <div className="flex-1 px-2">
                {
                    menuItems.map(item=>{
                        const Icon = item.icon;
                        return(
                            <NavLink
                            key={item.name}
                            to={item.path}
                            className={({isActive})=>
                            `flex items-center ${collapsed ? "justify-center" : "gap-3"} px-3 py-2 rounded-lg text-sm mb-1 transition
                            ${
                                isActive 
                                ? "bg-blue-100 text-blue-600 font-medium"
                                : "text-gray-600 hover:bg-gray-100"
                            }
                            `
                            }
                            >
                                <Icon className="w-[18px] h-[18px]"></Icon>  
                                {
                                    !collapsed && <span>{item.name}</span>
                                } 
                                
                            </NavLink>
                        )
                    })
                }
            </div>
            
        </div>
    )
}
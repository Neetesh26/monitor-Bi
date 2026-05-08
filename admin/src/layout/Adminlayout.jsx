import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function MainLayout(){
    const [collapsed, setCollapsed] = useState(false);
    return(
        <div className="flex h-screen overflow-hidden">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}/>
            <div className="flex-1 flex flex-col">
                <Header/>
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}
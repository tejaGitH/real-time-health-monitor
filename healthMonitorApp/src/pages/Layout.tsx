import React from "react";
import {Link, Outlet} from 'react-router-dom';

const Layout = () =>{
    return(
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg p-4 hidden md:block">
                <h2 className="text-x1 font-semibold text-blue-600 mb-4">Menu</h2>
                <ul className="space-y-2">
                    <li> 
                        <Link to='/' className="text-gray-700 hover:text-blue-600 cursor-pointer">
                            OverView
                        </Link>
                    </li>
                    <li>
                         <Link to='/vitals' className="text-gray-700 hover:text-blue-600 cursor-pointer">
                            Vitals
                         </Link>
                    </li>
                    <li>
                         <Link to='/device-status' className="text-gray-700 hover:text-blue-600 cursor-pointer">
                            Device Status
                         </Link>
                    </li>
                    <li>
                        <Link to='/reports' className="text-gray-700 hover:text-blue-600 cursor-pointer">
                            Reports
                        </Link>
                    </li>
                    {/*<li className="text-gray-700 hover:text-blue-600 cursor-pointer">Medications</li>
                    <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Medical History</li>
                    <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Notifications</li>
                    <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Settings</li> */}    
                </ul>   
            </aside>
            {/* Main Content */}
            <main className="flex-1 bg-gray-100 p-6">
               <Outlet/>
            </main>
        </div>
       
    );
}

export default Layout;
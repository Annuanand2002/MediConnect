import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "../../css/admin/layout.css"

const AdminLayout = ()=>{
    return(
        <div className="admin-layout">
            <Sidebar/>
            <div className="admin-main">
                <Header/>
                <div className="admin-content">
                    <Outlet/>
                </div>
            </div>
        </div>

    )
}

export default AdminLayout





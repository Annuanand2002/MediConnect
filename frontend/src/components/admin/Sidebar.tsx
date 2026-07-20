import { NavLink, replace, useNavigate } from 'react-router-dom'
import '../../css/admin/sidebar.css'
import { FaTachometerAlt,FaUserMd,FaClipboardList,FaMoneyBillWave,FaUserCircle,FaSignOutAlt } from 'react-icons/fa';
import { useAppDispatch } from '../../hooks/reduckHook';
import { logoutAdmin } from '../../features/admin/adminLogoutThunk';

const Sidebar = ()=>{
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const handleLogout = async()=>{
        const result = await dispatch(logoutAdmin())
        if(logoutAdmin.fulfilled.match(result)){
            navigate('/admin/login',{replace:true})
        }
    }
return(
    <aside className="sidebar">
        <div className='sidebar-logo'>
            <img src='/logo.jpeg' alt='logo'/>
            <div>
                <h4>MediConnect</h4>
                <p>Admin Panel</p>
            </div>
        </div>

        <nav className='sidebar-menu'>
            <NavLink to='/admin/dashboard' className={({isActive})=> isActive?"sidebar-link active":"sidebar-link"}>
            <FaTachometerAlt/>
            Dashboard
            </NavLink>
            <NavLink to="/admin/doctor-requests" className={({isActive})=>isActive?"sidebar-link active":"sidebar-link"}>
            <FaClipboardList/>
            Doctor Requests
            </NavLink>
            <NavLink to="/admin/doctors" className={({isActive})=>isActive?"sidebar-link active":"sidebar-link"}>
            <FaUserMd/>
            Doctors
            </NavLink>
            <NavLink to="/admin/earnings" className={({isActive})=>isActive?"sidebar-link active":"sidebar-link"}>
            <FaMoneyBillWave/>
            Earnings
            </NavLink>
            <NavLink to="/admin/me" className={({isActive})=>isActive?"sidebar-link active":"sidebar-link"}>
            <FaUserCircle/>
            Profile
            </NavLink>
            </nav>
            <button className='logout-btn' onClick={handleLogout}><FaSignOutAlt/>Logout</button>
    </aside>
)
}

export default Sidebar
import '../../css/admin/header.css'
import { FaBars,FaChevronDown } from 'react-icons/fa'
import adminAvatar from '../../assets/admin.jpeg'

const Header = ()=>{
 return(
    <header className="admin-header">
        <div className='header-left'>
            <button className='menu-btn'><FaBars/></button>
            <div>
                <h2>Dashboard</h2>
            <p>Welcome back,Admin</p>
            </div>
        </div>


        <div className='header-right'>
            <img src={adminAvatar} alt='Admin' className='admin-avatar'/>
            <div className='admin-info'>
                <h4>Admin</h4>
                <p>Super Administartor</p>
            </div>
            <FaChevronDown/>
        </div>
    </header>
 )
}


export default Header
import api from "../../services/axios"
import DashboardCard from "../../components/admin/DashboardCard"
import { FaUserMd,FaUserCheck,FaClock,FaMoneyBillWave, FaUserClock } from "react-icons/fa"


const AdminDashboard = ()=>{
    // const getAdmin = async()=>{
    //     try{
    //         const response = await api.get('/admin/me')
    //         console.log(response.data)
    //     }catch(error){
    //         console.log(error)
    //     }
    // }
    return(
       <>
       <div className="dashboard-cards">
        <DashboardCard title="Total Doctors" value={128} subtitle="+8 this month" icon={<FaUserMd/>} bgColor="#1b3f8d"/>
        <DashboardCard title="Approved" value={96} subtitle="75% approved" icon={<FaUserCheck/>} bgColor="#16A34A"/>
        <DashboardCard title="Pending" value={18} subtitle="waiting approval" icon={<FaUserClock/>} bgColor="#e6a330"/>
        <DashboardCard title="Total Earnings" value={"₹2,42,000"} subtitle="This month" icon={<FaMoneyBillWave/>} bgColor="#2f1397"/>
       </div>
       </>
    )
}


export default AdminDashboard
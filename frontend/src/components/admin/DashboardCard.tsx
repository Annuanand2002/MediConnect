import type React from 'react';
import '../../css/admin/dashboardCard.css';

interface DashboardCardProps {
    title :string;
    value : string|number;
    subtitle: string;
    icon: React.ReactNode;
    bgColor : string;
}

const DashboardCard = ({title,value,subtitle,icon,bgColor}:DashboardCardProps)=>{
    return(
        <div className='dashboard-card'>
            <div className='card-icon' style={{backgroundColor:bgColor}}>{icon}</div>
            <div className='card-container'>
                <p>{title}</p>
                <h2>{value}</h2>
                <span>{subtitle}</span>
            </div>

        </div>
    )
}

export default DashboardCard
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/reduckHook"



const ProtectedRoute = ({children}:{children:React.ReactNode})=>{
    const {checkingAuth,isAuthenticated} = useAppSelector((state)=>state.admin);
    if(checkingAuth){
        return <h2>loading...</h2>
    }
    if(!isAuthenticated){
        return <Navigate to="/admin/login" replace/>
    }
    return<>{children}</>
}

export default ProtectedRoute
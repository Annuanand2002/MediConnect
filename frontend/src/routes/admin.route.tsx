import {Route, BrowserRouter ,Routes} from "react-router-dom";
import AdminLogin from "../pages/admin/adminLogin";
import AdminDashboard from "../pages/admin/adminDashboard";
import ProtectedRoute from "./protectRoute";
import AdminLayout from "../components/admin/AdminLayout";

const AdminRoute = () => {
    return (
        <BrowserRouter>
           <Routes>
             <Route path="/admin/login" element={<AdminLogin />} />
             <Route path="/admin" element={<ProtectedRoute> <AdminLayout /></ProtectedRoute>}>
  <Route path="dashboard" element={<AdminDashboard />} /></Route>
           </Routes>
        </BrowserRouter>
    )
}

export default AdminRoute
import { Navigate, Route, Routes } from "react-router-dom";
import AdminDash from "../components/AdminDash/AdminDash";
import AdminLogin from "../page/adminLogin";
import { useSelector } from "react-redux";

export default function AdminRouter(){

    const token = useSelector(s => JSON.parse(s.admin?.adminAuthToken))
    console.log("admin access token", token?.access)
    
    return (
        <>
        <Routes>
            <Route path="/login" element={!token?.access ? <AdminLogin/> : <Navigate to="/admin"/>}/>
            <Route path="/" element = {token?.access ?<AdminDash/> : <Navigate to="/admin/login"/>}/>
        </Routes>
        </>
    )
}
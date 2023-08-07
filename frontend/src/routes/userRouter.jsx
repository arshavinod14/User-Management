import { Navigate, Route, Routes } from "react-router-dom";
import { LandingPage } from "../page/LandingPage";
import { UserLoginPage } from "../page/UserLoginPage";
import SignupPage from "../page/SignupPage";
import { useSelector } from "react-redux";
import Profile from "../components/Profile/profile";
import { Header } from "../components/Header/Header";



export default function UserRouter(){

    const state = useSelector(state => state)
    const access = state.user?.data?.access


    return (
        <>
        <Header/>
        <Routes>
            <Route path="/login" element={!access ?<UserLoginPage/>: <Navigate to="/"/>}/>
            <Route path='/signup' element={!access ?<SignupPage/>: <Navigate to="/"/>} />
            <Route path='/' element={<LandingPage/>}/>
            <Route path="/profile" element={!access? <UserLoginPage/>:<Profile />} />
        </Routes>
        </>
    )
}
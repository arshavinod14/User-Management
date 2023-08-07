import React from "react";
import { Link } from "react-router-dom";
import { useDispatch ,useSelector } from "react-redux";
import { logout } from "../../redux/features/reducer/UserAuthSlice";

export const Header = () => {
  const state = useSelector(state => state)
  const access = state.user?.data?.access
  console.log("state consoled in header",access)
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <div className="flex h-16 justify-between bg-indigo-100 shadow-lg">
      {/* <h1>Title</h1> */}
      <div className="nav-items">
        <ul className="flex pt-4">
          <li className="px-8">
            <Link to="/">Home</Link>
          </li>
          <li className="px-8">
            <Link to="/about">About</Link>
          </li>
          <li className="px-8">
            <Link to="/contact">Contact</Link>
          </li>
          
          <li className="px-8">
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center">
        {access ? (
          <button onClick={() => dispatch(logout())} className="mr-2 px-4 py-2 rounded bg-red-500 text-white">
            Logout
          </button>
        ) : (
          <Link to="/login" className="mr-2 px-4 py-2 rounded bg-blue-500 text-white">
            Login
          </Link>
        )}
      </div>
      
    </div>
     
  );
};

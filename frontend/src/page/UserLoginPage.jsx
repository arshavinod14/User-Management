import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserLogin } from "../redux/features/reducer/UserAuthSlice";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const UserLoginPage = () => {
  const loading = useSelector((s) => s.user?.loading);
  const error = useSelector((s) => s.user?.error);
  const data = useSelector((s) => s.user?.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleOnSubmit = async () => {
    try {
      const response = await dispatch(UserLogin(credentials));
      console.log(response);
      if (response.error) {
        throw new Error("Invalid credentials");
      }

      // Display success message
      Swal.fire({
        icon: "success",
        title: "Successfully logged in",
        showConfirmButton: false,
        timer: 1500,
      });

      // Navigate to another page
      navigate("/");
    } catch (error) {
      console.error(error);

      // Display error message
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: "Please check your credentials and try again.",
      });
    }
  };

  if (loading) {
    return <h1>Loading</h1>;
  }


  return (
    <div className="flex flex-col justify-center min-h-screen py-6 bg-gray-100 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-4xl font-extrabold text-center text-gray-900">
          Login
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                onChange={(e) =>
                  setCredentials((s) => ({ ...s, email: e.target.value }))
                }
                value={credentials.email}
                name="email"
                type="email"
                required
                className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                onChange={(e) =>
                  setCredentials((s) => ({ ...s, password: e.target.value }))
                }
                value={credentials.password}
                name="password"
                type="password"
                required
                className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={handleOnSubmit}
              className="block w-full px-4 py-2  font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500 sm:text-sm"
            >
              Login
            </button>
          </div>
          <Link to="/signup" className="underline">
            SignUp
          </Link>
        </div>
      </div>
    </div>
  );
};

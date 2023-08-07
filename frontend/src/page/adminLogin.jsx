import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAuthAdmin } from "../redux/features/reducer/AdminAuthSlice";
import authAxios from "../redux/features/api/authApi";
import { login } from "../utils/constants";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAdminLogin = (e) => {
    e.preventDefault();
    const body = JSON.stringify({
      email: e.target.adminemail.value,
      password: e.target.password.value,
    });

    authAxios
      .post(login, body, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.status === 200) {
          const decodedToken = jwtDecode(response?.data?.access);
          console.log(decodedToken);
          if (decodedToken.is_superuser) {

            localStorage.setItem("authTokens", JSON.stringify(response?.data));

            dispatch(
              setAuthAdmin({
                adminAuthToken: JSON.stringify(response?.data),
                admin: jwtDecode(response?.data?.access),
              })
            );

            Swal.fire({
              icon: "success",
              title: "Successfully logged in",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
        navigate("/admin")
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Invalid Credentials",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/admin/login")
      });
  };

  return (
    <div className="flex flex-col justify-center min-h-screen py-6 bg-gray-100 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-4xl font-extrabold text-center text-gray-900">
          Admin Login
        </h2>
      </div>

      <div className="mt-8 mx-auto w-full max-w-md">
        <div className="px-4 py-8 bg-white shadow rounded-lg sm:px-10">
          <form onSubmit={handleAdminLogin}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="adminemail"
                className="w-full px-3 py-2 mt-1 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Email"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                className="w-full px-3 py-2 mt-1 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

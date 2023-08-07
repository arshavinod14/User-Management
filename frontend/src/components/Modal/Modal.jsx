import React, { useState } from "react";
import authAxios from "../../redux/features/api/authApi";
import { userUpdate } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { edit_user } from "../../redux/features/reducer/UsersUpdateSlice";

const Modal = ({ show, handleClose, user }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const dispatch = useDispatch()

  const handleSaveChanges = async () => {

    
    const authTokens = JSON.parse(localStorage.getItem("authTokens"));

    const access = authTokens?.access;

    const body = new FormData();
    body.append('name', name);
    body.append('email', email);
    
    authAxios
      .post(`${userUpdate}${user.id}`, body,{
        headers: { Authorization: `Bearer ${access}` ,"Content-Type": "application/json" },
      }) 
      .then((response) => {
        console.log("User updated successfully");
        dispatch(edit_user())
        handleClose();
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        show ? "" : "hidden"
      }`}
    >
      <div className="absolute bg-white w-1/2 p-16 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Edit User</h2>
        <div className="mb-4">
          <label className="block font-medium mb-1">Name:</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Email:</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded ml-2"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import authAxios from "../api/authApi";
// import { login } from "../../../utils/constants";

// export const adminLogin = createAsyncThunk("adminLogin", async (payload) =>{

//     const response = await authAxios.post(login, payload);

//     console.log(response)

//     return response;
// })


// const adminSlice = createSlice({
//     name: 'admin',
//     initialState:{
//         loading: false,
//         data:null,
//         error:false
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(adminLogin.pending, (state) => state.loading=true)
//             .addCase(adminLogin.rejected,(state,action)=>{
//                 state.loading = false;
//                 state.error = true;
//             })
//             .addCase(adminLogin.fulfilled,(state,action)=>{
//                 state.loading = false;
//                 state.error = false;
//                 state.data = action.payload
//             })


//     }
// })

// export default adminSlice.reducer
import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

const initialState = {
    adminAuthToken: localStorage.getItem('authTokens')? JSON.parse(localStorage.getItem('authTokens')): null, 
    
    admin: localStorage.getItem('authTokens')? jwtDecode (localStorage.getItem('authTokens')): null, 
}

const adminAuthSlice = createSlice({
    name : 'adminAuth',
    initialState,
    reducers: {
        setAuthAdmin: (state, action) => {
            console.log("action",action.payload)
            state.adminAuthToken = action.payload.adminAuthToken;
            state.admin = action.payload.admin
          },

        logoutAdmin:(state) => {
            state.adminAuthToken = null
            state.admin = null
            localStorage.removeItem('authTokens')
        }
    }
});


export const { setAuthAdmin, logoutAdmin } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAxios from "../api/authApi";
import { login, register } from "../../../utils/constants";

export const UserLogin = createAsyncThunk("user/login", async (payload) => {
  const response = await authAxios.post(login, payload)
  console.log("login",response)
  return response
});



export const UserSignup = createAsyncThunk("user/signup", async (payload) => {
  const response = await authAxios.post(register, payload);
  console.log("register", response);
  return response;
});



const initialState = {
  loading: false,
  data: null,
  error: false,
};

const UserAuthSlice = createSlice({
  name: "UserAuth",
  initialState,
  reducers: {
    logout(state) {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UserLogin.pending, (state) => {
        state.loading = true;
        state.error = false
      })
      .addCase(UserLogin.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload?.data
      })
      .addCase(UserLogin.rejected, (state, action) => {
        state.loading = false
        state.error = true
      })
      .addCase(UserSignup.pending, (state) => {})
      .addCase(UserSignup.rejected, (state, action) => {})
      .addCase(UserSignup.fulfilled, (state, action) => {
        console.log("in builder signup", action.payload);
      });
  },
});

export const { logout } = UserAuthSlice.actions; 

export default UserAuthSlice.reducer;

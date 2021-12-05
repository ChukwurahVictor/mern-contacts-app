import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
   name: 'user',
   initialState: {
      user: "",
      token: "",
      isAuth: false,
      error: ""
   },
   reducers: {
      login_success: (state, action) => {
         state.token = localStorage.getItem('authToken');
         state.user = action.payload;
         state.isAuth = true;
         state.error = "";
      },
      login_fail: (state, action) => {
         state.error = action.payload
      },
      register_success: (state, action) => {
         state.token = localStorage.getItem('authToken');
         state.user = action.payload;
         state.isAuth = true;
         state.error = "";
      },
      register_fail: (state, action) => {
         state.error = action.payload
      },
      logout: state => {
         localStorage.removeItem('authToken');
         state.user = null;
         state.token = null;
         state.isAuth = false;
      }
   }
});

export const { login_success, login_fail, register_success, register_fail, logout } = userSlice.actions;

export default userSlice.reducer;
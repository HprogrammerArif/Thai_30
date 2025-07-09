import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token, email, admin_type } = action.payload;
      state.userData = action.payload;
      // state.token = token;
      // state.email = action.payload;
      // state.admin_type = action.payload;
    },

    logout: (state) => {
      state.userData = null;
      // state.token = null;
      // state.email = null;
      // state.admin_type = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const useCurrentToken = (state) => state?.auth?.userData?.token;
export const selectCurrentUser = (state) => state.auth.userData;

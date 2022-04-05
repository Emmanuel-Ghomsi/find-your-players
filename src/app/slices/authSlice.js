import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authSlice = createSlice({
  name: "isAuth",
  initialState: {
    isAuth: false,
  },
  reducers: {
    checkIfAuth: (state) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = JSON.parse(localStorage.getItem("token"));
      const API_URL_VERIFY = "http://localhost:4000/api/users/verify/token";

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (user != null && token != null) {
        try {
          axios.post(API_URL_VERIFY, { user }, config);
          state.isAuth = true;
        } catch (err) {
          console.error(err);
        }
      } else {
        state.isAuth = false;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { checkIfAuth } = authSlice.actions;

export default authSlice.reducer;

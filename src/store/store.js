import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../app/slices/authSlice'

export default configureStore({
  reducer: {
    isAuth: authReducer,
  },
});

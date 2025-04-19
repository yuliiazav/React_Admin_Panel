import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/usersSlice.js";
import authReducer from "./slices/authSlice.js";

export default configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
  },
});

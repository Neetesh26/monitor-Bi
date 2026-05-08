import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../feature/AuthSlice";

export const store = configureStore({
  reducer: {
    users: AuthReducer,
  },
});
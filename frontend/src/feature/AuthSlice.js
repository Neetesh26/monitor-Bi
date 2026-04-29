import { createSlice } from "@reduxjs/toolkit";

const AuthReducer = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem("isLoggedIn")) || null,
    loading: false,
    error: null,
  },
  reducers: {
    registerUser: (state, action) => {
      state.user = action.payload;

      // ✅ Save user/token
      localStorage.setItem("isLoggedIn", JSON.stringify(action.payload));
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    removeUser: (state) => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("token");
      state.user = null;
    },
  },
});

export const { registerUser, removeUser, setLoading, setError } =
  AuthReducer.actions;

export default AuthReducer.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialAuth = JSON.parse(localStorage.getItem("auth")) || null;

const AuthReducer = createSlice({
  name: "user",
  initialState: {
    user: initialAuth?.user || null,
    token: initialAuth?.token || null,
    loading: false,
    error: null,
  },
  reducers: {
    registerUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: action.payload.user,
          token: action.payload.token,
        })
      );
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    removeUser: (state) => {
      localStorage.removeItem("auth");
      state.user = null;
      state.token = null;
    },
  },
});

export const { registerUser, removeUser, setLoading, setError } =
  AuthReducer.actions;

export default AuthReducer.reducer;
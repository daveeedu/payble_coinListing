import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { useHistory } from 'react-router-dom';  // Import useHistory from react-router-dom

export const asyncLogin = createAsyncThunk(
  "/auth/login",
  async (payload, thunkAPI) => {
    try {
      thunkAPI.dispatch(setEmail(payload.email))

      return {};
    } catch (error) {
      thunkAPI.rejectWithValue("An error occurred somewhere");
    }
  }
);

const initialState = {
  loading: false,
  user: null,
  loginPayload: {
    email: "",
    password: "",
  },
  forgotPassPayload: {
    recoveryEmail: ""
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setPayload: (state, { payload }) => {
      state.payload = { ...state.payload, ...payload };
    },
    setEmail: (state, { payload }) => {
      state.payload.email = payload;
    },
    setCurrentScreen: (state, { payload }) => {
      state.currentScreen = payload;
    },
  },
  extraReducers: (builder) => {
    /** LogIn Builder **/
    builder
      .addCase(asyncLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(asyncLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(asyncLogin.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const getAuthData = (state) => state.auth;
export const {
  setEmail,
  setCurrentScreen,
  setPayload,
} = authSlice.actions;
export default authSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, Role } from "../types/User";

type AuthState = {
  userId: string | null;
  role: Role | null;
  user: User | null;
};

const initialState: AuthState = {
  userId: null,
  role: null,
  user: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      state.userId = action.payload.userId;
      state.role = action.payload.role;
      state.user = action.payload.user;
    },
    clearAuth: (state) => {
      state.userId = null;
      state.role = null;
      state.user = null;
    }
  }
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;

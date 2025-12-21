import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, Role } from "../../shared/types/User";

type AuthState = {
  userId: string | null;
  role: Role | null;
  user: User | null;
};

const savedUser = localStorage.getItem("user");
const parsedUser: User | null = savedUser ? JSON.parse(savedUser) : null;

const initialState: AuthState = {
  userId: parsedUser ? String(parsedUser._id) : null,
  role: parsedUser ? parsedUser.role : null,
  user: parsedUser,
};

type SetAuthPayload = {
  userId: string;
  role: Role;
  user: User;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<SetAuthPayload>) => {
      state.userId = action.payload.userId;
      state.role = action.payload.role;
      state.user = action.payload.user;

      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    clearAuth: (state) => {
      state.userId = null;
      state.role = null;
      state.user = null;

      localStorage.removeItem("user");
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
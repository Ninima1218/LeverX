import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    userId: null,
    role: null,
    user: null,
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.userId = action.payload.userId;
            state.role = action.payload.role;
            state.user = action.payload.user;
        },
        clearAuth: (state) => {
            state.userId = null;
            state.role = null;
            state.user = null;
        },
    },
});
export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { usersApi } from "./usersApi";
import filterReducer from "./filterSlice";
import { useDispatch, useSelector } from "react-redux";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        filter: filterReducer,
        [usersApi.reducerPath]: usersApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersApi.middleware)
});
export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;

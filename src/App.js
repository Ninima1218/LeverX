import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "./store";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import UserDetails from "./pages/UserDetails";
import AddressBook from "./pages/AddressBook";
const PrivateRoute = ({ children }) => {
    const userId = useAppSelector(state => state.auth.userId);
    return userId ? children : React.createElement(Navigate, { to: "/sign-in", replace: true });
};
const AdminRoute = ({ children }) => {
    const role = useAppSelector(state => state.auth.role);
    return role === "Admin" ? children : React.createElement(Navigate, { to: "/home", replace: true });
};
export default function App() {
    return (React.createElement(Routes, null,
        React.createElement(Route, { path: "/sign-in", element: React.createElement(SignIn, null) }),
        React.createElement(Route, { path: "/sign-up", element: React.createElement(SignUp, null) }),
        React.createElement(Route, { path: "/home", element: React.createElement(PrivateRoute, null,
                React.createElement(Home, null)) }),
        React.createElement(Route, { path: "/address-book", element: React.createElement(PrivateRoute, null,
                React.createElement(AddressBook, null)) }),
        React.createElement(Route, { path: "/users/:id", element: React.createElement(PrivateRoute, null,
                React.createElement(UserDetails, null)) }),
        React.createElement(Route, { path: "/settings", element: React.createElement(PrivateRoute, null,
                React.createElement(AdminRoute, null,
                    React.createElement(Settings, null))) }),
        React.createElement(Route, { path: "*", element: React.createElement(Navigate, { to: "/sign-in", replace: true }) })));
}

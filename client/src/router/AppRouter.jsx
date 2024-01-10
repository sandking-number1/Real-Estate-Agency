import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { publicRoutes } from "./publicRoutes";
import { userRoutes } from "./userRoutes";
import { adminRoutes } from "./adminRoutes";
import { ADMIN_ORDERS_ROUTE, LOGIN_ROUTE, USER_MAIN_MENU_ROUTE } from "../utils/consts";

const AppRouter = () => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [tokenSession, setTokenSession] = useState(sessionStorage.getItem("token"));
    const navigate = useNavigate();

    useEffect(() => {
        const handleStorageChange = () => {
            setToken(localStorage.getItem("token"));
            setTokenSession(sessionStorage.getItem("token"));
            navigate("/");
        };

        window.addEventListener("storage", handleStorageChange);
    }, [navigate]);

    if ((token && localStorage.getItem("role") === "user") || (tokenSession && sessionStorage.getItem("role") === "user")) {
        return (
            <Routes>
                {userRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} exact />
                ))}
                <Route key="*" path="*" element={<Navigate to={USER_MAIN_MENU_ROUTE} />} />
            </Routes>
        );
    }

    if ((token && localStorage.getItem("role") === "admin") || (tokenSession && sessionStorage.getItem("admin") === "user")) {
         return (
             <Routes>
                 {adminRoutes.map(({ path, Component }) => (
                     <Route key={path} path={path} element={<Component />} exact />
                 ))}
                 <Route key="*" path="*" element={<Navigate to={ADMIN_ORDERS_ROUTE} />} />
             </Routes>
         );
         }

    if (!token || !tokenSession) {
        return (
            <Routes>
                {publicRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} exact />
                ))}
                <Route key="*" path="*" element={<Navigate to={LOGIN_ROUTE} />} />
            </Routes>
        );
    }
};

export default AppRouter;
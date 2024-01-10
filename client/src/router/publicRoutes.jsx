import LoginPage from "../components/authorization/LoginPage";
import RegistrationPage from "../components/authorization/RegistrationPage";

export const publicRoutes = [
    {
        path: "/login",
        Component: LoginPage,
    },
    {
        path: "/register",
        Component: RegistrationPage,
    },
];
import MainPage from "../components/pages/MainPage";
import ContactsPage from "../components/pages/ContactsPage";

export const userRoutes = [
    {
        path: "/main",
        Component: MainPage,
    },
    {
        path: "/contacts",
        Component: ContactsPage,
    },
];
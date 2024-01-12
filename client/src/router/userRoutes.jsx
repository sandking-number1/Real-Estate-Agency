import MainPage from "../components/pages/MainPage";
import ContactsPage from "../components/pages/ContactsPage";
import ReviewsPage from "../components/pages/ReviewsPage";
import PropertiesPage from "../components/pages/PropertiesPage";

export const userRoutes = [
    {
        path: "/main",
        Component: MainPage,
    },
    {
        path: "/contacts",
        Component: ContactsPage,
    },
    {
        path: "/reviews",
        Component: ReviewsPage,
    },
    {
        path: "/properties",
        Component: PropertiesPage,
    },
    {
        path: "/properties/:id",
        Component: PropertiesPage,
    },
];
import MainPage from "../components/pages/MainPage";
import ContactsPage from "../components/pages/ContactsPage";
import ReviewsPage from "../components/pages/ReviewsPage";

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
];
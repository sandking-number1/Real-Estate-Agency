import AdminPropertiesPage from "../components/pages/AdminPanel/AdminPropertiesPage";
import DealsPage from "../components/pages/AdminPanel/DealsPage";
import MainPage from "../components/pages/MainPage";
import ContactsPage from "../components/pages/ContactsPage";
import ReviewsPage from "../components/pages/AdminPanel/AdminReviews";
import PropertiesPage from "../components/pages/PropertiesPage";
import PropertyPage from "../components/pages/PropertyPage";
import FAQPage from "../components/pages/FAQPage";

export const adminRoutes = [
    {
        path: "/admin-properties-page",
        Component: AdminPropertiesPage,
    },
    {
        path: "/admin-deals",
        Component: DealsPage,
    },
    {
        path: "/main",
        Component: MainPage,
    },
    {
        path: "/contacts",
        Component: ContactsPage,
    },
    {
        path: "/admin-reviews",
        Component: ReviewsPage,
    },
    {
        path: "/properties",
        Component: PropertiesPage,
    },
    {
        path: "/properties/:id",
        Component: PropertyPage,
    },
    {
        path: "/faq",
        Component: FAQPage,
    },
];
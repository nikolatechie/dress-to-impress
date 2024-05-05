import { createBrowserRouter } from "react-router-dom"
import HomePage from "../pages/home/HomePage.tsx";
import LoginPage from "../pages/login/LoginPage.tsx";
import RegisterPage from "../pages/register/RegisterPage.tsx";
import VerifyEmailPage from "../pages/verify-email/VerifyEmailPage.tsx";
import ProfilePage from "../pages/profile/ProfilePage.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/register",
        element: <RegisterPage />
    },
    {
        path: "/verify-email",
        element: <VerifyEmailPage />
    },
    {
        path: "/profile",
        element: <ProfilePage />
    }
]);
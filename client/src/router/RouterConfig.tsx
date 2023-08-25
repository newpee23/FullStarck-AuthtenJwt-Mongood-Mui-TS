// RouterConfig.tsx
import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";

import SingIn from "../pages/SingIn";
import SingUp from "../pages/SingUp";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import { localStorageType } from "../types/authType";

type routersType = {
    path: string;
    element: JSX.Element;
}
let routerData: routersType[] = [];

const token: string | null = localStorage.getItem('tokenAuth');
const user: string | null = localStorage.getItem('user');

if (user) {
    let parsedData: localStorageType = JSON.parse(user);

    switch (parsedData.role) {
        case 'user':
            routerData = [
                {
                    path: "/",
                    element: token ? <App /> : <Navigate to="/SingIn" />, // ถ้าไม่มี tokenAuth จะเปลี่ยนเส้นทางไปที่หน้า App
                },
                {
                    path: "/Home",
                    element: token ? <Home /> : <Navigate to="/SingIn" />, // ถ้าไม่มี tokenAuth จะเปลี่ยนเส้นทางไปที่หน้า SingIn
                },
                {
                    path: "/SingIn",
                    element: <SingIn />,
                },
                {
                    path: "/SingUp",
                    element: <SingUp />,
                },
                {
                    path: "*", // เมื่อมีการเข้าถึงเส้นทางที่ไม่ถูกกำหนดไว้ข้างต้น
                    element: <ErrorPage />, // นำทางไปหน้า ErrorPage
                },
            ]
            break;
        case 'admin':
            routerData = [
                {
                    path: "/",
                    element: token ? <Dashboard /> : <Navigate to="/SingIn" />,
                },
                {
                    path: "/SingIn",
                    element: <SingIn />,
                },
                {
                    path: "/Dashboard",
                    element: token ? <Dashboard /> : <Navigate to="/SingIn" />,
                },
                {
                    path: "*", // เมื่อมีการเข้าถึงเส้นทางที่ไม่ถูกกำหนดไว้ข้างต้น
                    element: <ErrorPage />, // นำทางไปหน้า ErrorPage
                }
            ]
            break;

        default:
            routerData = [
                {
                    path: "/",
                    element: <SingIn />,
                },
                {
                    path: "/SingUp",
                    element: <SingUp />,
                },
                {
                    path: "*", // เมื่อมีการเข้าถึงเส้นทางที่ไม่ถูกกำหนดไว้ข้างต้น
                    element: <ErrorPage />, // นำทางไปหน้า ErrorPage
                }
            ]
            break;
    }
} else {
    routerData = [
        {
            path: "/",
            element: <SingIn />,
        },
        {
            path: "/SingUp",
            element: <SingUp />,
        },
        {
            path: "*", // เมื่อมีการเข้าถึงเส้นทางที่ไม่ถูกกำหนดไว้ข้างต้น
            element: <ErrorPage />, // นำทางไปหน้า ErrorPage
        }
    ];
}

const router = createBrowserRouter(routerData);

export default router;

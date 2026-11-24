import { Navigate, Outlet } from "react-router-dom";

const BeforeLoginRoutes = () => {
    const token = localStorage.getItem("access_token");
    if (token) {
        return <Navigate to="/profile" replace />
    }
    return (
        <Outlet />
    )
}

export default BeforeLoginRoutes
import { Navigate, Outlet } from "react-router-dom";
import { tokenStore } from "../services/tokenStore";

const BeforeLoginRoutes = () => {
       const token = tokenStore.get();
    if (token) {
        return <Navigate to="/profile" replace />
    }
    return (
        <Outlet />
    )
}

export default BeforeLoginRoutes
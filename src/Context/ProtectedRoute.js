import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useContext(AuthContext);

    // Redirect if no user or role is not allowed
    if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;

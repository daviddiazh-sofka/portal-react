import React from "react";
import { Navigate } from "react-router-dom";
import { ProtectedRouteProps } from "./interface";

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    // const { token } = useContext(AuthContext);
    const token = ''

    if( !token ) {
        localStorage.removeItem('token')
        return <Navigate to='/' />;
    }

    return children;
}
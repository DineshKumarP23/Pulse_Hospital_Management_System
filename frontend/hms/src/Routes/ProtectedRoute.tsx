import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const token = useSelector((state: any) => state.jwt);

    if (token) {
        return <>{children}</>;
    }

    return <Navigate to="/login" />;
};

export default ProtectedRoute;
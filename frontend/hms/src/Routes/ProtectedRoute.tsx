import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ReactNode, ReactElement } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps): ReactElement => {
    const token = useSelector((state: any) => state.jwt);

    if (token) {
        return <>{children}</>;
    }

    return <Navigate to="/login" />;
};

export default ProtectedRoute;
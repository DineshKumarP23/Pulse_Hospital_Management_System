import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ReactNode, ReactElement } from "react";
import { jwtDecode } from "jwt-decode";

interface PublicRouteProps {
    children: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps): ReactElement => {
    const token = useSelector((state: any) => state.jwt);

    if (token) {
        const user:any = jwtDecode(token);
        return <Navigate to={`/${user?.role?.toLowerCase()}/dashboard`} />;
    }

    return <>{children}</>;
};

export default PublicRoute;
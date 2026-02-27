import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
interface ProtectedRouteProps {
    children: ReactNode
}

const ProtectedRoute:React.FC<ProtectedRouteProps>=({children})=>{
    const token=useSelector((state:any)=>state.jwt)
    if(token) {
        return children;
    }
    return <Navigate to="/"/>;
}
export default ProtectedRoute;

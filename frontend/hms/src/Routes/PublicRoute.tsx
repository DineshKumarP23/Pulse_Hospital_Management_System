import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
interface PublicRouteProps {
    children: ReactNode
}

const PublicRoute:React.FC<PublicRouteProps>=({children})=>{
    const token=useSelector((state:any)=>state.jwt)
    if(token) {
        return <Navigate to="/"/>
    }
    return children;
}
export default PublicRoute;

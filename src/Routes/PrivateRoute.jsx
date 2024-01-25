import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import loaderHeart from "../assets/heartsloader.gif"

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="h-screen flex justify-center items-center">
            <img className="w-24" src={loaderHeart} />
        </div>

    }
    if (user) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;
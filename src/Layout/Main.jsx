import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";

const Main = () => {
    const location = useLocation();
    const hideNavFoot = location.pathname.includes('signup') || location.pathname.includes('login')
    return (
        <div className="max-w-screen-xl mx-auto">
            {hideNavFoot || <Navbar></Navbar>}
            <Outlet></Outlet>
            {hideNavFoot || <Footer></Footer>}
        </div>
    );
};

export default Main;
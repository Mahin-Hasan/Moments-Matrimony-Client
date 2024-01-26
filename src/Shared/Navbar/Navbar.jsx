import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAdmin from "../../hooks/useAdmin";

const Navbar = () => {
    const [isNavOpen, setNavOpen] = useState(false);
    // console.log(isNavOpen);
    const { user, logOut } = useAuth();
    const [isAdmin] = useAdmin();
    const handleToggleNav = () => {
        setNavOpen(!isNavOpen);
    };
    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: 'Logged Out',
                    showConfirmButton: false,
                    timer: 2000
                });
            })
            .catch(error => console.log(error))
    }
    const navigations = (
        <>
            <li><NavLink to="/" className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-blue-500 border-b-2 border-blue-800 rounded-none px-2 py-1" : "text-Blue-700 px-2 py-1"
            }>Home</NavLink></li>
            <li><NavLink to="/biodatas" className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-blue-500 border-b-2 border-blue-800 rounded-none px-2 py-1" : "text-Blue-700 px-2 py-1"
            }>BioDatas</NavLink></li>
            <li><NavLink to="/about" className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-blue-500 border-b-2 border-blue-800 rounded-none px-2 py-1" : "text-Blue-700 px-2 py-1"
            }>About Us</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-blue-500 border-b-2 border-blue-800 rounded-none px-2 py-1" : "text-Blue-700 px-2 py-1"
            }>Contact US</NavLink></li>


            {
                user && !isAdmin && <li><NavLink to="/dashboard/viewBiodata" className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-blue-500 border-b-2 border-blue-800 rounded-none px-2 py-1" : "text-Blue-700 px-2 py-1"
                }>DashBoard</NavLink></li>
            }
            {
                user && isAdmin && <li><NavLink to="/dashboard/adminDashboard" className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-blue-500 border-b-2 border-blue-800 rounded-none px-2 py-1" : "text-Blue-700 px-2 py-1"
                }>DashBoard</NavLink></li>
            }
        </>
    );

    return (
        <div>
            {/* <h2>this is nav bar</h2> */}
            <nav className="p-4 bg-stone-100 ">
                <div className="container flex justify-between h-16 mx-auto">
                    <div className="flex items-center p-2">
                        <Link to='/'>
                            <span className="dancing-script text-3xl font-bold">
                                <span className="text-blue-500">M</span>oments <span className="text-blue-500">Matrimony</span>
                            </span>
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <ul className={`items-center space-x-3 hidden lg:flex`}>
                            {navigations}
                        </ul>
                        <ul className={`items-center space-x-3 p-3 lg:hidden z-10 ${isNavOpen ? 'flex flex-col absolute right-0 top-0 w-40 mt-12 mr-12 bg-sky-200' : 'hidden'}`}>
                            {navigations}
                            {
                                user ?
                                    <button onClick={handleLogOut} className="self-center px-4 py-2 rounded text-red-700 underline font-bold">Log Out</button>
                                    :
                                    <span className="self-center px-4 py-2 rounded text-blue-700 font-bold">Log In</span>
                            }
                        </ul>
                    </div>
                    <div className="items-center flex-shrink-0 hidden lg:flex">
                        {/* https://m.media-amazon.com/images/I/61NP12cSlQL._AC_UF1000,1000_QL80_.jpg */}
                        {
                            user ?
                                <div className="flex items-center">
                                    <div className="relative flex-shrink-0">
                                        <img src={user?.photoURL} alt="" className="w-12 h-12 border rounded-full bg-gray-500 border-gray-300" />
                                        <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-600 border rounded-full text-gray-800 border-gray-50"></span>
                                    </div>
                                    <div>
                                        <span>{user?.displayName}</span>
                                        <button onClick={handleLogOut} className="self-center px-4 py-2 rounded text-red-700 underline font-bold">Log Out</button>
                                    </div>
                                </div>
                                :
                                <div>
                                    <Link to='/login'><button className="self-center px-4 py-2 rounded text-blue-700 font-bold">Log in</button></Link>
                                    <Link to='/signup'>
                                        <button className="self-center px-4 py-2 font-semibold rounded bg-violet-600 text-gray-50">Sign up</button>
                                    </Link>
                                </div>
                            // <button className="self-center px-4 py-2 rounded text-blue-700 font-bold">Log in</button>
                        }
                        {/* <button className="self-center px-4 py-2 rounded text-blue-700 font-bold">Log in</button> */}
                        {/* <Link to='/signup'>
                            <button className="self-center px-4 py-2 font-semibold rounded bg-violet-600 text-gray-50">Sign up</button>
                        </Link> */}
                    </div>
                    <button className="p-4 lg:hidden" onClick={handleToggleNav}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 text-gray-800">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;

import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { IoMdContacts } from "react-icons/io";
import { FaEdit, FaHeart, FaHome, FaSearch } from "react-icons/fa";


const Dashboard = () => {
    const { user } = useAuth();
    return (
        <div className="max-w-screen-xl mx-auto">
            <div className="flex">
                {/*sidebar  */}
                <div className="h-full p-3 space-y-2 w-72 bg-gray-50 text-gray-800">
                    <div className="flex items-center p-2 space-x-4">
                        <img src={user?.photoURL} alt="" className="w-12 h-12 rounded-full bg-gray-500" />
                        <div>
                            <h2 className="text-lg font-semibold">{user?.displayName}</h2>
                            <span className="flex items-center space-x-1">
                                <a rel="noopener noreferrer" href="#" className="text-xs hover:underline text-gray-600">View profile</a>
                            </span>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-300">
                        <ul className="pt-2 pb-4 space-y-1 text-sm">
                            <li>
                                <NavLink to='/dashboard/viewBiodata' className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "flex items-center p-2 space-x-3 rounded-md bg-blue-100 font-bold text-blue-600" : "flex items-center p-2 space-x-3 rounded-md"
                                }>
                                    <FaSearch />
                                    <span>View Biodata</span>
                                </NavLink>
                            </li>
                            <li className="bg-gray-100 text-gray-900">
                                <NavLink to='/dashboard/editBiodata' className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "flex items-center p-2 space-x-3 rounded-md bg-blue-100 font-bold text-blue-600" : "flex items-center p-2 space-x-3 rounded-md"
                                }>
                                    <FaEdit className="w-5 h-5" />

                                    <span>Edit BioData</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/contactRequest' className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "flex items-center p-2 space-x-3 rounded-md bg-blue-100 font-bold text-blue-600" : "flex items-center p-2 space-x-3 rounded-md"
                                }>
                                    <IoMdContacts className="w-5 h-5" />
                                    <span>Contact Request</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/favouriteBiodata' className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "flex items-center p-2 space-x-3 rounded-md bg-blue-100 font-bold text-blue-600" : "flex items-center p-2 space-x-3 rounded-md"
                                }>
                                    <FaHeart className="w-5 h-5" />
                                    <span>Favourites Biodata</span>
                                </NavLink>
                            </li>
                        </ul>
                        <ul className="pt-4 pb-2 space-y-1 text-sm">
                            <li>
                                <NavLink to='/'className="flex items-center p-2 space-x-3 rounded-md">
                                    <FaHome className="w-5 h-5" />
                                    <span>Home</span>
                                </NavLink>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current text-gray-600">
                                        <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
                                        <rect width="32" height="64" x="256" y="232"></rect>
                                    </svg>
                                    <span>Logout</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* outlets */}
                <div className="flex-1 p-6">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
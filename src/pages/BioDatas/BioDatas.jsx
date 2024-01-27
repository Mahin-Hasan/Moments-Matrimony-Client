import { useEffect, useState } from "react";
import useBiodata from "../../hooks/useBiodata";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import TitleCaption from "../../components/TitleCaption/TitleCaption";


const BioDatas = () => {
    // const [asc, setAsc] = useState(true);
    const [biodatas, , refetch] = useBiodata();
    console.log(biodatas);


    // console.log(biodatas);
    return (
        <div>
            <TitleCaption title={'All Users Biodatas'}></TitleCaption>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
                <div className=" rounded-lg bg-blue-50">
                    {/* left side */}
                    <div className="flex-1">
                        <h1>Apply Filters</h1>
                        <ul className="pt-2 pb-4 space-y-1 text-sm">
                            <li className="rounded-sm ">
                                <button className="flex items-center p-2 space-x-3 rounded-md">
                                    <span>Age Low To High</span>
                                </button>
                                <button className="flex items-center p-2 space-x-3 rounded-md">
                                    <span>Male</span>
                                </button>
                                <button className="flex items-center p-2 space-x-3 rounded-md">
                                    <span>Female</span>
                                </button>
                                <button className="flex items-center p-2 space-x-3 rounded-md">
                                    <span>Division</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className=" rounded-lg bg-blue-50 lg:col-span-2">
                    {/* Bio datas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {
                            biodatas.map(bioData => <div key={bioData._id} className="max-w-xs rounded-md shadow-md bg-gray-50 text-gray-800">
                                <img src={bioData.profileImg} alt="" className="object-cover object-center w-full rounded-t-md h-72 bg-gray-500" />
                                <div className="flex flex-col justify-between p-3 space-y-2">
                                    <div className="space-y-2">
                                        <h2 className="text-3xl font-semibold tracki">ID:{bioData.biodataID} {bioData.yourName} </h2>
                                        <p className="text-gray-800">Gender: {bioData.biodataType}</p>
                                        <p className="text-gray-800">Age: {bioData.yourAge}</p>
                                        <p className="text-gray-800">Division: {bioData.permanentDivision}</p>
                                        <p className="text-gray-800">Profession: {bioData.occupation}</p>
                                    </div>
                                    <Link to={`/biodataDetails/${bioData._id}`}>
                                        <button
                                            className="group relative inline-flex items-center overflow-hidden rounded bg-blue-600 px-4 py-2 text-white focus:outline-none focus:ring active:bg-blue-500"
                                        >
                                            <span className="absolute -end-full transition-all group-hover:end-2">
                                                <svg
                                                    className="h-5 w-5 rtl:rotate-180"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                    />
                                                </svg>
                                            </span>

                                            <span className="text-sm font-medium transition-all group-hover:me-4">View Profile</span>
                                        </button>
                                    </Link>
                                </div>
                            </div>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BioDatas;
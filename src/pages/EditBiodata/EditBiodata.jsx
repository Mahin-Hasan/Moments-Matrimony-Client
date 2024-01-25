import { Link } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";
import useAxiosPublic from "../../hooks/useAxiosPublic";
// import { useQuery } from "@tanstack/react-query";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import useBiodata from "../../hooks/useBiodata";
import Swal from "sweetalert2";

const EditBiodata = () => {
    const axiosPublic = useAxiosPublic();
    const [biodatas, , refetch] = useBiodata(); //2nd parameter empty cz not using
    // const { data: biodatas = [], refetch } = useQuery({
    //     queryKey: ['biodatas'],
    //     queryFn: async () => {
    //         const res = await axiosPublic.get('/biodatas');
    //         return res.data;
    //     }
    // })


    //delete function
    const handleDeleteBiodata = biodata => {
        Swal.fire({
            title: "Are you sure you want to delete?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosPublic.delete(`/biodatas/${biodata._id}`);
                console.log(res.data); //delete operation only works for the item that is added and has object id in mongo db
                if (res.data.deletedCount > 0) {
                    //refetch to update deleted state
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: `Biodata of ${biodata.yourName} has been deleted.`,
                        icon: "success"
                    });
                }
            }
        });
    }

    return (
        <div>
            <div className="flex justify-end">
                {/* add Biodata */}
                <Link to='/dashboard/addBiodata'>
                    <button
                        className="group flex items-center justify-between gap-4 rounded-lg border border-green-600 bg-green-600 px-5 py-3 transition-colors hover:bg-transparent focus:outline-none focus:ring"
                        href="/download"
                    >
                        <span
                            className="font-medium text-white transition-colors group-hover:text-green-600 group-active:text-green-500"
                        >
                            Add Your BioData
                        </span>
                        <span
                            className="shrink-0 rounded-full border border-current bg-white p-2 text-green-600 group-active:text-green-500"
                        >
                            <IoIosAddCircle className="text-2xl" />
                        </span>
                    </button>
                </Link>
            </div>
            <div>
                {/* map all bio */}


                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead className="ltr:text-left rtl:text-right">
                            <tr>
                                <th className="font-medium text-gray-900">SL #</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Profile</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Date of Birth</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Role</th>
                                <th className="text-left px-4 py-2">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {
                                biodatas.map((biodata, idx) => <tr key={biodata._id}>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{idx + 1}</td>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                        <img
                                            alt="Paul Clapton"
                                            src={biodata.profileImg}
                                            className="h-14 w-14 rounded-3xl object-cover shadow-sm"
                                        />
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{biodata.yourName}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{biodata.dateOfBirth}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{biodata.occupation}</td>
                                    <td className="whitespace-nowrap px-4 py-2">
                                        <div className="flex items-center gap-1">
                                            <Link to={`/dashboard/updateBiodata/${biodata._id}`}>
                                                <button
                                                    className="inline-block rounded bg-indigo-600 px-3 py-3 text-xs font-medium text-white hover:bg-indigo-700"
                                                >
                                                    <FaEdit className="text-lg" />

                                                </button>
                                            </Link>
                                            <button onClick={() => handleDeleteBiodata(biodata)}
                                                className="inline-block rounded-full border border-rose-600 bg-rose-600 p-3 text-white hover:bg-transparent hover:text-rose-600 focus:outline-none focus:ring active:text-rose-500"
                                                href="/download"
                                            >
                                                <RiDeleteBin6Fill className="text-lg" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EditBiodata;
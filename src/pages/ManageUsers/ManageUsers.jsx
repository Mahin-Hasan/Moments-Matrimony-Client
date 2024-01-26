import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { RiAdminFill, RiDeleteBin6Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const ManageUsers = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure= useAxiosSecure();


    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const handleSetAdmin = user => {
        console.log(user);
        Swal.fire({
            title: "Are you sure?",
            text: `you want to make ${user.name} admin?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make ADMIN!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.patch(`/users/admin/${user._id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Success!",
                                text: `${user.name} is set to Admin`,
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }
    const handleDeleteUser = user => {
        console.log(user);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: `${user.name} has been deleted.`,
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }


    return (
        <div>

            <div>
                <h2 className="text-2xl text-center my-7">List of all users</h2>
                <h2>No of Users: {users.length}</h2>
            </div>
            {/* users table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200 m-2">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-start">Serial</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Email</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Status</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Remove</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {
                            users.map((user, idx) => <tr key={user._id}>
                                <td className="whitespace-nowrap px-2 py-1 font-medium text-gray-900">{idx + 1}</td>
                                <td className="whitespace-nowrap px-2 py-1 text-gray-700">{user.email}</td>
                                <td className="whitespace-nowrap px-2 py-1 text-gray-700">{user.name}</td>
                                <td className="whitespace-nowrap px-2 py-1 text-gray-700">
                                    {user.role === 'admin'
                                        ? 'Admin'
                                        : <span className="flex justify-center gap-1">
                                            <button onClick={() => handleSetAdmin(user)} className="inline-block rounded-full border border-indigo-600 bg-indigo-600 p-3 text-white hover:bg-blue-400 hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"><RiAdminFill className="text-white text-2xl" /></button>
                                        </span>}
                                </td>
                                <td className="whitespace-nowrap px-2 py-1 text-gray-700 text-center">
                                    <button onClick={() => handleDeleteUser(user)} className="inline-block rounded-full border border-rose-600 bg-rose-600 p-3 text-white hover:bg-red-400 hover:text-rose-600 focus:outline-none focus:ring active:text-rose-500"><RiDeleteBin6Fill className="text-white text-2xl" /></button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
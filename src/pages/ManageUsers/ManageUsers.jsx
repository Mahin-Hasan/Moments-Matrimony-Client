import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { RiAdminFill } from "react-icons/ri";


const ManageUsers = () => {
    const axiosPublic = useAxiosPublic()

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data;
        }
    })

    const handleSetAdmin = user =>{
        console.log(user);
    } 


    return (
        <div>

            <div>
                <h2 className="text-2xl text-center my-7">List of all users</h2>
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
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {
                            users.map((user, idx) => <tr key={user._id}>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{idx + 1}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.email}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.name}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                {user.role === 'admin' ? 'Admin' : <button onClick={() => handleSetAdmin(user)} className="btn bg-orange-500 btn-lg"><RiAdminFill className="text-white text-2xl" /></button>}
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
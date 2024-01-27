import { useQuery } from "@tanstack/react-query";
import TitleCaption from "../../components/TitleCaption/TitleCaption";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const FavouriteBio = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const { data: favourite = [], refetch } = useQuery({
        queryKey: ['favourite'],
        queryFn: async () => {
            const res = await axiosPublic.get('/favourite');
            return res.data;
        }
    })
    const userFilter = favourite.filter(fav => fav.favouritedBy=== `${user.email}`);

    // delete functionality 
    const handleDeleteFavourite = favItem => {
        Swal.fire({
            title: "Remove Favourite?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Remove it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosPublic.delete(`/favourite/${favItem._id}`);
                console.log(res.data); 
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: `${favItem.favName} has been removed from Favourite.`,
                        icon: "success"
                    });
                }
            }
        });
    }
    return (
        <div>
            <TitleCaption title={'Your Added Favourite Biodatas'}></TitleCaption>
            {/* display favourated bio */}
            <div className="overflow-x-auto">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead className="ltr:text-left rtl:text-right">
                            <tr>
                                <th className="font-medium text-gray-900">Bio ID</th>
                                <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900">Name</th>
                                <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900">Permanent Address</th>
                                <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900">Occupations</th>
                                <th className="text-left px-4 py-2">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {
                                userFilter.map(favItem => <tr key={favItem._id}>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{favItem.favBioId}</td>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{favItem.favName}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{favItem.permanentDiv}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{favItem.favWork}</td>
                                    <td className="whitespace-nowrap px-4 py-2">
                                        <div className="flex items-center gap-1">
                                           
                                            <button onClick={() => handleDeleteFavourite(favItem)}
                                                className="inline-block rounded-full border border-rose-600 bg-rose-600 p-3 text-white hover:bg-transparent hover:text-rose-600 focus:outline-none focus:ring active:text-rose-500"
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
    );
};

export default FavouriteBio;
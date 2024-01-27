import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TitleCaption from "../../components/TitleCaption/TitleCaption";
import Swal from "sweetalert2";


const ApproveContact = () => {
    const axiosSecure = useAxiosSecure();

    const { data: invoice = [], refetch } = useQuery({
        queryKey: ['invoice'],
        queryFn: async () => {
            const res = await axiosSecure.get('/invoice');
            return res.data;
        }
    })
    //handle contact approve
    const handleApprovePremium = (item) => {
        console.log(item);
        Swal.fire({
            title: "Do you want to give access?",
            text: `Give ${item.name} Contact access?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, give access!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/invoice/request/${item._id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Success!",
                                text: `${item.name} has access now`,
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div>
            <TitleCaption title={"Contact Request By Users"}></TitleCaption>

            <div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead className="ltr:text-left rtl:text-right">
                            <tr>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-start">BioData Id</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Email</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Approve Contact Request</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {
                                invoice.map(item => <tr key={item._id}>
                                    <td className="whitespace-nowrap px-4 py-2 text-base font-semibold text-blue-700">{item.requestedID}</td>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                        <div className="flex justify-center items-center gap-2">

                                            <span>{item.requesterName}</span>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                        <div className="flex justify-center">
                                            {item.email}
                                        </div>
                                    </td>

                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                        <div className="flex justify-center text-purple-700 font-semibold text-base">
                                            {item.order}
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2">
                                        <div className="flex justify-center">
                                            <button
                                                onClick={() => handleApprovePremium(item)}
                                                className="group relative inline-block overflow-hidden border border-blue-600 px-2 py-1 focus:outline-none focus:ring"
                                            >
                                                <span
                                                    className="absolute inset-x-0 bottom-0 h-[2px] bg-blue-600 transition-all group-hover:h-full group-active:bg-blue-500"
                                                ></span>

                                                <span
                                                    className="relative text-sm font-medium text-blue-600 transition-colors group-hover:text-white"
                                                >
                                                    Approve
                                                </span>
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

export default ApproveContact;
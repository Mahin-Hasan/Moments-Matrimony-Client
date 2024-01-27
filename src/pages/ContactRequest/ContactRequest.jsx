import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import TitleCaption from "../../components/TitleCaption/TitleCaption";
import useAuth from "../../hooks/useAuth";

const ContactRequest = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth();
    const { data: invoice = [], refetch } = useQuery({
        queryKey: ['invoice'],
        queryFn: async () => {
            const res = await axiosPublic.get('/invoice');
            return res.data;
        }
    })
    const requesrFilter = invoice.filter(item => item.email === `${user.email}`);
    

    return (
        <div>
           <div>
            <TitleCaption title={"Contact request Status"}></TitleCaption>
            <div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead className="ltr:text-left rtl:text-right">
                            <tr>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-start">BioData Id</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Email</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {
                                requesrFilter.map(item => <tr key={item._id}>
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
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>
    );
};

export default ContactRequest;
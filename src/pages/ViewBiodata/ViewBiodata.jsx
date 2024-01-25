import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const ViewBiodata = () => {
    const axiosPublic = useAxiosPublic();

    const { data: biodatas = [], refetch } = useQuery({
        queryKey: ['biodatas'],
        queryFn: async () => {
            const res = await axiosPublic.get('/biodatas');
            return res.data;
        }
    })



    return (
        <div>
            <div>
                add info
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
                {
                    biodatas.map((biodata) => <div key={biodata._id}>
                        <a
                            href="#"
                            className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
                        >
                            <span
                                className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
                            ></span>

                            <div className="sm:flex sm:justify-between sm:gap-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                                        Building a SaaS product as a software developer
                                    </h3>

                                    <p className="mt-1 text-xs font-medium text-gray-600">By John Doe</p>
                                </div>

                                <div className="hidden sm:block sm:shrink-0">
                                    <img
                                        alt="Paul Clapton"
                                        src={biodata.profileImg}
                                        className="h-16 w-16 rounded-lg object-cover shadow-sm"
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <p className="max-w-[40ch] text-sm text-gray-500">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. At velit illum provident a, ipsa
                                    maiores deleniti consectetur nobis et eaque.
                                </p>
                            </div>

                            <dl className="mt-6 flex gap-4 sm:gap-6">
                                <div className="flex flex-col-reverse">
                                    <dt className="text-sm font-medium text-gray-600">Published</dt>
                                    <dd className="text-xs text-gray-500">31st June, 2021</dd>
                                </div>

                                <div className="flex flex-col-reverse">
                                    <dt className="text-sm font-medium text-gray-600">Reading time</dt>
                                    <dd className="text-xs text-gray-500">3 minute</dd>
                                </div>
                            </dl>
                        </a>
                    </div>)
                }
                <div className="h-32 rounded-lg bg-gray-200">
                </div>

                {/* <div className="h-32 rounded-lg bg-gray-200">asdasd</div> */}
            </div>
        </div>
    );
};

export default ViewBiodata;
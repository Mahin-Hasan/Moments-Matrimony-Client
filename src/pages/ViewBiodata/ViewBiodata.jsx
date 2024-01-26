// import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useBiodata from "../../hooks/useBiodata";
import TitleCaption from "../../components/TitleCaption/TitleCaption";


const ViewBiodata = () => {
    const axiosPublic = useAxiosPublic();

    // const { data: biodatas = [], refetch } = useQuery({
    //     queryKey: ['biodatas'],
    //     queryFn: async () => {
    //         const res = await axiosPublic.get('/biodatas');
    //         return res.data;
    //     }
    // })
    const [biodatas, , refetch] = useBiodata();
    const { user } = useAuth();
    const emailFilter = biodatas.filter(biodata => biodata.contactEmail === `${user.email}`);

    const handleRequestPremium = biodata => {
        console.log(biodata);
        const premiumRequests = {
            bioId: biodata.biodataID,
            name: biodata.yourName,
            bioType: biodata.biodataType,
            profile: biodata.profileImg,
            permanentDiv: biodata.permanentDivision,
            age: biodata.yourAge,
            work: biodata.occupation,
            email: biodata.contactEmail,
            requestedBy: user.email,
            status: 'pending',
        }
        console.log(premiumRequests);
        Swal.fire({
            title: "Are you sure?",
            text: `you want to make biodata Premium?`,
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Request Premium"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.post(`/premium`,premiumRequests)
                    .then(res => {
                        if (res.data.insertedId) {
                            refetch();
                            Swal.fire({
                                title: "Success!",
                                text: `${biodata.yourName} is requested for premium user`,
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div>
           <TitleCaption title={'My Added User Biodatas'}></TitleCaption>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
                {/* add a filter to get by user email */}
                {
                    emailFilter.map((biodata) => <div key={biodata._id}>
                        <a
                            href="#"
                            className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
                        >
                            <span
                                className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
                            ></span>

                            <div className="flex justify-between gap-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                                        {biodata.yourName}
                                    </h3>

                                    <p className="mt-1 text-xs font-medium text-gray-600">Gender: {biodata.biodataType}</p>
                                </div>

                                <div className="block sm:shrink-0">
                                    <img
                                        alt="Paul Clapton"
                                        src={biodata.profileImg}
                                        className="h-16 w-16 rounded-lg object-cover shadow-sm"
                                    />
                                </div>
                            </div>

                            <div className="max-w-[40ch] text-sm text-gray-500">
                                <p className="underline text-blue-700 font-semibold mb-2">Additional Info</p>
                                <p>Occupation: {biodata.occupation}</p>
                                <p>Race: {biodata.race}</p>
                                <p>Fathers name: {biodata.fathersName}</p>
                                <p>Mothers name: {biodata.mothersName}</p>
                                <p>Present division: {biodata.presentDivision}</p>
                                <p>Permanent division: {biodata.permanentDivision}</p>
                                <p>Expected partner age: {biodata.expectedPartnerAge}</p>
                                <p>Expected partner height: {biodata.expectedPartnerHeight}</p>
                                <p>Expected partner weight: {biodata.expectedPartnerWeight}</p>
                            </div>

                            <dl className="mt-4 flex gap-4 sm:gap-6">
                                <div className="flex flex-col-reverse">
                                    <dt className="text-sm font-medium text-gray-600">Age: {biodata.yourAge}</dt>
                                    <dd className="text-xs font-medium text-gray-600">DOB: {biodata.dateOfBirth}</dd>
                                </div>

                                <div className="flex flex-col-reverse">
                                    <dt className="text-sm font-medium text-gray-600">Email: {biodata.contactEmail}</dt>
                                    <dd className="text-xs font-medium text-gray-500">Number: 0{biodata.mobileNumber}</dd>
                                </div>

                            </dl>
                            <div className="mt-4 flex gap-4 sm:gap-6">
                                <div className="flex flex-col-reverse">
                                    <dd className="text-xs font-medium text-gray-500">Weight: {biodata.yourWeight}</dd>
                                    <dt className="text-sm font-medium text-gray-600">Height: {biodata.yourHeight}</dt>
                                </div>
                                <div>
                                    <button
                                        onClick={() => handleRequestPremium(biodata)}
                                        className="group relative inline-block overflow-hidden border border-indigo-600 px-6 py-2 focus:outline-none focus:ring"
                                    >
                                        <span
                                            className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"
                                        ></span>

                                        <span
                                            className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white"
                                        >
                                            Make Biodata Premium
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </a>
                    </div>)
                }
                {/* <div className="h-32 rounded-lg bg-gray-200">
                </div> */}

                {/* <div className="h-32 rounded-lg bg-gray-200">asdasd</div> */}
            </div>
        </div>
    );
};

export default ViewBiodata;
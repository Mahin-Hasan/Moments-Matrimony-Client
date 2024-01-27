import { Link, useLoaderData } from 'react-router-dom';
import TitleCaption from '../../components/TitleCaption/TitleCaption';
import useBiodata from '../../hooks/useBiodata';
import { FaHeart } from "react-icons/fa";
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const BiodataDetails = () => {
    const bioDataDetail = useLoaderData();

    const [biodatas, , refetch] = useBiodata();
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();



    const { biodataID, biodataType, yourName, profileImg, dateOfBirth, yourHeight, yourWeight, yourAge, occupation, race, fathersName, mothersName, permanentDivision, presentDivision, expectedPartnerAge, expectedPartnerHeight, contactEmail, mobileNumber, expectedPartnerWeight, isFavourite } = bioDataDetail;
    const isPremium = false; // later change it with dynamic checking method
    const isLiked = !!isFavourite; // implement later 
    const heartClass = `text-${isLiked ? 'red-700' : 'blue-500'} text-xl`;

    //add filter by male female
    const genderFilter = biodatas.filter(biodata => biodata.biodataType === `${biodataType}`);
    console.log(biodatas);
    console.log(genderFilter);

    // for detailed fav
    const handleDetailFavourite = item => {
        console.log(item);
        const favouriteUser = {
            favBioId: item.biodataID,
            favName: item.yourName,
            permanentDiv: item.permanentDivision,
            favWork: item.occupation,
            favouritedBy: user.email,
            originalID: item._id,
            isFavourite: 'true'
        }
        console.log(favouriteUser);
        Swal.fire({
            title: "Add to Favourates?",
            text: `Add ${item.yourName} to your Favourates`,
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Add to My Favourite"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.post(`/favourite`, favouriteUser)
                    .then(res => {
                        if (res.data.insertedId) {
                            axiosPublic.patch(`/biodatas/favourite/${item._id}`)
                                .then(res => {
                                    if (res.data.modifiedCount > 0) {
                                        refetch();
                                    }
                                })
                            refetch();
                            Swal.fire({
                                title: "Success!",
                                text: `${item.yourName} has ben added to favourates`,
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }
    // for filtered fav
    const handleMakeFavourite = likedBio => {
        console.log(likedBio);

        const favouriteUser = {
            favBioId: likedBio.biodataID,
            favName: likedBio.yourName,
            permanentDiv: likedBio.permanentDivision,
            favWork: likedBio.occupation,
            favouritedBy: user.email,
            originalID: likedBio._id,
            isFavourite: 'true'
        }
        console.log(favouriteUser);
        Swal.fire({
            title: "Add to Favourates?",
            text: `Add ${likedBio.yourName} to your Favourates`,
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Add to My Favourite"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.post(`/favourite`, favouriteUser)
                    .then(res => {
                        if (res.data.insertedId) {
                            refetch();
                            Swal.fire({
                                title: "Success!",
                                text: `${likedBio.yourName} has ben added to favourates`,
                                icon: "success"
                            });
                        }
                    })
            }
        });

    }

    return (
        <div>
            <TitleCaption title={'BioData Details'}></TitleCaption>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
                <div className="rounded-lg bg-gray-200">
                    {/* add single detail */}
                    <article className="rounded-xl border border-gray-700 bg-blue-950 p-4">
                        <div className="flex items-center gap-4">
                            <img
                                src={profileImg}
                                className="h-16 w-16 rounded-full object-cover"
                            />
                            <div>
                                <h3 className="text-lg font-medium text-white">{yourName} <span className='font-bold text-xl text-pink-600'>|</span> gender: {biodataType}</h3>

                                <div className="flow-root">
                                    <ul className="-m-1 flex flex-wrap">
                                        <li className="p-1 leading-none">
                                            <span className="text-xs font-medium text-gray-300">Age: {yourAge} </span>
                                        </li>
                                        <li className="p-1 leading-none">
                                            <span className="text-xs font-medium text-gray-300">Profession: {occupation}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <span className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600 relative">
                                    <div className='absolute top-0 right-0 mr-3 mt-3'>

                                        <button
                                            onClick={() => handleDetailFavourite(bioDataDetail)}
                                            className="inline-block rounded-full  bg-white border-2 border-red-600 p-3 text-red-600 hover:bg-pink-300 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
                                        >
                                            <FaHeart className={heartClass} />
                                        </button>
                                    </div>
                                    <strong className="font-medium text-lg text-pink-500">My Bio</strong>
                                    <p className="mt-1 text-sm font-medium text-gray-300"> BioData ID: {biodataID} </p>
                                    <p className="mt-1 text-sm font-medium text-gray-300"> Race: {race} </p>
                                    <p className="mt-1 text-sm font-medium text-gray-300"> Fathers Name: {fathersName} </p>
                                    <p className="mt-1 text-sm font-medium text-gray-300">Mothers Name: {mothersName} </p>
                                    <p className="mt-1 text-sm font-medium text-gray-300">Height: {yourHeight} </p>
                                    <p className="mt-1 text-sm font-medium text-gray-300">Weight: {yourWeight} </p>
                                    <p className="mt-1 text-sm font-medium text-gray-300">Date of Birth: {dateOfBirth} </p>
                                    <p className="mt-1 text-sm font-medium text-gray-300">Present Location: {presentDivision} </p>
                                    <p className="mt-1 text-sm font-medium text-gray-300">Permanent Location: {permanentDivision} </p>
                                </span>
                            </li>

                            <li>
                                <span className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600">
                                    <strong className="font-medium text-lg text-pink-500">Looking in my partner</strong>
                                    <p className="mt-1 text-sm font-medium text-gray-300">Prefered partners age: {expectedPartnerAge} years old</p>
                                    <p className="mt-1 text-sm font-medium text-gray-300">Prefered height: {expectedPartnerHeight} </p>
                                    <p className="mt-1 text-sm font-medium text-gray-300">Prefered Weight: {expectedPartnerWeight} </p>
                                </span>
                            </li>
                            <li>
                                <span className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600">
                                    <strong className="font-medium text-lg text-pink-500">My Contact Information</strong>
                                    {
                                        isPremium ? <>
                                            <p className="mt-1 text-sm font-medium text-gray-300">Email: {contactEmail} </p>
                                            <p className="mt-1 text-sm font-medium text-gray-300">Mobile: 0{mobileNumber} </p>
                                        </>
                                            :
                                            <>
                                                <p className='text-blue-500 my-4'>!! Add premium subscription to view contact !!</p>
                                                <Link  to={`/dashboard/checkout/${biodataID}`}>
                                                    <button type="button" className="relative w-full px-8 py-4 overflow-hidden font-semibold rounded bg-blue-700 text-gray-50">Request Contact Information
                                                        <span className="absolute top-0 right-0 px-6 py-1 text-xs tracki text-center uppercase whitespace-no-wrap origin-bottom-left transform rotate-45 -translate-y-full translate-x-1/3 bg-sky-500">REQ</span>
                                                    </button>
                                                </Link>
                                            </>
                                    }
                                </span>
                            </li>
                        </ul>
                    </article>

                </div>
                <div className="rounded-lg bg-cyan-50 lg:col-span-2">
                    <h1 className='text-center dancing-script text-4xl capitalize font-bold text-fuchsia-700 my-6'>Suggested People For you</h1>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mx-2">
                        {/* show gender */}
                        {
                            genderFilter.map(item => <div key={item._id} className="rounded-lg bg-gray">
                                <article
                                    className="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]"
                                >
                                    <div className="rounded-[10px] bg-white p-2  sm:p-4">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={item.profileImg}
                                                className="h-16 w-16 rounded-tr-2xl rounded-bl-xl object-cover"
                                            />
                                            <h1>{item.yourName}</h1>
                                        </div>
                                        <time className="block text-xs text-blue-600 font-semibold mt-3"> DOB: {item.dateOfBirth} </time>

                                        <a href="#">
                                            <h3 className="mt-0.5 text-sm font-medium text-gray-900">
                                                Occupation {item.occupation}
                                            </h3>
                                        </a>

                                        <div className="mt-4 flex flex-wrap gap-1">
                                            <button
                                                onClick={() => handleMakeFavourite(item)}
                                                className="group inline-block rounded-full w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
                                            >
                                                <span
                                                    className="flex gap-3 justify-center items-center rounded-full bg-white px-4 py-2 text-base font-medium group-hover:bg-transparent"
                                                >
                                                    Make Favourite
                                                    {/* make heart class conditional */}
                                                    <FaHeart className='text-rose-600' />
                                                </span>

                                            </button>
                                            {/* <span
                                                className="whitespace-nowrap rounded-full bg-blue-500 px-2.5 py-0.5 text-xs text-White"
                                            >
                                                Add to Favourates
                                            </span>
                                            <span>
                                                <FaHeart />
                                            </span> */}
                                        </div>
                                    </div>
                                </article>
                            </div>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BiodataDetails;
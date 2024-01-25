import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const AddBiodata = () => {
    const { user } = useAuth();
    const [loggedUser, setLoggedUser] = useState('');
    const axiosPublic = useAxiosPublic();


    const { data: biodatas = [], refetch } = useQuery({
        queryKey: ['biodatas'],
        queryFn: async () => {
            const res = await axiosPublic.get('/biodatas');
            return res.data;
        }
    })

    useEffect(() => {
        refetch();
        setLoggedUser(user?.email || '');
    }, [user, refetch]);


    console.log(loggedUser);
    const dynamicBioID = biodatas.length + 1;
    console.log(dynamicBioID);
    // Hook Form

    const {
        register,
        handleSubmit,
        reset,
        // formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {

        console.log(data);
        /*
biodataID, biodataType, contactEmail, dateOfBirth, expectedPartnerAge, expectedPartnerHeight, expectedPartnerWeight, fathersName, mobileNumber, mothersName, occupation, permanentDivision, profileImg, presentDivision, race, yourAge, yourHeight, yourName, yourWeight
       */
        const bioDataInformation = {
            biodataID: dynamicBioID,
            biodataType: data.biodataType,
            yourName: data.yourName,
            profileImg: data.profileImg,
            dateOfBirth: data.dateOfBirth,
            yourHeight: data.yourHeight,
            yourWeight: data.yourWeight,
            yourAge: parseInt(data.yourAge),
            occupation: data.occupation,
            race: data.race,
            fathersName: data.fathersName,
            mothersName: data.mothersName,
            permanentDivision: data.permanentDivision,
            presentDivision: data.presentDivision,
            expectedPartnerAge: parseInt(data.expectedPartnerAge),
            expectedPartnerHeight: data.expectedPartnerHeight,
            expectedPartnerWeight: data.expectedPartnerWeight,
            contactEmail: user.email,
            mobileNumber: parseInt(data.mobileNumber),
        }
        console.log(bioDataInformation);
        const bioDataRes = await axiosPublic.post('/biodatas', bioDataInformation);
        console.log(bioDataRes.data);
        if (bioDataRes.data.insertedId) {
            reset();
            // show popup sucess
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Biodata of ${data.yourName} is added`,
                showConfirmButton: false,
                timer: 1500
            });
        }

        // reset();
        refetch();
    }
    return (
        <div>
            <section className="p-6 bg-gray-100 text-gray-900">
                <div className="container flex flex-col mx-auto space-y-12">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-50">

                            <div className="space-y-2 col-span-full lg:col-span-1">
                                <p className="font-medium ">Add Biodata Information</p>
                                <p className="text-sm">Add your credentials and find your life partner via Moments Matrimony</p>
                                <div>
                                    <h1>Email Used:</h1>
                                    <span>{user?.email}</span>
                                    {/* <input
                                        type="hidden"
                                        {...register('contactEmail', { value: `${loggedUser}` })}
                                    />
                                    <input
                                        type="hidden"
                                        // {...register('contactEmail', { defaultValue: 'asdasd' })}
                                        {...register('biodataID', { value: `${dynamicBioID}` })}
                                    /> */}
                                </div>

                            </div>
                            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                                <div className="col-span-full sm:col-span-3">
                                    <label className="text-sm">Your name</label>
                                    <input
                                        type="text"
                                        {...register("yourName", { required: true })}
                                        placeholder="Your name" className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900" />
                                </div>
                                <div className="col-span-full sm:col-span-3">
                                    <label className="text-sm">Biodata Type</label>
                                    <select defaultValue="default"
                                        {...register("biodataType", { required: true })}
                                        className="w-full rounded-md border-gray-300 text-gray-900">
                                        <option disabled value="default">Select Biodata Type</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>

                                <div className="col-span-full sm:col-span-3">
                                    <label className="text-sm">Date of Birth</label>
                                    <input id="lastname" type="date"
                                        {...register("dateOfBirth", { required: true })}
                                        placeholder="Date of Birth" className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900" />
                                </div>
                                {/* Height */}
                                <div className="col-span-full sm:col-span-3">
                                    <label className="text-sm">Your Height</label>
                                    <select defaultValue="default"
                                        {...register("yourHeight", { required: true })}
                                        className="w-full rounded-md border-gray-300 text-gray-900">
                                        <option disabled value="default">Select Your Height</option>
                                        <option value="4ft 1 Inch">4ft 1 Inch</option>
                                        <option value="4ft 2 Inch">4ft 2 Inch</option>
                                        <option value="4ft 3 Inch">4ft 3 Inch</option>
                                        <option value="4ft 4 Inch">4ft 4 Inch</option>
                                        <option value="4ft 5 Inch">4ft 5 Inch</option>
                                        <option value="4ft 6 Inch">4ft 6 Inch</option>
                                        <option value="4ft 7 Inch">4ft 7 Inch</option>
                                        <option value="4ft 8 Inch">4ft 8 Inch</option>
                                        <option value="4ft 9 Inch">4ft 9 Inch</option>
                                        <option value="4ft 10 Inch">4ft 10 Inch</option>
                                        <option value="4ft 11 Inch">4ft 11 Inch</option>
                                        <option value="5ft 1 Inch">5ft 1 Inch</option>
                                        <option value="5ft 2 Inch">5ft 2 Inch</option>
                                        <option value="5ft 3 Inch">5ft 3 Inch</option>
                                        <option value="5ft 4 Inch">5ft 4 Inch</option>
                                        <option value="5ft 5 Inch">5ft 5 Inch</option>
                                        <option value="5ft 6 Inch">5ft 6 Inch</option>
                                        <option value="5ft 7 Inch">5ft 7 Inch</option>
                                        <option value="5ft 8 Inch">5ft 8 Inch</option>
                                        <option value="5ft 9 Inch">5ft 9 Inch</option>
                                        <option value="5ft 10 Inch">5ft 10 Inch</option>
                                        <option value="5ft 11 Inch">5ft 11 Inch</option>
                                        <option value="6ft 1 Inch">6ft 1 Inch</option>
                                        <option value="6ft 2 Inch">6ft 2 Inch</option>
                                        <option value="6ft 3 Inch">6ft 3 Inch</option>
                                        <option value="6ft 4 Inch">6ft 4 Inch</option>
                                        <option value="6ft 5 Inch">6ft 5 Inch</option>
                                    </select>
                                </div>
                                {/* Weight */}
                                <div className="col-span-full sm:col-span-3">
                                    <label className="text-sm">Your Weight</label>
                                    <select defaultValue="default"
                                        {...register("yourWeight", { required: true })}
                                        className="w-full rounded-md border-gray-300 text-gray-900">
                                        <option disabled value="default">Select Your Weight</option>
                                        <option value="45-50 KG">Between 45-50 Kg</option>
                                        <option value="50-55 KG">Between 50-55 Kg</option>
                                        <option value="55-60 KG">Between 55-60 Kg</option>
                                        <option value="60-65 KG">Between 60-65 Kg</option>
                                        <option value="65-70 KG">Between 65-70 Kg</option>
                                        <option value="70-75 KG">Between 70-75 Kg</option>
                                        <option value="75-80 KG">Between 75-80 Kg</option>
                                        <option value="Above 80KG">Above 80 Kg</option>
                                    </select>
                                </div>
                                {/* age */}
                                <div className="col-span-full sm:col-span-3">
                                    <label className="text-sm">Your Age</label>
                                    <input
                                        type="number"
                                        {...register("yourAge", { required: true })}
                                        placeholder="Your age"
                                        className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900" />
                                </div>
                                {/* Occupation */}
                                <div className="col-span-full sm:col-span-3">
                                    <label className="text-sm">Occupation</label>
                                    <select defaultValue="default"
                                        {...register("occupation", { required: true })}
                                        className="w-full rounded-md border-gray-300 text-gray-900">
                                        <option disabled value="default">Select Occupation</option>
                                        <option value="Technology and IT">Technology and IT</option>
                                        <option value="Education">Education</option>
                                        <option value="Healthcare Professions">Healthcare Professions</option>
                                        <option value="HouseWife">HouseWife</option>
                                        <option value="Arts and Creative Professions">Arts and Creative Professions</option>
                                        <option value="Engineering">Engineering</option>
                                        <option value="Science and Research">Science and Research</option>
                                        <option value="Social Services">Social Services</option>
                                        <option value="Legal Professions">Legal Professions</option>
                                        <option value="Communication and Media">Communication and Media</option>
                                        <option value="Hospitality and Tourism">Hospitality and Tourism</option>
                                        <option value="Skilled Trades">Skilled Trades</option>
                                        <option value="Sports and Fitness">Sports and Fitness</option>
                                        <option value="Agriculture">Agriculture</option>
                                        <option value="Government and Public Administration">Government and Public Administration</option>
                                    </select>
                                </div>
                                {/* Race */}
                                <div className="col-span-full sm:col-span-3">
                                    <label className="text-sm">Race</label>
                                    <select defaultValue="default"
                                        {...register("race", { required: true })}
                                        className="w-full rounded-md border-gray-300 text-gray-900">
                                        <option disabled value="default">Select Race</option>
                                        <option value="Caucasian/White">Caucasian/White</option>
                                        <option value="African/African American/Black">African/African American/Black</option>
                                        <option value="Asian">Asian</option>
                                        <option value="Native American/Indigenous">Native American/Indigenous</option>
                                        <option value="Pacific Islander">Pacific Islander</option>
                                        <option value="Latino/Hispanic">Latino/Hispanic</option>
                                    </select>
                                </div>
                                {/* Permanent Division Name */}
                                <div className="col-span-full sm:col-span-3">
                                    <label className="text-sm">Permanent Division Name</label>
                                    <select defaultValue="default"
                                        {...register("permanentDivision", { required: true })}
                                        className="w-full rounded-md border-gray-300 text-gray-900">
                                        <option disabled value="default">Select Permanent Division</option>
                                        <option value="Dhaka">Dhaka</option>
                                        <option value="Chattagram">Chattagram</option>
                                        <option value="Rangpur">Rangpur</option>
                                        <option value="Barisal">Barisal</option>
                                        <option value="Khulna">Khulna</option>
                                        <option value="Maymansign">Maymansign</option>
                                        <option value="Sylhet">Sylhet</option>
                                    </select>
                                </div>
                                {/* Present Division Name */}
                                <div className="col-span-full sm:col-span-3">
                                    <label className="text-sm">Present Division Name</label>
                                    <select defaultValue="default"
                                        {...register("presentDivision", { required: true })}
                                        className="w-full rounded-md border-gray-300 text-gray-900">
                                        <option disabled value="default">Select Present Division</option>
                                        <option value="Dhaka">Dhaka</option>
                                        <option value="Chattagram">Chattagram</option>
                                        <option value="Rangpur">Rangpur</option>
                                        <option value="Barisal">Barisal</option>
                                        <option value="Khulna">Khulna</option>
                                        <option value="Maymansign">Maymansign</option>
                                        <option value="Sylhet">Sylhet</option>
                                    </select>
                                </div>
                                {/* Fathers name */}
                                <div className="col-span-full sm:col-span-3">
                                    <label className="text-sm">Fathers name</label>
                                    <input {...register("fathersName", { required: true })} type="text" placeholder="Fathers name" className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900" />
                                </div>
                                {/* Mothers name */}
                                <div className="col-span-full sm:col-span-3">
                                    <label className="text-sm">Mothers name</label>
                                    <input {...register("mothersName", { required: true })} type="text" placeholder="Mothers name" className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900" />
                                </div>
                                {/* Partner age */}
                                <div className="col-span-full sm:col-span-3">
                                    <label className="text-sm">Expected Partner Age</label>
                                    <input {...register("expectedPartnerAge", { required: true })} type="number" placeholder="Your age" className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900" />
                                </div>
                                {/* partner height */}
                                <div className="col-span-full sm:col-span-3">
                                    <label className="text-sm">Expected Partner Height</label>
                                    <select defaultValue="default"
                                        {...register("expectedPartnerHeight", { required: true })}
                                        className="w-full rounded-md border-gray-300 text-gray-900">
                                        <option disabled value="default">Select Expected Partner Height</option>
                                        <option value="4ft 1 Inch">4ft 1 Inch</option>
                                        <option value="4ft 2 Inch">4ft 2 Inch</option>
                                        <option value="4ft 3 Inch">4ft 3 Inch</option>
                                        <option value="4ft 4 Inch">4ft 4 Inch</option>
                                        <option value="4ft 5 Inch">4ft 5 Inch</option>
                                        <option value="4ft 6 Inch">4ft 6 Inch</option>
                                        <option value="4ft 7 Inch">4ft 7 Inch</option>
                                        <option value="4ft 8 Inch">4ft 8 Inch</option>
                                        <option value="4ft 9 Inch">4ft 9 Inch</option>
                                        <option value="4ft 10 Inch">4ft 10 Inch</option>
                                        <option value="4ft 11 Inch">4ft 11 Inch</option>
                                        <option value="5ft 1 Inch">5ft 1 Inch</option>
                                        <option value="5ft 2 Inch">5ft 2 Inch</option>
                                        <option value="5ft 3 Inch">5ft 3 Inch</option>
                                        <option value="5ft 4 Inch">5ft 4 Inch</option>
                                        <option value="5ft 5 Inch">5ft 5 Inch</option>
                                        <option value="5ft 6 Inch">5ft 6 Inch</option>
                                        <option value="5ft 7 Inch">5ft 7 Inch</option>
                                        <option value="5ft 8 Inch">5ft 8 Inch</option>
                                        <option value="5ft 9 Inch">5ft 9 Inch</option>
                                        <option value="5ft 10 Inch">5ft 10 Inch</option>
                                        <option value="5ft 11 Inch">5ft 11 Inch</option>
                                        <option value="6ft 1 Inch">6ft 1 Inch</option>
                                        <option value="6ft 2 Inch">6ft 2 Inch</option>
                                        <option value="6ft 3 Inch">6ft 3 Inch</option>
                                        <option value="6ft 4 Inch">6ft 4 Inch</option>
                                        <option value="6ft 5 Inch">6ft 5 Inch</option>
                                    </select>
                                </div>
                                {/* Partner weight */}
                                <div className="col-span-full sm:col-span-3">
                                    <label className="text-sm">Expected Partner Weight</label>
                                    <select defaultValue="default"
                                        {...register("expectedPartnerWeight", { required: true })}
                                        className="w-full rounded-md border-gray-300 text-gray-900">
                                        <option disabled value="default">Select Expected Partner Weight</option>
                                        <option value="45-50 KG">Between 45-50 Kg</option>
                                        <option value="50-55 KG">Between 50-55 Kg</option>
                                        <option value="55-60 KG">Between 55-60 Kg</option>
                                        <option value="60-65 KG">Between 60-65 Kg</option>
                                        <option value="65-70 KG">Between 65-70 Kg</option>
                                        <option value="70-75 KG">Between 70-75 Kg</option>
                                        <option value="75-80 KG">Between 75-80 Kg</option>
                                        <option value="Above 80KG">Above 80 Kg</option>
                                    </select>
                                </div>
                                {/* Mobile number || add number must be 11 validation */}
                                <div className="col-span-full sm:col-span-3">
                                    <label className="text-sm">Mobile Number</label>
                                    <input
                                        {...register("mobileNumber", { required: true })}
                                        type="number" placeholder="Your number" className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900" />
                                </div>
                                {/* user photo URL */}
                                <div className="col-span-6">
                                    <label className="block text-sm font-medium text-gray-700">Photo URL </label>
                                    <input
                                        placeholder="Your Photo URL"
                                        type="text"
                                        {...register("profileImg", { required: true })}
                                        className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900"
                                    />

                                </div>
                                {/* <div className="col-span-full">
                                <label className="text-sm">Address</label>
                                <input id="address" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900" />
                            </div>
                            <div className="col-span-full sm:col-span-2">
                                <label className="text-sm">City</label>
                                <input id="city" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900" />
                            </div>
                            <div className="col-span-full sm:col-span-2">
                                <label className="text-sm">State / Province</label>
                                <input id="state" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900" />
                            </div>
                            <div className="col-span-full sm:col-span-2">
                                <label className="text-sm">ZIP / Postal</label>
                                <input id="zip" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900" />
                            </div> */}
                            </div>
                        </fieldset>
                        {/* <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-50">
			<div className="space-y-2 col-span-full lg:col-span-1">
				<p className="font-medium">Profile</p>
				<p className="text-xs">Adipisci fuga autem eum!</p>
			</div>
			<div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
				<div className="col-span-full sm:col-span-3">
					<label className="text-sm">Username</label>
					<input id="username" type="text" placeholder="Username" className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900" />
				</div>
				<div className="col-span-full sm:col-span-3">
					<label className="text-sm">Website</label>
					<input id="website" type="text" placeholder="https://" className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900" />
				</div>
				<div className="col-span-full">
					<label className="text-sm">Bio</label>
					<textarea id="bio" placeholder="" className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900"></textarea>
				</div>
				<div className="col-span-full">
					<label className="text-sm">Photo</label>
					<div className="flex items-center space-x-2">
						<img src="https://source.unsplash.com/30x30/?random" alt="" className="w-10 h-10 rounded-full bg-gray-500 bg-gray-300" />
						<button type="button" className="px-4 py-2 border rounded-md border-gray-800">Change</button>
					</div>
				</div>
			</div>
		</fieldset> */}
                        <button className="inline-block rounded bg-blue-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-blue-500">
                            Add BioData
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default AddBiodata;
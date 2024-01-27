import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useBiodata from '../../../hooks/useBiodata';
import Banner from '../Banner/Banner';
import PremiumMember from '../PremiumMember/PremiumMember';
import TitleCaption from '../../../components/TitleCaption/TitleCaption';

const Home = () => {
    const [biodatas] = useBiodata();
    const axiosPublic = useAxiosPublic();
    console.log(biodatas);
    const { data: premium = [], refetch } = useQuery({
        queryKey: ['premium'],
        queryFn: async () => {
            const res = await axiosPublic.get('/premium');
            return res.data;
        }
    })



    const premiumBio = premium.filter(item => item.
        status === 'premium');
    console.log(premiumBio);
    return (
        <div>
            <Banner></Banner>
            <section>
                <TitleCaption title={'Featured Premium Biodatas'}></TitleCaption>
                <section className="bg-blue-50 text-gray-800">
                    <div className="container flex flex-col items-center justify-center p-4 mx-auto sm:p-10">
                        <h1 className='text-center px-10 sm:px-20'>Discover a world of unparalleled matchmaking with Moments Matrimony&rsquo;s Featured Premium Biodata. Our carefully curated selection showcases exceptional individuals, offering a glimpse into their unique personalities, aspirations, and life journeys. Elevate your search for a life partner with our premium biodata, crafted to help you find the perfect match. Join Moments Matrimony today and embark on a journey where meaningful connections begin</h1>
                        <div className="flex flex-row flex-wrap-reverse justify-center mt-8">
                            {
                                premiumBio.slice(0, 6).map(premiumBiodata =>
                                    <PremiumMember
                                        key={premiumBiodata._id}
                                        premiumBiodata={premiumBiodata}>
                                    </PremiumMember>)
                            }
                        </div>
                    </div>
                </section>
            </section>
            <section className='my-20'>
                <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="bg-blue-600 p-8 md:p-12 lg:px-16 lg:py-24">
                            <div className="mx-auto max-w-xl text-center">
                                <h2 className="text-2xl font-bold text-white md:text-3xl">
                                    Find Life Partner of your dream With Moments Matrimonial
                                </h2>

                                <p className="hidden text-white/90 sm:mt-4 sm:block">
                                    Experience wedding success with Moments Matrimonial! From dreamy ceremonies to seamless receptions, we turn your vision into reality. Our expert team ensures every detail is perfected, creating cherished and magical memories. Trust Moments Matrimonial for a seamlessly unforgettable celebration!
                                </p>

                                <div className="mt-4 md:mt-8">
                                    <a
                                        href="#"
                                        className="inline-block rounded border border-white bg-white px-12 py-3 text-sm font-medium text-blue-500 transition hover:bg-transparent hover:text-white focus:outline-none focus:ring focus:ring-yellow-400"
                                    >
                                        Get Started Today
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
                            <img
                                alt="Student"
                                src="https://images.unsplash.com/photo-1621274790572-7c32596bc67f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80"
                                className="h-40 w-full object-cover sm:h-56 md:h-full"
                            />

                            <img
                                alt="Student"
                                src="https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                                className="h-40 w-full object-cover sm:h-56 md:h-full"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
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
            <h2>this is home</h2>
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
        </div>
    );
};

export default Home;
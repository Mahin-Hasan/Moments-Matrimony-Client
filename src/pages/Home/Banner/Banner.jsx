import banner from '../../../assets/banner.jpg'


const Banner = () => {
    return (
        <section
            style={{ backgroundImage: `url(${banner})` }}
            className="relative bg-cover bg-center bg-no-repeat"
        >
            <div
                className="absolute inset-0 bg-white/25 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
            ></div>

            <div
                className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8 text-white"
            >
                <div className="max-w-xl text-center sm:text-left rtl:sm:text-right bg-gradient-to-r from-[#455368]/25 to-[#463e66] rounded-md">
                    <h1 className="text-3xl font-extrabold sm:text-5xl">
                        Let us find your

                        <strong className="block font-extrabold text-rose-600"> Life Partner. </strong>
                    </h1>

                    <p className="mt-4 max-w-lg sm:text-xl/relaxed">
                    Discover the magic of love with Moments Matrimonial, where every click brings you closer to your forever. Start your journey to finding a life partner, creating beautiful moments that last a lifetime
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4 text-center">
                        <a
                            href="#"
                            className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
                        >
                            See Biodatas
                        </a>

                        <a
                            href="#"
                            className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
                        >
                            Learn More
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
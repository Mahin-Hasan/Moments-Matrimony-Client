import TitleCaption from "../../components/TitleCaption/TitleCaption";


const Contact = () => {
    return (
        <div>
            <TitleCaption title={'Contact US'}></TitleCaption>
            <div className="grid max-w-screen-xl grid-cols-1 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 bg-purple-100 text-gray-800">
                <div className="flex flex-col justify-between">
                    <div className="space-y-2">
                        <h2 className="text-4xl font-bold leadi lg:text-5xl">Let's talk!</h2>
                        <div className="text-gray-600">Vivamus in nisl metus? Phasellus.</div>
                    </div>
                    <img src="https://img.freepik.com/free-vector/contact-us-concept-illustration_114360-3147.jpg" alt="" className="p-6 h-52 md:h-64" />
                </div>
                <form className="space-y-6">
                    <div>
                        <label className="text-sm">Full name</label>
                        <input id="name" type="text" placeholder="" className="w-full p-3 rounded bg-gray-100" />
                    </div>
                    <div>
                        <label className="text-sm">Email</label>
                        <input id="email" type="email" className="w-full p-3 rounded bg-gray-100" />
                    </div>
                    <div>
                        <label className="text-sm">Message</label>
                        <textarea id="message" rows="3" className="w-full p-3 rounded bg-gray-100"></textarea>
                    </div>
                    <button type="submit" className="w-full p-3 text-sm font-bold tracki uppercase rounded bg-blue-600 text-gray-50">Send Message</button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
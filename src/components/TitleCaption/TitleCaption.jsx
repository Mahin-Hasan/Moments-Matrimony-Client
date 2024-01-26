
const TitleCaption = ({ title }) => {
    return (
        <div className="flex justify-center">
            {/* <span className="h-px flex-1 bg-black"></span> */}
            <h1 className="dancing-script text-4xl font-semibold my-9 text-blue-600 border-y-4 py-4 w-full text-center border-blue-300">_ {title} _</h1>
        </div>
    );
};

export default TitleCaption;
import { Link } from "react-router-dom";

const EditBiodata = () => {
    return (
        <div>
            <div>
                {/* add Biodata */}
                <Link to='/dashboard/addBiodata'>
                    <button>Add Your BioData</button>
                </Link>
            </div>
            <div>
                {/* map all bio */}
            </div>
        </div>
    );
};

export default EditBiodata;
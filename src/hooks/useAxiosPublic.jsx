import axios from "axios";


const axiosPublic = axios.create({
    baseURL: 'https://moments-matrimony-server.onrender.com'
})

const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;
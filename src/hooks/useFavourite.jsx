
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useFavourite = () => {

    const axiosPublic = useAxiosPublic();

    const { refetch, data: favourite = [] } = useQuery({
        queryKey: ['favourite'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/favourite`)
            return res.data;
        }
    })
    return [favourite, refetch]
};

export default useFavourite;
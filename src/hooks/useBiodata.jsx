import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useBiodata = (ageAsc, minValue, maxValue, searchUser) => {
    const axiosPublic = useAxiosPublic();

    const { data: biodatas = [], isPending: loading, refetch } = useQuery({
        queryKey: ['biodatas', ageAsc, minValue, maxValue, searchUser],
        queryFn: async () => {
            const res = await axiosPublic.get(`/biodatas?sort=${ageAsc ? 'asc' : 'desc'}&minValue=${minValue}&maxValue=${maxValue}&gender=${searchUser ? searchUser : ''}`);
            return res.data;
        }
    })
    return [biodatas, loading, refetch]
};

export default useBiodata;

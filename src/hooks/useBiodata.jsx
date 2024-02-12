import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useBiodata = (ageAsc, minValue, maxValue, searchUser, gender) => {
    const axiosPublic = useAxiosPublic();

    const { data: biodatas = [], isPending: loading, refetch } = useQuery({
        queryKey: ['biodatas', ageAsc, minValue, maxValue, searchUser, gender],
        queryFn: async () => {
            const res = await axiosPublic.get(`/biodatas?sort=${ageAsc ? 'asc' : 'desc'}&minValue=${minValue ? minValue : 15}&maxValue=${maxValue ? maxValue : 50}&name=${searchUser ? searchUser : ''}&gender=${gender ? gender : ''}`);
            return res.data;
        }
    })
    return [biodatas, loading, refetch]
};

export default useBiodata;

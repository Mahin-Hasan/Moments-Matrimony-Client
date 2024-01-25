import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useBiodata = () => {
    const axiosPublic = useAxiosPublic();

    const { data: biodatas = [], isPending: loading, refetch } = useQuery({
        queryKey: ['biodatas'],
        queryFn: async () => {
            const res = await axiosPublic.get('/biodatas');
            return res.data;
        }
    })
    return [biodatas, loading, refetch]
};

export default useBiodata;
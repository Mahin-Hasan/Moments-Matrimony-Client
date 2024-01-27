import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const usePremium = () => {
    const { user, loading } = useAuth(); 
    const axiosPublic = useAxiosPublic();//secure bc only admin can check
    const { data: isPremium, isPending: isPremiumLoading } = useQuery({
        queryKey: [user?.email, 'isPremium'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosPublic.get(`/invoice/premium/${user.email}`);
            return res.data?.premium;
        }
    })
    return [isPremium, isPremiumLoading] 
};

export default usePremium;
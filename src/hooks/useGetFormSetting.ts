import { useQuery } from '@tanstack/react-query';
import axios from '../api/axios';
import { organizationId, type FormNColumnStructure } from '../constants';

const fetchFormSetting = async () => {
    const response = await axios.get('/GetFormSetting', {
        params: { organizationId, id: organizationId },
    });
    return response.data;
};

export const useGetFormSetting = () => {
    return useQuery<FormNColumnStructure>({
        queryKey: ['formSetting'],
        queryFn: fetchFormSetting,
    });
};

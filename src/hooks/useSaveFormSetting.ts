import axios from "../api/axios";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { organizationId, type FormNColumnStructure } from "../constants";

export const saveFormSetting = async (data: FormNColumnStructure) => {
    const response = await axios.post('/SaveForm', data, { params: { organizationId } });
    return response.data;
};

export const useSaveFormSetting = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: FormNColumnStructure) => saveFormSetting(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getFormSetting'] });
        },
    });
};
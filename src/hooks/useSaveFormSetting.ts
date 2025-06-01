import axios from "../api/axios";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { organizationId, type FormStructure } from "../constants";

export const saveFormSetting = async (data: FormStructure) => {
    const response = await axios.post('/SaveForm', data, { params: { organizationId } });
    return response.data;
};

export const useSaveFormSetting = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: FormStructure) => saveFormSetting(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getFormSetting'] });
        },
    });
};
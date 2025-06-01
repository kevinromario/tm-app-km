import axios from "../api/axios";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { organizationId, type FormDataType } from "../constants";

export const updateTask = async (data: FormDataType) => {
    const response = await axios.post('/UpdateTask', data, { params: { organizationId, taskId: data.taskId } });
    return response.data;
};

export const useUpdateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: FormDataType) => updateTask(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getTasks'] });
        },
    });
};
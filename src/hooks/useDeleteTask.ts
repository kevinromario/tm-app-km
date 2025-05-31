import axios from "../api/axios";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { organizationId } from "../constants";

export const deleteTask = async ({taskId}: {taskId: string}) => {
  const response = await axios.delete('/DeleteTask', {params: {taskId, organizationId}});
  return response.data;
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({taskId}: {taskId:string}) => deleteTask({taskId}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getTasks'] });
    },
  });
};
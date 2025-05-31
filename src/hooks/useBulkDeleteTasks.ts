import axios from "../api/axios";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { organizationId } from "../constants";

export const bulkDeleteTasks = async ({listId}: {listId: string[]}) => {
  const response = await axios.delete('/BulkDeleteTasks', {params: {organizationId}, data: listId});
  
  return response.data;
};

export const useBulkDeleteTasks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({listId}: {listId:string[]}) => bulkDeleteTasks({listId}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getTasks'] });
    },
  });
};
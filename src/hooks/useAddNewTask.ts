import axios from "../api/axios";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { FormDataType } from "../constants";

export const addNewTask = async (data: FormDataType) => {
  const response = await axios.post('/InsertTask', data);
  return response.data;
};

export const useAddNewTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: FormDataType) => addNewTask(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getTasks'] });
    },
  });
};
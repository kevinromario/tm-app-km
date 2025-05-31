import { useQuery } from '@tanstack/react-query';
import axios from '../api/axios';
import { organizationId } from '../constants';

type TaskType = Record<string, unknown>;

const fetchTasks = async (): Promise<TaskType[]> => {
  const response = await axios.get<TaskType[]>('/GetTasks', {params: {organizationId: organizationId}});
  return response.data;
};

export const useGetTasksList = () => {
  return useQuery({
    queryKey: ['getTasks'],
    queryFn: fetchTasks,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });
};

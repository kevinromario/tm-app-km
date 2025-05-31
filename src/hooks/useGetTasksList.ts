import { useInfiniteQuery } from '@tanstack/react-query';
import axios from '../api/axios';
import { organizationId, type FormDataType } from '../constants';

type ResQueryType = {
  tasks: FormDataType[];
  continuationToken?: string | null;
};

const fetchTasks = async ({ pageParam = '' }): Promise<ResQueryType> => {
  const response = await axios.get('/GetTasks', {
    params: { continuationToken: pageParam, organizationId: organizationId },
  });
  return response.data;
};

export const useGetTasksList = () => {
  const query = useInfiniteQuery({
    queryKey: ['getTasks'],
    queryFn: fetchTasks,
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage.continuationToken || undefined,
    retry: false
  });

  const tasksList =
    query.data?.pages.flatMap((page) => {
      return page.tasks;
    }) ?? [];

  return {
    ...query,
    tasksList,
  };
};

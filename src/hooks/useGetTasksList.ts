import { useInfiniteQuery, type InfiniteData, type QueryFunctionContext } from '@tanstack/react-query';
import axios from '../api/axios';
import { organizationId, type FormDataType } from '../constants';

type ResQueryType = {
  tasks: FormDataType[];
  continuationToken?: string | null;
};

type DynamicFilterParams = Record<string, string | string[] | Date | number | boolean | undefined | null>;


const fetchTasks = async (
  context: QueryFunctionContext<[string, DynamicFilterParams], string>
): Promise<ResQueryType> => {
  const { pageParam = '', queryKey } = context;
  const [, filters] = queryKey;
  const response = await axios.get('/GetTasks', {
    params: { continuationToken: pageParam, organizationId, ...filters },
  });
  return response.data;
};

export const useGetTasksList = (filters: DynamicFilterParams) => {
  const query = useInfiniteQuery<ResQueryType, Error, InfiniteData<ResQueryType>, [string, DynamicFilterParams], string>({
    queryKey: ['getTasks', filters],
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

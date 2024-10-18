import { useQuery } from '@tanstack/react-query';
import { useFantasyTargetApi } from '@providers/ApiProvider';

const useFantasyTargetsByIdsQuery = (ids: string[]) => {
  const fantasyTargetApi = useFantasyTargetApi();

  return useQuery({
    queryKey: ['fantasy-targets', { ids }],
    queryFn: () => fantasyTargetApi.getTargetsByIds(ids),
  });
};

export default useFantasyTargetsByIdsQuery;

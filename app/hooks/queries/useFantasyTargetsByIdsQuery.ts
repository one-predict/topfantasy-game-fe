import { skipToken, useQuery } from '@tanstack/react-query';
import { FantasyTarget } from '@api/FantasyTargetApi';
import { useFantasyTargetApi } from '@providers/ApiProvider';

const PLACEHOLDER_DATA = [] as FantasyTarget[];

const useFantasyTargetsByIdsQuery = (ids: string[]) => {
  const fantasyTargetApi = useFantasyTargetApi();

  return useQuery({
    queryKey: ['fantasy-targets', { ids }],
    queryFn: ids.length ? () => fantasyTargetApi.getTargetsByIds(ids) : skipToken,
    placeholderData: PLACEHOLDER_DATA,
  });
};

export default useFantasyTargetsByIdsQuery;

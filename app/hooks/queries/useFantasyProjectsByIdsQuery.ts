import { useQuery } from '@tanstack/react-query';
import { useFantasyProjectApi } from '@providers/ApiProvider';

const useFantasyProjectsByIdsQuery = (ids: string[]) => {
  const fantasyProjectApi = useFantasyProjectApi();

  return useQuery({
    queryKey: ['fantasy-projects', { ids }],
    queryFn: () => fantasyProjectApi.getProjectsByIds(ids),
  });
};

export default useFantasyProjectsByIdsQuery;

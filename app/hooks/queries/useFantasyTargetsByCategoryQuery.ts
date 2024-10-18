import { useQuery } from '@tanstack/react-query';
import FantasyTargetCategory from '@enums/FantasyTargetCategory';
import { useFantasyTargetApi } from '@providers/ApiProvider';

const useFantasyTargetsByCategoryQuery = (category: FantasyTargetCategory) => {
  const fantasyTargetApi = useFantasyTargetApi();

  return useQuery({
    queryKey: ['fantasy-targets', { category }],
    queryFn: () => fantasyTargetApi.getTargetsByCategory(category),
  });
};

export default useFantasyTargetsByCategoryQuery;

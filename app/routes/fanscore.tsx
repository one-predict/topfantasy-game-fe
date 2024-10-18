import AppSection from '@enums/AppSection';
import FantasyTargetCategory from '@enums/FantasyTargetCategory';
import useFantasyTargetsByCategoryQuery from '@hooks/queries/useFantasyTargetsByCategoryQuery';
import FanscoreTable from '@components/FanscoreTable';
import Page from '@components/Page';
import Loader from '@components/Loader';

export const handle = {
  appSection: AppSection.Fanscore,
};

const Fanscore = () => {
  const { data: fantasyTargets } = useFantasyTargetsByCategoryQuery(FantasyTargetCategory.Projects);

  return (
    <Page title="Fanscore">
      {fantasyTargets ? <FanscoreTable fantasyTargets={fantasyTargets} /> : <Loader centered size="large" />}
    </Page>
  );
};

export default Fanscore;

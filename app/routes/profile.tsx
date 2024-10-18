import clsx from 'clsx';
import AppSection from '@enums/AppSection';
import useMyReferralsQuery from '@hooks/queries/useMyReferralsQuery';
import useSession from '@app/hooks/useSession';
import Typography from '@components/Typography';
import Page from '@components/Page';
import ReferralsTable from '@components/ReferralsTable';
import Loader from '@components/Loader';
import CoinsDisplay from '@components/CoinsDisplay';
import InviteFriendsCard from '@components/InviteFriendsCard';
import LevelProgressBar from '@components/LevelProgressBar';
import styles from './profile.module.scss';

export const handle = {
  appSection: AppSection.Profile,
};

const RewardsPage = () => {
  const currentUser = useSession();

  const { data: myReferrals } = useMyReferralsQuery();

  const renderMyReferrals = () => {
    if (!myReferrals) {
      return <Loader centered />;
    }

    if (!myReferrals.length) {
      return (
        <Typography centered color="gray" variant="h5" alignment="center">
          You don't have any referrals yet.
        </Typography>
      );
    }

    return <ReferralsTable referrals={myReferrals} />;
  };

  return (
    <Page title="Profile">
      <div className={clsx(styles.userDetailsSection)}>
        <div className={styles.userDetailsLevelSection}>
          <Typography variant="h6">@{currentUser?.username || 'Anonymous'}</Typography>
          <LevelProgressBar />
        </div>
        <CoinsDisplay humanize variant="h5" coins={currentUser?.coinsBalance || 0} />
      </div>
      <InviteFriendsCard currentUserId={currentUser?.id} />
      <div className={styles.myFriendsSection}>
        <Typography variant="h2">Your friends</Typography>
        {renderMyReferrals()}
      </div>
    </Page>
  );
};

export default RewardsPage;

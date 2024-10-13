import AppSection from '@enums/AppSection';
import Typography from '@components/Typography';
import PageBody from '@components/PageBody';
import styles from './leaderboard.module.scss';

export const handle = {
  appSection: AppSection.Leaderboard,
};

const Leaderboard = () => {
  return (
    <PageBody>
      <Typography className={styles.comingSoon} alignment="center" variant="h1" color="secondary">
        Leaderboard is coming soon!
      </Typography>
    </PageBody>
  );
};

export default Leaderboard;

import { PageLayout } from '@components/Layouts';
import Typography from '@components/Typography';
import Loader from '@components/Loader';
import styles from './LoadingScreen.module.scss';

const LoadingScreen = () => {
  return (
    <PageLayout>
      <img className={styles.logo} alt="logo" src="/images/logo.svg" />
      <div className={styles.loadingContainer}>
        <Loader size="large" centered />
        <Typography centered variant="h1" className={styles.loadingText}>
          Loading...
        </Typography>
      </div>
    </PageLayout>
  );
};

export default LoadingScreen;

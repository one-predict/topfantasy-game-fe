import { PageLayout } from '@components/Layouts';
import Typography from '@components/Typography';
import styles from './LoadingScreen.module.scss';

const LoadingScreen = () => {
  return (
    <PageLayout>
      <figure className={styles.loader}>
        <div className={styles.loaderElement} />
        <div className={styles.loaderElement} />
        <div className={styles.loaderElement} />
      </figure>
      <Typography variant="h1" className={styles.loadingText}>
        Loading...
      </Typography>
    </PageLayout>
  );
};

export default LoadingScreen;

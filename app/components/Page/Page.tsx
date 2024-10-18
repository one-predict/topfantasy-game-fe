import { ReactNode } from 'react';
import clsx from 'clsx';
import Typography from '@components/Typography';
import styles from './Page.module.scss';

export interface PageProps {
  className?: string;
  title: string;
  children: ReactNode;
}

const Page = ({ className, title, children }: PageProps) => {
  return (
    <div className={clsx(styles.page, className)}>
      <Typography className={styles.pageTitle} variant="h1">
        {title}
      </Typography>
      {children}
    </div>
  );
};

export default Page;

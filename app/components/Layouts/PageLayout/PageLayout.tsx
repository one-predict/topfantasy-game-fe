import { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './PageLayout.module.scss';

interface PageLayoutProps {
  className?: string;
  children?: ReactNode;
}

const PageLayout = ({ children, className }: PageLayoutProps) => {
  return <div className={clsx(styles.pageLayout, className)}>{children}</div>;
};

export default PageLayout;

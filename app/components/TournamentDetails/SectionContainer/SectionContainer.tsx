import { ReactNode } from 'react';
import Typography from "@components/Typography";
import styles from './SectionContainer.module.scss';

export interface SectionContainerProps {
  children: ReactNode;
  title: string;
}

const SectionContainer = ({ children, title }: SectionContainerProps) => {
  return (
    <div className={styles.sectionContainer}>
      <Typography color="primary" variant="h2">
        {title}
      </Typography>
      {children}
    </div>
  );
};

export default SectionContainer;

import { ReactNode } from 'react';
import MenuTabBar from '@components/MenuTabBar';
import { PageLayout, PageLayoutBackground } from '@components/Layouts';
import styles from './PageLayoutWithMenu.module.scss';

interface PageLayoutWithMenuProps {
  children?: ReactNode;
  background?: PageLayoutBackground;
}

const PageLayoutWithMenu = ({ children, background }: PageLayoutWithMenuProps) => {
  return (
    <PageLayout background={background}>
      <div className={styles.innerContainer}>{children}</div>
      <MenuTabBar className={styles.menuTableBar} />
    </PageLayout>
  );
};

export default PageLayoutWithMenu;

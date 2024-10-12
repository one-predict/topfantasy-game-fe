import { ReactNode } from 'react';
import { useNavigate, useMatches } from '@remix-run/react';
import clsx from 'clsx';
import AppSection from '@enums/AppSection';
import Typography from '@components/Typography';
import NotificationsIcon from '@assets/icons/notifications.svg?react';
import LeaderBoardIcon from '@assets/icons/leaderboard.svg?react';
import ProfileIcon from '@assets/icons/profle.svg?react';
import DiamondIcon from '@assets/icons/diamong.svg?react';
import CupIcon from '@assets/icons/cup.svg?react';
import styles from './MenuTabBar.module.scss';

interface MenuSection {
  title: string;
  icon: ReactNode;
  link: string;
  section: AppSection;
}

export interface MenuTabProps {
  className?: string;
}

const sections: MenuSection[] = [
  {
    title: 'Tournaments',
    icon: <CupIcon />,
    link: '/tournaments',
    section: AppSection.Tournaments,
  },
  {
    title: 'Leaderboard',
    icon: <LeaderBoardIcon />,
    link: '/',
    section: AppSection.Home,
  },
  {
    title: 'Notifications',
    icon: <NotificationsIcon />,
    link: '/store',
    section: AppSection.Store,
  },
  {
    title: 'Profile',
    icon: <ProfileIcon />,
    link: '/rewards',
    section: AppSection.Rewards,
  },
];

const MenuTabBar = ({ className }: MenuTabProps) => {
  const navigate = useNavigate();

  const matches = useMatches();
  const match = matches[matches.length - 1];

  return (
    <div className={clsx(styles.menuTabBar, className)}>
      {sections.map((item, index) => {
        return (
          <div
            key={item.title}
            className={clsx(styles.menuSection, {
              [styles.selectedMenuSection]: match.handle?.appSection === item.section,
            })}
            onClick={() => navigate(item.link)}
          >
            {item.icon}
            <Typography className={styles.menuSectionTitle} color="gray" variant="body2" key={index}>
              {item.title}
            </Typography>
          </div>
        );
      })}
    </div>
  );
};

export default MenuTabBar;

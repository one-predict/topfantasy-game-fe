import clsx from 'clsx';
import Typography, { TypographyProps } from '@components/Typography';
import FantasyCoinIcon from '@assets/icons/fantasy-coin.svg?react';
import styles from './FantasyPointsDisplay.module.scss';

export interface FantasyPointsDisplayProps extends Omit<TypographyProps, 'children'> {
  containerClassName?: string;
  points: number | undefined;
  dark?: boolean;
}

const FantasyPointsDisplay = ({ containerClassName, points, dark, ...restParams }: FantasyPointsDisplayProps) => {
  const fantasyPointsDisplayComposedClassName = clsx(
    styles.fantasyPointsDisplay,
    {
      [styles.darkFantasyDisplay]: dark,
    },
    containerClassName,
  );

  return (
    <div className={fantasyPointsDisplayComposedClassName}>
      <FantasyCoinIcon className={styles.fantasyCoinIcon} />
      <Typography {...restParams}>{points || <>—</>}</Typography>
    </div>
  );
};

export default FantasyPointsDisplay;

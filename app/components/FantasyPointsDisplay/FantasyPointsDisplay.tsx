import clsx from 'clsx';
import Typography, { TypographyProps } from "@components/Typography";
import FantasyCoinIcon from '@assets/icons/fantasy-coin.svg?react';
import styles from './FantasyPointsDisplay.module.scss';

export interface FantasyPointsDisplayProps extends Omit<TypographyProps, 'children'> {
  containerClassName?: string;
  points: number;
}

const FantasyPointsDisplay = ({ containerClassName, points, ...restParams }: FantasyPointsDisplayProps) => {
  return (
    <div className={clsx(styles.fantasyPointsDisplay, containerClassName)}>
      <FantasyCoinIcon />
      <Typography {...restParams}>{points}</Typography>
    </div>
  );
};

export default FantasyPointsDisplay;

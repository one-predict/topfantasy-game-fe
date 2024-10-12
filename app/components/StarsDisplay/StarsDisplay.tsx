import clsx from 'clsx';
import StarIcon from '@assets/icons/star.svg?react';
import styles from './StarsDisplay.module.scss';

export interface StarsDisplayProps {
  starsCount: number;
  containerClassName?: string;
  starIconClassName?: string;
}

const StarsDisplay = ({ starsCount, starIconClassName, containerClassName }: StarsDisplayProps) => {
  return (
    <div className={clsx(styles.starsContainer, containerClassName)}>
      {new Array(starsCount).fill(null).map((_, index) => (
        <StarIcon key={index} className={starIconClassName} />
      ))}
    </div>
  );
};

export default StarsDisplay;

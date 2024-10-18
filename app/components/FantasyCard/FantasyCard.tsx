import clsx from 'clsx';
import { FantasyTarget } from '@api/FantasyTargetApi';
import Typography from '@components/Typography';
import StarsDisplay from '@components/StarsDisplay';
import CoinsDisplay from '@components/CoinsDisplay';
import styles from './FantasyCard.module.scss';

export interface FantasyCardProps {
  target: FantasyTarget;
  selected?: boolean;
  available?: boolean;
  fantasyPoints?: number;
  onClick?: (target: FantasyTarget) => void;
}

const FantasyCard = ({ target, selected, available, fantasyPoints, onClick }: FantasyCardProps) => {
  const cardComposedClassName = clsx(styles.fantasyCard, {
    [styles.selectedFantasyCard]: !!selected,
    [styles.notAvailableFantasyCard]: !available && !selected,
  });

  const handleCardClick = () => {
    if (available || selected) {
      onClick?.(target);
    }
  };

  return (
    <div onClick={handleCardClick} className={cardComposedClassName}>
      <img className={styles.fantasyCardImage} src={target.imageUrl} alt={target.name} />
      <StarsDisplay
        containerClassName={styles.starsDisplay}
        starIconClassName={styles.starIcon}
        starsCount={target.stars}
      />
      <Typography className={styles.socialName} color={selected ? 'black' : 'primary'} variant="subtitle2">
        {target.socialName}
      </Typography>
      {fantasyPoints !== undefined && <CoinsDisplay humanize variant="h3" coins={fantasyPoints} />}
    </div>
  );
};

export default FantasyCard;

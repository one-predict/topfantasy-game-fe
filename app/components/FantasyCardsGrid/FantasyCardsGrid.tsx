import clsx from 'clsx';
import { FantasyTarget } from '@api/FantasyTargetApi';
import FantasyCard from '@components/FantasyCard';
import styles from './FantasyCardsGrid.module.scss';

export interface FantasyCardsGridProps {
  className?: string;
  fantasyTargets: FantasyTarget[];
  onCardSelect?: (target: FantasyTarget) => void;
  onCardDeselect?: (target: FantasyTarget) => void;
  isCardSelected?: (target: FantasyTarget) => boolean;
  isCardUnavailable?: (target: FantasyTarget) => boolean;
  targetsFantasyPoints?: Record<string, number>;
}

const FantasyCardsGrid = ({
  className,
  fantasyTargets,
  onCardDeselect,
  onCardSelect,
  isCardSelected,
  isCardUnavailable,
  targetsFantasyPoints,
}: FantasyCardsGridProps) => {
  return (
    <div className={clsx(styles.fantasyCardsGrid, className)}>
      {fantasyTargets.map((target) => {
        const selected = !!isCardSelected?.(target);

        return (
          <FantasyCard
            key={target.id}
            target={target}
            onClick={selected ? onCardDeselect : onCardSelect}
            selected={selected}
            available={!isCardUnavailable?.(target)}
            fantasyPoints={targetsFantasyPoints?.[target.id]}
          />
        );
      })}
    </div>
  );
};

export default FantasyCardsGrid;

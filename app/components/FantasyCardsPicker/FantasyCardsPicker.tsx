import { ReactNode, useCallback, useMemo } from 'react';
import { FantasyTarget } from '@api/FantasyTargetApi';
import useKeyBy from '@hooks/useKeyBy';
import useSumBy from '@hooks/useSumBy';
import FantasyCardsGrid from '@components/FantasyCardsGrid';
import Typography from '@components/Typography';
import Button from '@components/Button';
import styles from './FantasyCardsPicker.module.scss';

export interface FantasyCardsPickerProps {
  maxSelectedCards: number;
  maxStars: number;
  availableFantasyTargets: FantasyTarget[];
  selectedFantasyTargetIds: string[];
  onCardSelect?: (target: FantasyTarget) => void;
  onCardDeselect?: (target: FantasyTarget) => void;
  onConfirmClick?: () => void;
  isLoading?: boolean;
  wrapConfirmButton?: (button: ReactNode) => ReactNode;
}

const FantasyCardsPicker = ({
  maxStars,
  maxSelectedCards,
  availableFantasyTargets,
  selectedFantasyTargetIds,
  onCardSelect,
  onCardDeselect,
  onConfirmClick,
  isLoading,
  wrapConfirmButton = (button) => button,
}: FantasyCardsPickerProps) => {
  const availableFantasyTargetsPool = useKeyBy(availableFantasyTargets, 'id');

  const selectedFantasyTargets = useMemo(() => {
    return selectedFantasyTargetIds.map((id) => availableFantasyTargetsPool[id]);
  }, [selectedFantasyTargetIds, availableFantasyTargetsPool]);

  const selectedFantasyTargetsPool = useKeyBy(selectedFantasyTargets, 'id');
  const selectedFantasyTargetsStars = useSumBy(selectedFantasyTargets, 'stars');
  const selectedFantasyTargetsCount = selectedFantasyTargets.length;
  const availableStars = Math.max(0, maxStars - selectedFantasyTargetsStars);

  const checkCardSelected = useCallback(
    (target: FantasyTarget) => {
      return !!selectedFantasyTargetsPool[target.id];
    },
    [selectedFantasyTargetsPool],
  );

  const checkCardUnavailable = useCallback(
    (target: FantasyTarget) => {
      return selectedFantasyTargetsCount >= maxSelectedCards || availableStars < target.stars;
    },
    [availableStars, maxSelectedCards, selectedFantasyTargetsCount],
  );

  const cardsLeftToSelect = maxSelectedCards - selectedFantasyTargetsCount;

  const renderConfirmButton = () => (
    <Button loading={isLoading} onClick={onConfirmClick}>
      Confirm
    </Button>
  );

  return (
    <div className={styles.fantasyCardsPickerContainer}>
      <Typography variant="subtitle2">Select max {maxSelectedCards} cards you want to add to your portfolio</Typography>
      <FantasyCardsGrid
        fantasyTargets={availableFantasyTargets}
        onCardSelect={onCardSelect}
        onCardDeselect={onCardDeselect}
        isCardSelected={checkCardSelected}
        isCardUnavailable={checkCardUnavailable}
      />
      <div className={styles.fixedContainer}>
        {maxSelectedCards === selectedFantasyTargetIds.length ? (
          wrapConfirmButton!(renderConfirmButton())
        ) : (
          <div className={styles.moreCardsInfo}>
            <Typography alignment="center" variant="h5" color="black">
              You need to select {cardsLeftToSelect} more {cardsLeftToSelect > 1 ? 'cards' : 'card'}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default FantasyCardsPicker;

import { useMemo } from 'react';
import clsx from 'clsx';
import { FantasyTarget } from '@api/FantasyTargetApi';
import Typography from '@components/Typography';
import styles from './FantasyCardsPreview.module.scss';

export interface FantasyCardsPreviewProps {
  className?: string;
  fantasyTargets: FantasyTarget[];
  maxTargetsToDisplay?: number;
}

const DEFAULT_MAX_TARGETS_TO_DISPLAY = 3;

const FantasyCardsPreview = ({
  className,
  fantasyTargets,
  maxTargetsToDisplay = DEFAULT_MAX_TARGETS_TO_DISPLAY,
}: FantasyCardsPreviewProps) => {
  const limitedFantasyTargets = useMemo(() => {
    return fantasyTargets.slice(0, maxTargetsToDisplay!);
  }, [fantasyTargets, maxTargetsToDisplay]);

  return (
    <div className={clsx(styles.cardsPreviewContainer, className)}>
      {limitedFantasyTargets.map((target) => {
        return (
          <img key={target.id} className={styles.cardPreviewImage} src={target.imageUrl} alt={target.socialName} />
        );
      })}
      {limitedFantasyTargets.length !== fantasyTargets.length && (
        <div className={styles.moreInfo}>
          <Typography variant="h3" color="black">
            +{fantasyTargets.length - limitedFantasyTargets.length}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default FantasyCardsPreview;

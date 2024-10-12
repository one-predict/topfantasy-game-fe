import { useMemo } from 'react';
import styles from './CardsShortPreview.module.scss';
import { cardsTournamentPoolPreview } from '@app/data/cards-pool-preview';

export interface CardsShortPreviewProps {
  pool: Array<string>;
}

const CardsShortPreview = ({ pool }: CardsShortPreviewProps) => {
  return (
    <div className={styles.cardsPreviewContainer}>
      {pool.map((card) => {
        return <img className={styles.cardPreviewImage} src={cardsTournamentPoolPreview[card]?.image} />;
      })}
    </div>
  );
};

export default CardsShortPreview;

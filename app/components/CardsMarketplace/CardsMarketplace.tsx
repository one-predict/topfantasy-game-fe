import { GameCard } from '@api/GameCardApi';
import Typography from '@components/Typography';
import GameCardsGrid from '@components/GameCardsGrid';
import Loader from '@components/Loader';
import CoinsDisplay from '@components/CoinsDisplay';
import styles from './CardsMarketplace.module.scss';

export interface CardsMarketplaceProps {
  className?: string;
  gameCards: GameCard[] | undefined;
  purchasedCardsPool: Record<string, string> | undefined;
  onCardClick: (card: GameCard) => void;
}

const CardsMarketplace = ({ gameCards, purchasedCardsPool, onCardClick, className }: CardsMarketplaceProps) => {
  if (!gameCards || !purchasedCardsPool) {
    return <Loader centered />;
  }

  return (
    <GameCardsGrid
      className={className}
      gameCards={gameCards}
      onCardClick={onCardClick}
      renderPreviewCardFooter={(card) => (
        <div className={styles.gameCardPreviewFooterContent}>
          {purchasedCardsPool?.[card.id] ? (
            <Typography variant="h5" color="primary">
              Purchased
            </Typography>
          ) : (
            <CoinsDisplay coins={card.price} />
          )}
        </div>
      )}
    />
  );
};

export default CardsMarketplace;

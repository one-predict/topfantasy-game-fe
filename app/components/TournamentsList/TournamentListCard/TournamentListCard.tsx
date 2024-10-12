import { Tournament } from '@api/TournamentApi';
import Button from '@components/Button';
import Typography from '@components/Typography';
import TournamentAvailabilityInfo from '@components/TournamentAvailabilityInfo';
import LabeledContent from '@components/LabeledContent';
import CardBackground from '@assets/icons/tournament-card-background.svg?react';
import CoinsDisplay from '@components/CoinsDisplay';
import TournamentFragmentIcon from '@assets/icons/tournament-ticket-fragment.svg?react';
import styles from './TournamentListCard.module.scss';
import CardsShortPreview from '@app/components/CardsShortPreview/CardsShortPreview';

export interface TournamentListCardProps {
  tournament: Tournament;
  onViewDetailsClick: (tournament: Tournament) => void;
}

const TournamentListCard = ({ tournament, onViewDetailsClick }: TournamentListCardProps) => {
  const prizePool = tournament.entryPrice * tournament.participantsCount + tournament.staticPrizePool;

  return (
    <div className={styles.tournamentListCardContainer}>
      <div className={styles.tournamentListCard}>
        <TournamentAvailabilityInfo className={styles.tournamentAvailabilityInfo} tournament={tournament} />

        <div className={styles.titleWithParticipantsContainer}>
          <Typography variant="h2" color="black">
            {tournament.title}
          </Typography>
          <CardsShortPreview pool={tournament.cardsPool} />
          <LabeledContent row title="Participants:" color="black">
            <Typography variant="body2" color="black">
              {tournament.participantsCount}
            </Typography>
          </LabeledContent>
        </div>
        <img src={tournament.imageUrl} className={styles.tournamentImage} alt={`${tournament.id}-image`} />
        <div className={styles.tournamentImageShadow} />
        <div className={styles.tournamentPrizeInfo}>
          <LabeledContent title="Prize Pool">
            <CoinsDisplay
              variant="body2"
              color='black'
              coins={prizePool}
              tokenImageSrc={tournament.isTonConnected ? '/images/ton-token.png' : '/images/token.png'}
            />
          </LabeledContent>
          <LabeledContent title="Entry Fee">
            <CoinsDisplay
              variant="body2"
              color='black'
              coins={tournament.entryPrice}
              tokenImageSrc={tournament.isTonConnected ? '/images/ton-token.png' : '/images/token.png'}
            />
          </LabeledContent>
        </div>
        <div className={styles.playButtonContainer}>
          <Button onClick={() => onViewDetailsClick(tournament)}>Play</Button>
        </div>

        <div className={styles.tournamentCardBackground} />
      </div>
      <TournamentFragmentIcon className={styles.tournamentTicketFragment} />
    </div>
  );
};

export default TournamentListCard;

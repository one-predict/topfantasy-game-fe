import { Tournament } from '@api/TournamentApi';
import TournamentPaymentCurrency from '@enums/TournamentPaymentCurrency';
import useFantasyTargetsByIdsQuery from '@hooks/queries/useFantasyTargetsByIdsQuery';
import Button from '@components/Button';
import Typography from '@components/Typography';
import TournamentAvailabilityInfo from '@components/TournamentAvailabilityInfo';
import LabeledContent from '@components/LabeledContent';
import CoinsDisplay from '@components/CoinsDisplay';
import CryptoCoinsDisplay from '@components/CryptoCoinsDisplay';
import FantasyCardsPreview from '@components/FantasyCardsPreview';
import Ticket from '@assets/icons/ticket.svg?react';
import styles from './TournamentListCard.module.scss';

export interface TournamentListCardProps {
  tournament: Tournament;
  onPlayTournamentClick: (tournament: Tournament) => void;
}

const TournamentListCard = ({ tournament, onPlayTournamentClick }: TournamentListCardProps) => {
  const prizePool = tournament.entryPrice * tournament.participantsCount + tournament.staticPrizePool;

  const { data: availableFantasyTargets } = useFantasyTargetsByIdsQuery(tournament.availableFantasyTargetIds);

  const renderTournamentPaymentCoin = (amount: number) => {
    if (tournament.paymentCurrency === TournamentPaymentCurrency.Coins) {
      return <CoinsDisplay dark coins={amount} variant="body2" />;
    }

    return <CryptoCoinsDisplay dark variant="body2" currency="ton" coins={amount} />;
  };

  return (
    <div className={styles.tournamentListCard}>
      <Ticket className={styles.ticket} />
      <div className={styles.tournamentListCardContent}>
        <TournamentAvailabilityInfo className={styles.tournamentAvailabilityInfo} tournament={tournament} />
        <div className={styles.titleWithParticipantsContainer}>
          <Typography variant="h2" color="black">
            {tournament.title}
          </Typography>
          {availableFantasyTargets && (
            <FantasyCardsPreview className={styles.fantasyCardsPreview} fantasyTargets={availableFantasyTargets} />
          )}
          <LabeledContent row title="Participants:" color="black">
            <Typography variant="body2" color="black">
              {tournament.participantsCount}
            </Typography>
          </LabeledContent>
        </div>
        <img src={tournament.imageUrl} className={styles.tournamentImage} alt={`${tournament.id}-image`} />
        <div className={styles.tournamentPrizeInfo}>
          <LabeledContent p title="Prize Pool:" row>
            {renderTournamentPaymentCoin(prizePool)}
          </LabeledContent>
          <LabeledContent title="Entry Fee:" row>
            {renderTournamentPaymentCoin(tournament.entryPrice)}
          </LabeledContent>
        </div>
        <div className={styles.playButtonContainer}>
          <Button className={styles.playButton} onClick={() => onPlayTournamentClick(tournament)}>
            Play
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TournamentListCard;

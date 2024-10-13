import { Tournament } from '@api/TournamentApi';
import TournamentPaymentCurrency from '@enums/TournamentPaymentCurrency';
import useFantasyProjectsByIdsQuery from '@hooks/queries/useFantasyProjectsByIdsQuery';
import Button from '@components/Button';
import Typography from '@components/Typography';
import TournamentAvailabilityInfo from '@components/TournamentAvailabilityInfo';
import LabeledContent from '@components/LabeledContent';
import CoinsDisplay from '@components/CoinsDisplay';
import FantasyPointsDisplay from '@components/FantasyPointsDisplay';
import TournamentFragmentIcon from '@assets/icons/tournament-ticket-fragment.svg?react';
import CardsShortPreview from '@app/components/CardsShortPreview/CardsShortPreview';
import styles from './TournamentListCard.module.scss';

export interface TournamentListCardProps {
  tournament: Tournament;
  onPlayTournamentClick: (tournament: Tournament) => void;
}

const TournamentListCard = ({ tournament, onPlayTournamentClick }: TournamentListCardProps) => {
  const prizePool = tournament.entryPrice * tournament.participantsCount + tournament.staticPrizePool;

  const { data: availableProjects } = useFantasyProjectsByIdsQuery(tournament.availableProjectIds);

  const renderCurrency = (amount: number) => {
    if (tournament.paymentCurrency === TournamentPaymentCurrency.Points) {
      return <FantasyPointsDisplay color="black" dark points={amount} />;
    }

    return <CoinsDisplay variant="body2" color="black" coins={amount} tokenImageSrc="/images/ton-token.png" />;
  };

  return (
    <div className={styles.tournamentListCardContainer}>
      <div className={styles.tournamentListCard}>
        <TournamentAvailabilityInfo className={styles.tournamentAvailabilityInfo} tournament={tournament} />
        <div className={styles.titleWithParticipantsContainer}>
          <Typography variant="h2" color="black">
            {tournament.title}
          </Typography>
          {availableProjects && <CardsShortPreview projects={availableProjects} />}
          <LabeledContent row title="Participants:" color="black">
            <Typography variant="body2" color="black">
              {tournament.participantsCount}
            </Typography>
          </LabeledContent>
        </div>
        <img src={tournament.imageUrl} className={styles.tournamentImage} alt={`${tournament.id}-image`} />
        <div className={styles.tournamentPrizeInfo}>
          <LabeledContent title="Prize Pool">{renderCurrency(prizePool)}</LabeledContent>
          <LabeledContent title="Entry Fee">{renderCurrency(tournament.entryPrice)}</LabeledContent>
        </div>
        <div className={styles.playButtonContainer}>
          <Button className={styles.playButton} onClick={() => onPlayTournamentClick(tournament)}>
            Play
          </Button>
        </div>
        <div className={styles.tournamentCardBackground} />
      </div>
      <TournamentFragmentIcon className={styles.tournamentTicketFragment} />
    </div>
  );
};

export default TournamentListCard;

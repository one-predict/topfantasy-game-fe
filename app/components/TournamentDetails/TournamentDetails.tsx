import { Tournament, TournamentLeaderboard, TournamentParticipation } from '@api/TournamentApi';
import useTournamentStatus from '@hooks/useTournamentStatus';
import { TonConnectButton, useTonWallet, useTonConnectUI } from '@tonconnect/ui-react';
import Typography from '@components/Typography';
import Button from '@components/Button';
import TournamentLeaderboardComponent from '@components/TournamentLeaderboard';
import Loader from '@components/Loader';
import LabeledContent from '@components/LabeledContent';
import TournamentAvailabilityInfo from '@components/TournamentAvailabilityInfo';
import CoinsDisplay from '@components/CoinsDisplay';
import styles from './TournamentDetails.module.scss';
import { prepareSendTransaction } from '@app/utils/ton-transactions';

const VITE_TON_TOURNAMENT_ADDRESS = import.meta.env.VITE_TON_TOURNAMENT_ADDRESS;

export interface TournamentDetailsProps {
  tournament: Tournament;
  tournamentParticipation: TournamentParticipation | null;
  tournamentLeaderboard: TournamentLeaderboard | undefined;
  canJoinTournament?: boolean;
  isTournamentJoiningInProgress?: boolean;
  onConfigureDeckButtonClick: () => void;
  onPortfoliosButtonClick: () => void;
  onJoinTournamentButtonClick: (walletAddress?: string) => void;
}

const TournamentDetails = ({
  tournament,
  tournamentLeaderboard,
  tournamentParticipation,
  canJoinTournament,
  isTournamentJoiningInProgress,
  onJoinTournamentButtonClick,
}: TournamentDetailsProps) => {
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();
  const tournamentTicker = tournament.isTonConnected ? 'AIP' : 'TON';

  const tournamentStatus = useTournamentStatus(tournament);

  const renderLeaderboardSection = () => {
    if (tournamentStatus === 'upcoming') {
      return null;
    }

    return tournamentLeaderboard ? (
      <TournamentLeaderboardComponent rankedParticipants={tournamentLeaderboard.rankedParticipants} />
    ) : (
      <Loader className={styles.sectionLoader} centered />
    );
  };

  const handleJoinButtonClick = async () => {
    if (tournament.isTonConnected) {
      const result = await tonConnectUI.sendTransaction(
        prepareSendTransaction(VITE_TON_TOURNAMENT_ADDRESS, tournament.entryPrice),
      );

      if (result?.boc) {
        onJoinTournamentButtonClick(wallet?.account.address);
      }

      return;
    }

    onJoinTournamentButtonClick('');
  };

  const renderJoinButton = () => {
    if (tournament.isTonConnected && !wallet?.account.address) {
      return <TonConnectButton className={styles.viewDetailsButton} />;
    }

    return (
      <Button
        className={styles.joinTournamentButton}
        disabled={!canJoinTournament}
        onClick={handleJoinButtonClick}
        loading={isTournamentJoiningInProgress}
      >
        Join for {tournament.entryPrice} {tournamentTicker}
      </Button>
    );
  };

  return (
    <div className={styles.tournamentDetails}>
      <TournamentAvailabilityInfo className={styles.tournamentAvailabilityInfo} tournament={tournament} />
      <img className={styles.tournamentImage} src={tournament.imageUrl} alt={tournament.title} />
      <div className={styles.tournamentTitleWithDescription}>
        <Typography variant="h1" color="gradient1">
          {tournament.title}
        </Typography>
        <Typography variant="body2">{tournament.description}</Typography>
      </div>
      {!tournamentParticipation && (
        <div className={styles.participationInfo}>
          <Typography color="gray" variant="subtitle2">
            Your not a participant of tournament:
          </Typography>
          {renderJoinButton()}
        </div>
      )}
      <div className={styles.tournamentPrizeInfo}>
        <LabeledContent title="Prize Pool">
          <CoinsDisplay
            coins={tournament.participantsCount * tournament.entryPrice + tournament.staticPrizePool}
            tokenImageSrc={tournament.isTonConnected ? '/images/ton-token.png' : '/images/token.png'}
          ></CoinsDisplay>
        </LabeledContent>
        <LabeledContent title="Participants">
          <Typography alignment="right" variant="body2">
            {tournament.participantsCount}
          </Typography>
        </LabeledContent>
      </div>
      <div className={styles.detailsSections}>{renderLeaderboardSection()}</div>
    </div>
  );
};

export default TournamentDetails;

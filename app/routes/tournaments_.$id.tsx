import { useCallback, useState } from 'react';
import { useNavigate, useParams } from '@remix-run/react';
import { GameCard } from '@api/GameCardApi';
import AppSection from '@enums/AppSection';
import useTournamentByIdQuery from '@hooks/queries/useTournamentByIdQuery';
import useTournamentParticipationRankQuery from '@hooks/queries/useTournamentParticipationRankQuery';
import useTournamentParticipationQuery from '@hooks/queries/useTournamentParticipationQuery';
import useTournamentLeaderboardQuery from '@hooks/queries/useTournamentLeaderboardQuery';
import useTournamentStatus from '@hooks/useTournamentStatus';
import useSession from '@hooks/useSession';
import useBackButton from '@hooks/useBackButton';
import useJoinTournamentMutation from '@hooks/mutations/useJoinTournamentMutation';
import PageBody from '@components/PageBody';
import Typography from '@components/Typography';
import Loader from '@components/Loader';
import ColoredPoints from '@components/ColoredPoints';
import LabeledContent from '@components/LabeledContent';
import TournamentDetails from '@components/TournamentDetails';
import GameCardDetailsPopup from '@components/GameCardDetailsPopup';
import styles from './tournament.module.scss';

export const handle = {
  background: {
    image: '/images/tournament-page-background.png',
    position: 'center',
    overlay: true,
  },
  appSection: AppSection.Tournaments,
};

const TournamentPage = () => {
  const navigate = useNavigate();

  const { id: tournamentId } = useParams<{ id: string }>();

  const [showDeckConfiguration, setShowDeckConfiguration] = useState(false);
  const [showPortfolios, setShowPortfolios] = useState(false);
  const [cardToObserve, setCardToObserve] = useState<GameCard | null>(null);

  const currentUser = useSession();

  const { data: tournament } = useTournamentByIdQuery(tournamentId || '');
  const { data: tournamentParticipation } = useTournamentParticipationQuery(tournament?.id || '');
  const { data: tournamentParticipationRank } = useTournamentParticipationRankQuery(tournament?.id || '');
  const { data: tournamentLeaderboard } = useTournamentLeaderboardQuery(tournament?.id || '');

  const tournamentStatus = useTournamentStatus(tournament ?? null);

  const { mutateAsync: joinTournament, status: joinTournamentMutationStatus } = useJoinTournamentMutation();

  const canJoinTournament =
    tournament?.isTonConnected ||
    (tournamentStatus === 'upcoming' && !!currentUser && currentUser.coinsBalance > tournament?.entryPrice);

  useBackButton(
    true,
    () => {
      if (showDeckConfiguration) {
        setShowDeckConfiguration(false);
        setCardToObserve(null);

        return;
      }

      if (showPortfolios) {
        setShowPortfolios(false);

        return;
      }

      navigate('/tournaments');
    },
    [showDeckConfiguration, showPortfolios],
  );

  const handleJoinTournamentButtonClick = useCallback(
    async (walletAddress?: string) => {
      if (!tournament) {
        return;
      }

      await joinTournament({ tournamentId: tournament.id, walletAddress: walletAddress || '' });
    },
    [joinTournament, tournament],
  );

  const handleConfigureDeckButtonClick = useCallback(() => {
    setShowDeckConfiguration(true);
  }, [setShowDeckConfiguration]);

  const handlePortfoliosButtonClick = useCallback(() => {
    setShowPortfolios(true);
  }, [setShowPortfolios]);

  const renderParticipationContent = () => {
    if (!tournament || tournamentParticipation === undefined || tournamentParticipationRank === undefined) {
      return null;
    }

    if (tournamentParticipation === null) {
      return <Typography>—</Typography>;
    }

    return (
      <>
        <Typography variant="h1">{tournamentParticipationRank}</Typography>
        <ColoredPoints points={tournamentParticipation.points} />
      </>
    );
  };

  return (
    <PageBody>
      <div className={styles.tournamentParticipationInfoContainer}>
        <LabeledContent title="Rank">{renderParticipationContent()}</LabeledContent>
      </div>
      {tournament && tournamentParticipation !== undefined ? (
        <TournamentDetails
          tournament={tournament}
          tournamentLeaderboard={tournamentLeaderboard}
          tournamentParticipation={tournamentParticipation}
          joinTournamentMutationStatus={joinTournamentMutationStatus}
          currentUser={currentUser}
          canJoinTournament={canJoinTournament}
          isTournamentJoiningInProgress={joinTournamentMutationStatus === 'pending'}
          onJoinTournamentButtonClick={handleJoinTournamentButtonClick}
          onConfigureDeckButtonClick={handleConfigureDeckButtonClick}
          onPortfoliosButtonClick={handlePortfoliosButtonClick}
        />
      ) : (
        <Loader centered />
      )}
      <GameCardDetailsPopup card={cardToObserve} onClose={() => setCardToObserve(null)} />
    </PageBody>
  );
};

export default TournamentPage;

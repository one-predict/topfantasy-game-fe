import { useCallback } from 'react';
import { useNavigate, useParams } from '@remix-run/react';
import AppSection from '@enums/AppSection';
import useTournamentByIdQuery from '@hooks/queries/useTournamentByIdQuery';
import useTournamentParticipationRankQuery from '@hooks/queries/useTournamentParticipationRankQuery';
import useTournamentParticipationQuery from '@hooks/queries/useTournamentParticipationQuery';
import useTournamentStatus from '@hooks/useTournamentStatus';
import useSession from '@hooks/useSession';
import useJoinTournamentMutation from '@hooks/mutations/useJoinTournamentMutation';
import useTournamentLeaderboardQuery from "@hooks/queries/useTournamentLeaderboardQuery";
import PageBody from '@components/PageBody';
import Typography from '@components/Typography';
import TournamentFantasyCardsPicker from "@components/TournamentFantasyCardsPicker";
import TournamentDetails from '@components/TournamentDetails';
import Loader from "@components/Loader";

export const handle = {
  appSection: AppSection.Tournaments,
};

const TournamentPage = () => {
  const navigate = useNavigate();

  const { id: tournamentId } = useParams<{ id: string }>();

  const currentUser = useSession();

  const { data: tournament } = useTournamentByIdQuery(tournamentId || '');
  const { data: tournamentParticipation } = useTournamentParticipationQuery(tournament?.id || '');
  const { data: tournamentParticipationRank } = useTournamentParticipationRankQuery(tournament?.id || '');
  const { data: tournamentLeaderboard } = useTournamentLeaderboardQuery(tournament?.id || '');

  const tournamentStatus = useTournamentStatus(tournament ?? null);

  const { mutateAsync: joinTournament, isPending: isJoinTournamentInProgress } = useJoinTournamentMutation();

  const canJoinTournament =
    tournament?.isTonConnected ||
    (tournamentStatus === 'upcoming' && !!currentUser && currentUser.coinsBalance > tournament?.entryPrice);

  const handleConfirmFantasyProjects = useCallback(
    async (selectedProjectIds: string[]) => {
      if (!tournament) {
        return;
      }

      await joinTournament({ tournamentId: tournament.id, selectedProjectIds });
    },
    [joinTournament, tournament],
  );

  const renderPageBodyContent = () => {
    if (!tournament || tournamentParticipation === undefined || !currentUser) {
      return (
        <Loader />
      );
    }

    if (tournamentParticipation === null) {
      return (
        <TournamentFantasyCardsPicker
          tournament={tournament}
          onConfirmProjects={handleConfirmFantasyProjects}
          isConfirmInProgress={isJoinTournamentInProgress}
        />
      );
    }

    return (
      <TournamentDetails
        tournament={tournament}
        participationUser={currentUser}
        tournamentParticipationRank={tournamentParticipationRank}
        tournamentParticipation={tournamentParticipation}
        tournamentLeaderboard={tournamentLeaderboard}
      />
    );
  };

  return (
    <PageBody>
      <Typography variant="h2">
        {tournament?.title}
      </Typography>
      {renderPageBodyContent()}
    </PageBody>
  );
};

export default TournamentPage;

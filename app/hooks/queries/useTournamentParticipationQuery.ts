import { skipToken, useQuery } from '@tanstack/react-query';
import { useTournamentApi } from '@providers/ApiProvider';

const useTournamentParticipationQuery = (tournamentId: string) => {
  const tournamentApi = useTournamentApi();

  return useQuery({
    queryKey: ['tournament-participations', { tournamentId }],
    queryFn: tournamentId
      ? async () => {
          return tournamentApi.getTournamentParticipation(tournamentId);
        }
      : skipToken,
  });
};

export default useTournamentParticipationQuery;

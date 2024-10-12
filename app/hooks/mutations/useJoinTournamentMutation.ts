import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { DefaultError, useMutation, useQueryClient } from '@tanstack/react-query';
import { JoinTournamentParams } from "@api/TournamentApi";
import { useTournamentApi } from '@providers/ApiProvider';

const useJoinTournamentMutation = () => {
  const tournamentApi = useTournamentApi();

  const queryClient = useQueryClient();

  const handleMutationSuccess = useCallback(
    async (_result: void, params: JoinTournamentParams) => {
      await Promise.all([
        await queryClient.invalidateQueries({
          queryKey: ['tournament-participations', { tournamentId: params.tournamentId }],
        }),
        await queryClient.invalidateQueries({
          queryKey: ['tournament-participation-ranks', { tournamentId: params.tournamentId }],
        }),
        await queryClient.invalidateQueries({
          queryKey: ['tournament-leaderboards', { tournamentId: params.tournamentId }],
        }),
        await queryClient.invalidateQueries({ queryKey: ['tournaments', { tournamentId: params.tournamentId }] }),
        await queryClient.invalidateQueries({ queryKey: ['current-user'] }),
      ]);

      toast.success(`You have successfully joined the tournament!`);
    },
    [queryClient],
  );

  return useMutation<void, DefaultError, JoinTournamentParams>({
    mutationFn: (params) => tournamentApi.joinTournament(params),
    onSuccess: handleMutationSuccess,
  });
};

export default useJoinTournamentMutation;

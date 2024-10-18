import { useCallback } from 'react';
import { useNavigate, useParams } from '@remix-run/react';
import AppSection from '@enums/AppSection';
import TournamentPaymentCurrency from '@enums/TournamentPaymentCurrency';
import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import useTournamentByIdQuery from '@hooks/queries/useTournamentByIdQuery';
import useTournamentParticipationRankQuery from '@hooks/queries/useTournamentParticipationRankQuery';
import useTournamentParticipationQuery from '@hooks/queries/useTournamentParticipationQuery';
import useTournamentStatus from '@hooks/useTournamentStatus';
import useSession from '@hooks/useSession';
import useJoinTournamentMutation from '@hooks/mutations/useJoinTournamentMutation';
import useTournamentLeaderboardQuery from '@hooks/queries/useTournamentLeaderboardQuery';
import useBackButton from '@hooks/useBackButton';
import Page from '@components/Page';
import Typography from '@components/Typography';
import TournamentFantasyCardsPicker from '@components/TournamentFantasyCardsPicker';
import TournamentDetails from '@components/TournamentDetails';
import Loader from '@components/Loader';
import { prepareSendTransaction } from '@utils/ton-transactions';
import styles from './tournament.module.scss';

export const handle = {
  appSection: AppSection.Tournaments,
};

const VITE_TON_TOURNAMENT_ADDRESS = import.meta.env.VITE_TON_TOURNAMENT_ADDRESS;

const TournamentPage = () => {
  const { id: tournamentId } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();

  const currentUser = useSession();

  useBackButton(
    true,
    () => {
      navigate('/tournaments');
    },
    [],
  );

  const { data: tournament } = useTournamentByIdQuery(tournamentId || '');
  const { data: tournamentParticipation } = useTournamentParticipationQuery(tournament?.id || '');
  const { data: tournamentParticipationRank } = useTournamentParticipationRankQuery(tournament?.id || '');
  const { data: tournamentLeaderboard } = useTournamentLeaderboardQuery(tournament?.id || '');

  const tournamentStatus = useTournamentStatus(tournament ?? null);

  const { mutateAsync: joinTournament, isPending: isJoinTournamentInProgress } = useJoinTournamentMutation();

  const handleConfirmFantasyTargets = useCallback(
    async (selectedFantasyTargetIds: string[]) => {
      if (!tournament) {
        return;
      }

      if (tournament.paymentCurrency === TournamentPaymentCurrency.Ton && !wallet?.account.address) {
        return;
      }

      if (tournament.paymentCurrency === TournamentPaymentCurrency.Ton) {
        const response = await tonConnectUI.sendTransaction(
          prepareSendTransaction(VITE_TON_TOURNAMENT_ADDRESS, tournament.entryPrice),
        );

        if (!response?.boc) {
          return;
        }
      }

      await joinTournament({
        tournamentId: tournament.id,
        selectedFantasyTargetIds,
        walletAddress: wallet?.account.address,
      });
    },
    [joinTournament, tournament, wallet, tonConnectUI],
  );

  const renderPageContent = () => {
    if (!tournament || tournamentParticipation === undefined || !currentUser) {
      return <Loader size="large" centered />;
    }

    if (tournamentStatus === 'upcoming') {
      return (
        <Typography className={styles.upcomingTournamentText} color="secondary" variant="h3">
          This tournament is upcoming!
        </Typography>
      );
    }

    if (tournamentParticipation === null && tournamentStatus === 'registration') {
      return (
        <TournamentFantasyCardsPicker
          tournament={tournament}
          onConfirmFantasyTargets={handleConfirmFantasyTargets}
          isConfirmInProgress={isJoinTournamentInProgress}
        />
      );
    }

    return (
      <TournamentDetails
        tournament={tournament}
        participationUser={currentUser}
        tournamentParticipationRank={tournamentParticipationRank ?? null}
        tournamentParticipation={tournamentParticipation}
        tournamentLeaderboard={tournamentLeaderboard}
      />
    );
  };

  return <Page title={tournament?.title || ''}>{renderPageContent()}</Page>;
};

export default TournamentPage;

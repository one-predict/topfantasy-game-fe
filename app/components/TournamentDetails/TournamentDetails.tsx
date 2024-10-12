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
import UserAvatar from "@components/UserAvatar";
import {User} from "@api/UserApi";
import FantasyPointsDisplay from "@components/FantasyPointsDisplay";
import FantasyCardsGrid from "@components/FantasyCardsGrid";
import useFantasyProjectsByIdsQuery from "@hooks/queries/useFantasyProjectsByIdsQuery";
import TournamentParticipationInfo from "@components/TournamentParticipationInfo";

const VITE_TON_TOURNAMENT_ADDRESS = import.meta.env.VITE_TON_TOURNAMENT_ADDRESS;

export interface TournamentDetailsProps {
  tournament: Tournament;
  participationUser: User;
  tournamentParticipationRank: number | null;
  tournamentParticipation: TournamentParticipation;
  tournamentLeaderboard: TournamentLeaderboard | undefined;
}

const TournamentDetails = ({
  participationUser,
  tournament,
  tournamentParticipationRank,
  tournamentLeaderboard,
  tournamentParticipation,
}: TournamentDetailsProps) => {
  const participationSelectedProjectIds = tournamentParticipation?.selectedProjectIds ?? [];

  const tournamentStatus = useTournamentStatus(tournament);

  const { data: participationSelectedProjects } = useFantasyProjectsByIdsQuery(participationSelectedProjectIds);

  const renderLeaderboardSection = () => {
    if (tournamentStatus === 'upcoming') {
      return null;
    }

    return tournamentLeaderboard ? (
      <TournamentLeaderboardComponent
        rankedParticipants={tournamentLeaderboard.rankedParticipants}
      />
    ) : (
      <Loader className={styles.sectionLoader} centered />
    );
  };

  return (
    <div className={styles.tournamentDetails}>
      <TournamentParticipationInfo
        participationUser={participationUser}
        tournamentParticipationRank={tournamentParticipationRank}
        tournamentParticipation={tournamentParticipation}
      />
      <div className={styles.tournamentDetailsSections}>
        {participationSelectedProjects ? (
          <FantasyCardsGrid
            projects={participationSelectedProjects || []}
          />
        ) : (
          <Loader className={styles.sectionLoader} centered />
        )}
        {renderLeaderboardSection()}
      </div>
    </div>
  );
};

export default TournamentDetails;

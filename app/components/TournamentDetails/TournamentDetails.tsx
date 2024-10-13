import { TournamentLeaderboard, TournamentParticipation } from '@api/TournamentApi';
import { User } from '@api/UserApi';
import useFantasyProjectsByIdsQuery from '@hooks/queries/useFantasyProjectsByIdsQuery';
import TournamentLeaderboardComponent from '@components/TournamentLeaderboard';
import Loader from '@components/Loader';
import FantasyCardsGrid from '@components/FantasyCardsGrid';
import TournamentParticipationInfo from '@components/TournamentParticipationInfo';
import styles from './TournamentDetails.module.scss';

export interface TournamentDetailsProps {
  participationUser: User;
  tournamentParticipationRank: number | null;
  tournamentParticipation: TournamentParticipation | null;
  tournamentLeaderboard: TournamentLeaderboard | undefined;
}

const TournamentDetails = ({
  participationUser,
  tournamentParticipationRank,
  tournamentLeaderboard,
  tournamentParticipation,
}: TournamentDetailsProps) => {
  const participationSelectedProjectIds = tournamentParticipation?.selectedProjectIds ?? [];

  const { data: participationSelectedProjects } = useFantasyProjectsByIdsQuery(participationSelectedProjectIds);

  return (
    <div className={styles.tournamentDetails}>
      <TournamentParticipationInfo
        participationUser={participationUser}
        tournamentParticipationRank={tournamentParticipationRank}
        tournamentParticipation={tournamentParticipation}
      />
      <div className={styles.sections}>
        {participationSelectedProjects ? (
          <FantasyCardsGrid
            projects={participationSelectedProjects || []}
            projectsFantasyPoints={tournamentParticipation?.projectsFantasyPoints}
          />
        ) : (
          <Loader size="small" centered />
        )}
        {tournamentLeaderboard ? (
          <TournamentLeaderboardComponent
            rankedParticipants={tournamentLeaderboard.rankedParticipants}
          />
        ) : (
          <Loader size="small" centered />
        )}
      </div>
    </div>
  );
};

export default TournamentDetails;

import { Tournament, TournamentLeaderboard, TournamentParticipation } from '@api/TournamentApi';
import { User } from '@api/UserApi';
import useFantasyTargetsByIdsQuery from '@hooks/queries/useFantasyTargetsByIdsQuery';
import TournamentLeaderboardComponent from '@components/TournamentLeaderboard';
import Loader from '@components/Loader';
import FantasyCardsGrid from '@components/FantasyCardsGrid';
import TournamentParticipationInfo from '@components/TournamentParticipationInfo';
import styles from './TournamentDetails.module.scss';

export interface TournamentDetailsProps {
  participationUser: User;
  tournament: Tournament;
  tournamentParticipationRank: number | null;
  tournamentParticipation: TournamentParticipation | null;
  tournamentLeaderboard: TournamentLeaderboard | undefined;
}

const TournamentDetails = ({
  participationUser,
  tournament,
  tournamentParticipationRank,
  tournamentLeaderboard,
  tournamentParticipation,
}: TournamentDetailsProps) => {
  const selectedFantasyTargetIds = tournamentParticipation?.selectedFantasyTargetIds ?? [];

  const { data: selectedFantasyTargets } = useFantasyTargetsByIdsQuery(selectedFantasyTargetIds);

  return (
    <div className={styles.tournamentDetails}>
      <TournamentParticipationInfo
        participationUser={participationUser}
        tournamentParticipationRank={tournamentParticipationRank}
        tournamentParticipation={tournamentParticipation}
      />
      <div className={styles.sections}>
        {selectedFantasyTargets ? (
          <FantasyCardsGrid
            fantasyTargets={selectedFantasyTargets || []}
            targetsFantasyPoints={tournament.availableFantasyTargetsPoints}
          />
        ) : (
          <Loader size="small" centered />
        )}
        {tournamentLeaderboard ? (
          <TournamentLeaderboardComponent rankedParticipants={tournamentLeaderboard.rankedParticipants} />
        ) : (
          <Loader size="small" centered />
        )}
      </div>
    </div>
  );
};

export default TournamentDetails;

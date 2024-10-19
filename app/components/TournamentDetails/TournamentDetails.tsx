import { Tournament, TournamentLeaderboard, TournamentParticipant, TournamentParticipation } from '@api/TournamentApi';
import { User } from '@api/UserApi';
import FantasyTargetsSection from '@components/TournamentDetails/FantasyTargetsSection';
import TournamentParticipationInfo from '@components/TournamentParticipationInfo';
import LeaderboardSection from '@components/TournamentDetails/LeaderboardSection';
import styles from './TournamentDetails.module.scss';

export interface TournamentDetailsProps {
  participationUser: User;
  tournament: Tournament;
  tournamentParticipationRank: number | null;
  tournamentParticipation: TournamentParticipation | null;
  tournamentLeaderboard: TournamentLeaderboard | undefined;
  onViewParticipantCards: (participant: TournamentParticipant) => void;
}

const TournamentDetails = ({
  participationUser,
  tournament,
  tournamentParticipationRank,
  tournamentLeaderboard,
  tournamentParticipation,
  onViewParticipantCards,
}: TournamentDetailsProps) => {
  return (
    <div className={styles.tournamentDetails}>
      <TournamentParticipationInfo
        participationUser={participationUser}
        tournamentParticipationRank={tournamentParticipationRank}
        tournamentParticipation={tournamentParticipation}
      />
      <div className={styles.sections}>
        <FantasyTargetsSection
          tournament={tournament}
          fantasyTargetIds={tournamentParticipation?.selectedFantasyTargetIds ?? null}
        />
        <LeaderboardSection
          tournamentLeaderboard={tournamentLeaderboard}
          onViewParticipantCards={onViewParticipantCards}
        />
      </div>
    </div>
  );
};

export default TournamentDetails;

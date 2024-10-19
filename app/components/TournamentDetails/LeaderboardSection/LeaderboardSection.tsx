import { TournamentLeaderboard } from "@api/TournamentApi";
import SectionContainer from "@components/TournamentDetails/SectionContainer";
import TournamentLeaderboardComponent from "@components/TournamentLeaderboard/TournamentLeaderboard";
import Loader from "@components/Loader";
import styles from "@components/TournamentLeaderboard/TournamentLeaderboard.module.scss";
import Typography from "@components/Typography";

export interface LeaderboardSectionProps {
  tournamentLeaderboard: TournamentLeaderboard | undefined;
}

const LeaderboardSection = ({ tournamentLeaderboard }: LeaderboardSectionProps) => {
  const renderSectionContent = () => {
    if (!tournamentLeaderboard) {
      return (
        <Loader size="small" centered />
      );
    }

    if (!tournamentLeaderboard.rankedParticipants.length) {
      return (
        <Typography centered color="gray" variant="h4">
          No participants yet!
        </Typography>
      );
    }

    return (
      <TournamentLeaderboardComponent rankedParticipants={tournamentLeaderboard.rankedParticipants} />
    );
  }

  return (
    <SectionContainer title="Leaderboard">
      {renderSectionContent()}
    </SectionContainer>
  );
};

export default LeaderboardSection;

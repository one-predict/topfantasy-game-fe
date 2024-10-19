import { useMemo } from 'react';
import { TournamentParticipant } from '@api/TournamentApi';
import TournamentParticipantsTable from './TournamentParticipantsTable';
import TournamentWinners from './TournamentWinners';
import styles from './TournamentLeaderboard.module.scss';

export interface TournamentLeaderboardProps {
  rankedParticipants: Array<TournamentParticipant>;
  onViewParticipantCards: (participant: TournamentParticipant) => void;
}

const WINNERS_COUNT = 3;

const TournamentLeaderboard = ({ rankedParticipants, onViewParticipantCards }: TournamentLeaderboardProps) => {
  const [winners, restParticipants] = useMemo(() => {
    const winners = rankedParticipants.slice(0, WINNERS_COUNT);
    const restParticipants = rankedParticipants.slice(WINNERS_COUNT);

    return [winners, restParticipants];
  }, [rankedParticipants]);

  return (
    <div className={styles.tournamentLeaderboard}>
      <TournamentWinners
        className={styles.tournamentWinners}
        winners={winners}
        onWinnerClick={onViewParticipantCards}
      />
      <TournamentParticipantsTable
        startsFrom={WINNERS_COUNT}
        className={styles.participantsTable}
        rankedParticipants={restParticipants}
        onViewParticipantCards={onViewParticipantCards}
      />
    </div>
  );
};

export default TournamentLeaderboard;

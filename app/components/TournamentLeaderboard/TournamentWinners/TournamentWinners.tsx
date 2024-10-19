import clsx from 'clsx';
import { TournamentParticipant } from '@api/TournamentApi';
import TournamentWinner from './TournamentWinner';
import styles from './TournamentWinners.module.scss';

export interface TournamentParticipantsTableProps {
  className?: string;
  winners: TournamentParticipant[];
  onWinnerClick?: (winner: TournamentParticipant) => void;
}

const TournamentWinners = ({ className, winners, onWinnerClick }: TournamentParticipantsTableProps) => {
  return (
    <div className={styles.winnersContainer}>
      {winners.map((winner, index) => {
        return (
          <TournamentWinner
            className={clsx(styles.winner, className)}
            key={winner.id}
            participant={winner}
            placeNumber={index + 1}
            onClick={() => onWinnerClick?.(winner)}
          />
        );
      })}
    </div>
  );
};

export default TournamentWinners;

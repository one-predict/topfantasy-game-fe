import clsx from 'clsx';
import { TournamentParticipant } from '@api/TournamentApi';
import UserAvatar from '@components/UserAvatar';
import Typography from '@components/Typography';
import ColoredPoints from '@components/ColoredPoints';
import styles from './TournamentWinner.module.scss';
import FantasyPointsDisplay from "@components/FantasyPointsDisplay";

export interface TournamentWinnerProps {
  className?: string;
  participant: TournamentParticipant;
  placeNumber: number;
}

const TournamentWinner = ({ participant, placeNumber, className }: TournamentWinnerProps) => {
  return (
    <div className={clsx(styles.winner, className)}>
      <UserAvatar
        className={styles.winnerAvatar}
        imageUrl={participant.imageUrl}
        username={participant.username}
      />
      <Typography color="primary" variant="body1">
        {participant.username}
      </Typography>
      <div className={styles.reward}>
        <FantasyPointsDisplay points={participant.fantasyPoints} />
      </div>
      {}
      <div className={styles.zeroCircle}>
        <Typography color="secondary" variant="h1">
          {placeNumber}
        </Typography>
      </div>
    </div>
  );
};

export default TournamentWinner;

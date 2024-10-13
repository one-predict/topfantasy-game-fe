import clsx from 'clsx';
import { TournamentParticipant } from '@api/TournamentApi';
import UserAvatar from '@components/UserAvatar';
import Typography from '@components/Typography';
import FantasyPointsDisplay from '@components/FantasyPointsDisplay';
import styles from './TournamentWinner.module.scss';

export interface TournamentWinnerProps {
  className?: string;
  participant: TournamentParticipant;
  placeNumber: number;
}

const TournamentWinner = ({ participant, placeNumber, className }: TournamentWinnerProps) => {
  return (
    <div className={clsx(styles.winner, className)}>
      <UserAvatar className={styles.winnerAvatar} imageUrl={participant.imageUrl} username={participant.username} />
      <Typography color="primary" variant="body1">
        {participant.username}
      </Typography>
      <div className={clsx(styles.reward, placeNumber === 1 && styles.firstPlaceReward)}>
        <FantasyPointsDisplay color="black" points={participant.fantasyPoints} dark />
      </div>
      <div className={clsx(styles.podium, placeNumber === 1 && styles.firstPlacePodium)}>
        <Typography color="secondary" variant="h1">
          {placeNumber}
        </Typography>
      </div>
    </div>
  );
};

export default TournamentWinner;

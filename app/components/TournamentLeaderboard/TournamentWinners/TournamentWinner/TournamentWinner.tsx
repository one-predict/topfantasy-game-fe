import clsx from 'clsx';
import { TournamentParticipant } from '@api/TournamentApi';
import UserAvatar from '@components/UserAvatar';
import Typography from '@components/Typography';
import CoinsDisplay from '@components/CoinsDisplay';
import styles from './TournamentWinner.module.scss';

export interface TournamentWinnerProps {
  className?: string;
  participant: TournamentParticipant;
  placeNumber: number;
  podiumClassName?: string;
  onClick?: () => void;
}

const FIRST_PLACE_NUMBER = 1;
const SECOND_PLACE_NUMBER = 2;
const THIRD_PLACE_NUMBER = 3;

const TournamentWinner = ({ onClick, participant, placeNumber, className }: TournamentWinnerProps) => {
  const podiumComposedClassName = clsx(styles.podium, {
    [styles.firstPlacePodium]: placeNumber === FIRST_PLACE_NUMBER,
    [styles.secondPlacePodium]: placeNumber === SECOND_PLACE_NUMBER,
    [styles.thirdPlacePodium]: placeNumber === THIRD_PLACE_NUMBER,
  });

  return (
    <div onClick={onClick} className={clsx(styles.winner, className)}>
      <UserAvatar className={styles.winnerAvatar} imageUrl={participant.imageUrl} username={participant.username} />
      <Typography color="primary" variant="body1">
        {participant.username}
      </Typography>
      <div className={clsx(styles.reward, placeNumber === 1 && styles.firstPlaceReward)}>
        <CoinsDisplay humanize dark coins={participant.fantasyPoints} />
      </div>
      <div className={podiumComposedClassName}>
        <Typography color="secondary" variant="h1">
          {placeNumber}
        </Typography>
      </div>
    </div>
  );
};

export default TournamentWinner;

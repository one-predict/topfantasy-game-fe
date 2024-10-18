import { User } from '@api/UserApi';
import { TournamentParticipation } from '@api/TournamentApi';
import Typography from '@components/Typography';
import UserAvatar from '@components/UserAvatar';
import CoinsDisplay from '@components/CoinsDisplay';
import styles from './TournamentParticipationInfo.module.scss';

export interface TournamentParticipationInfoProps {
  participationUser: User;
  tournamentParticipationRank: number | null;
  tournamentParticipation: TournamentParticipation | null;
}

const TournamentParticipationInfo = ({
  participationUser,
  tournamentParticipationRank,
  tournamentParticipation,
}: TournamentParticipationInfoProps) => {
  return (
    <div className={styles.participationInfoContainer}>
      <div className={styles.participationInfoInnerContainer}>
        <Typography>{tournamentParticipationRank || <>—</>}</Typography>
        <div className={styles.userInfo}>
          <UserAvatar imageUrl={participationUser.imageUrl} username={participationUser.username || ''} />
          <Typography>@{participationUser.username}</Typography>
        </div>
      </div>
      <CoinsDisplay
        humanize
        containerClassName={styles.coinsDisplay}
        variant="h4"
        coins={tournamentParticipation?.fantasyPoints}
      />
    </div>
  );
};

export default TournamentParticipationInfo;

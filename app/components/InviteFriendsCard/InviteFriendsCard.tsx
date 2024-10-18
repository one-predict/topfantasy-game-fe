import { toast } from 'react-toastify';
import { useUtils as useTelegramUtils } from '@telegram-apps/sdk-react';
import Typography from '@components/Typography';
import Button from '@components/Button';
import CoinsDisplay from '@components/CoinsDisplay';
import CopyIcon from '@assets/icons/copy.svg?react';
import { generateReferralLink, generateShareLink } from '@utils/telegram';
import styles from './InviteFriendsCard.module.scss';

export interface InviteFriendsCardProps {
  currentUserId?: string;
}

const USER_INVITE_INSTANT_REWARD = 1000;
const USER_INVITE_PASSIVE_REWARD = 10;

const InviteFriendsCard = ({ currentUserId }: InviteFriendsCardProps) => {
  const telegramUtils = useTelegramUtils(true);

  const handleCopyButtonClick = () => {
    if (!currentUserId) {
      return;
    }

    navigator.clipboard.writeText(generateReferralLink(currentUserId));

    toast('Link copied!');
  };

  const handleInviteButtonClick = () => {
    if (!currentUserId) {
      return;
    }

    telegramUtils.openTelegramLink(generateShareLink(currentUserId));
  };

  return (
    <div className={styles.inviteFriendsCard}>
      <Typography variant="h1">Invite Friends</Typography>
      <Typography className={styles.pointsGainDescription} variant="body1">
        Your friends and you will get <CoinsDisplay tag="span" coins={USER_INVITE_INSTANT_REWARD} />
      </Typography>
      <Typography variant="body1">
        Get{' '}
        <Typography variant="h6" tag="span">
          {USER_INVITE_PASSIVE_REWARD}%
        </Typography>{' '}
        from your friends coins income.
      </Typography>
      <div className={styles.inviteFriendsButtonsContainer}>
        <Button onClick={handleInviteButtonClick} disabled={!currentUserId}>
          Invite Friend
        </Button>
        <Button onClick={handleCopyButtonClick} className={styles.copyButton}>
          <CopyIcon />
        </Button>
      </div>
    </div>
  );
};

export default InviteFriendsCard;

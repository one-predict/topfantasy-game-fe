import { TableBodyCell, TableRow } from '@components/Table';
import { Referral } from '@api/ReferralApi';
import UserAvatar from '@components/UserAvatar';
import CoinsDisplay from '@components/CoinsDisplay';
import styles from './ReferralsTableRow.module.scss';

export interface TournamentParticipantRowProps {
  rowCellWidthConfig: number[];
  referral: Referral;
  index: number;
}

const ReferralsTableRow = ({ rowCellWidthConfig, referral, index }: TournamentParticipantRowProps) => {
  return (
    <TableRow cellWidthConfig={rowCellWidthConfig}>
      <TableBodyCell>{index + 1}</TableBodyCell>
      <TableBodyCell
        beforeOverflowedContent={
          <UserAvatar className={styles.userAvatar} imageUrl={referral.imageUrl} username={referral.username || ''} />
        }
        overflowed
      >
        {referral.username}
      </TableBodyCell>
      <TableBodyCell overflowed>
        <CoinsDisplay className={styles.coinsDisplay} humanize variant="h5" coins={referral.coinsBalance} />
      </TableBodyCell>
    </TableRow>
  );
};

export default ReferralsTableRow;

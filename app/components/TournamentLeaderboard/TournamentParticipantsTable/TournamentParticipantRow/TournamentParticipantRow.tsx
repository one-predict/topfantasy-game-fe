import { TournamentParticipant } from '@api/TournamentApi';
import { TableBodyCell, TableRow } from '@components/Table';
import UserAvatar from '@components/UserAvatar';
import CoinsDisplay from '@components/CoinsDisplay';
import CupIcon from '@assets/icons/cup2.svg?react';
import styles from './TournamentParticipantRow.module.scss';

export interface TournamentParticipantRowProps {
  rowCellWidthConfig: number[];
  participant: TournamentParticipant;
  index: number;
}

const MAX_INDEX_FOR_CUP_ICON = 10;

const TournamentParticipantRow = ({ rowCellWidthConfig, participant, index }: TournamentParticipantRowProps) => {
  return (
    <TableRow cellWidthConfig={rowCellWidthConfig}>
      <TableBodyCell
        overflowedContentClassName={styles.rankCellOverflowedContent}
        beforeOverflowedContent={<>{index <= MAX_INDEX_FOR_CUP_ICON && <CupIcon className={styles.cupIcon} />}</>}
        overflowed
      >
        {index + 1}
      </TableBodyCell>
      <TableBodyCell
        beforeOverflowedContent={
          <UserAvatar
            className={styles.participantAvatar}
            imageUrl={participant.imageUrl}
            username={participant.username}
          />
        }
        overflowed
      >
        {participant.username}
      </TableBodyCell>
      <TableBodyCell className={styles.pointsText}>
        <CoinsDisplay humanize coins={participant.fantasyPoints} />
      </TableBodyCell>
    </TableRow>
  );
};

export default TournamentParticipantRow;

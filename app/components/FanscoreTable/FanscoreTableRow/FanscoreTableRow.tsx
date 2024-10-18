import { FantasyTarget } from '@api/FantasyTargetApi';
import { TableBodyCell, TableRow } from '@components/Table';
import styles from './FanscoreTableRow.module.scss';
import { humanizeNumber } from '@utils/formatting';

export interface FanscoreTableRowProps {
  fantasyTarget: FantasyTarget;
  cellWidthConfig: number[];
  index: number;
}

const FanscoreTableRow = ({ fantasyTarget, cellWidthConfig, index }: FanscoreTableRowProps) => {
  return (
    <TableRow cellWidthConfig={cellWidthConfig}>
      <TableBodyCell overflowed>{index + 1}</TableBodyCell>
      <TableBodyCell
        overflowed
        beforeOverflowedContent={
          <img className={styles.fantasyTargetImage} src={fantasyTarget.imageUrl} alt={fantasyTarget.socialName} />
        }
      >
        {fantasyTarget.name}
      </TableBodyCell>
      <TableBodyCell overflowed>{humanizeNumber(fantasyTarget.fantasyPoints7Days)}</TableBodyCell>
      <TableBodyCell overflowed>{humanizeNumber(fantasyTarget.statistic7Days.tweets)}</TableBodyCell>
      <TableBodyCell overflowed>{humanizeNumber(fantasyTarget.statistic7Days.likes)}</TableBodyCell>
    </TableRow>
  );
};

export default FanscoreTableRow;

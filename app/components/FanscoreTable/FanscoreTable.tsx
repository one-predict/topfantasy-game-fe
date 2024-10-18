import Table from '@components/Table';
import { FantasyTarget } from '@api/FantasyTargetApi';
import FanscoreTableRow from '@components/FanscoreTable/FanscoreTableRow';

export interface FanscoreTableProps {
  fantasyTargets: FantasyTarget[];
}

const FANSCORE_TABLE_CELLS = [
  {
    title: '',
    width: 8,
  },
  {
    title: 'Name',
    width: 40,
  },
  {
    title: 'Fanscore',
    width: 20,
  },
  {
    title: 'Tweets',
    width: 20,
  },
  {
    title: 'Likes',
    width: 12,
  },
];

const FanscoreTable = ({ fantasyTargets }: FanscoreTableProps) => {
  const renderRow = (target: FantasyTarget, rowCellWidthConfig: number[], index: number) => {
    return (
      <FanscoreTableRow key={target.id} index={index} fantasyTarget={target} cellWidthConfig={rowCellWidthConfig} />
    );
  };

  return <Table<FantasyTarget> items={fantasyTargets} cells={FANSCORE_TABLE_CELLS} renderRow={renderRow} />;
};

export default FanscoreTable;

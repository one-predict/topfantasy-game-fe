import { Referral } from '@api/ReferralApi';
import Table from '@components/Table';
import ReferralsTableRow from './ReferralsTableRow';

export interface ReferralsTableProps {
  className?: string;
  referrals: Referral[];
}

const REFERRALS_TABLE_CELLS = [
  {
    title: 'Index',
    width: 8,
  },
  {
    title: 'User',
    width: 72,
  },
  {
    title: 'Points',
    width: 20,
  },
];

const ReferralsTable = ({ className, referrals }: ReferralsTableProps) => {
  const renderRow = (referral: Referral, rowCellWidthConfig: number[], index: number) => (
    <ReferralsTableRow index={index} key={referral.id} rowCellWidthConfig={rowCellWidthConfig} referral={referral} />
  );

  return (
    <Table<Referral>
      className={className}
      cells={REFERRALS_TABLE_CELLS}
      items={referrals}
      renderRow={renderRow}
      withoutTableHead
    />
  );
};

export default ReferralsTable;

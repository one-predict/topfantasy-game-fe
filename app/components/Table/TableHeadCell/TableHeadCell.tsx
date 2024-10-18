import clsx from 'clsx';
import styles from './TableHeadCell.module.scss';

interface TableHeadCellProps {
  className?: string;
  children: string;
}

const TableHeadCell = ({ children, className }: TableHeadCellProps) => {
  return <div className={clsx(styles.tableHeadCell, className)}>{children}</div>;
};

export default TableHeadCell;

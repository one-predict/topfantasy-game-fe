import { ReactNode } from 'react';
import clsx from 'clsx';
import Typography, { TypographyProps } from '@components/Typography';
import { TypographyColor } from '../Typography/Typography';
import styles from './LabeledContent.module.scss';

export interface LabeledContentProps {
  className?: string;
  title: string;
  children?: ReactNode;
  row?: boolean;
  labelVariant?: TypographyProps['variant'];
  color?: TypographyColor;
}

const LabeledContent = ({
  className,
  children,
  title,
  row,
  labelVariant = 'body2',
  color = 'black',
}: LabeledContentProps) => {
  return (
    <div className={clsx(styles.labeledContent, row && styles.rowLabeledContent, className)}>
      <Typography color={color} variant={labelVariant}>
        {title}
      </Typography>
      {children}
    </div>
  );
};

export default LabeledContent;

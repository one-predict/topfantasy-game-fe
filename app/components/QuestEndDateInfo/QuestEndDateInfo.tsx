import clsx from 'clsx';
import TimeRemaining from '@components/TimeRemaining';
import Typography, { TypographyVariant } from '@components/Typography';
import ClockIcon from '@assets/icons/clock.svg?react';
import { getUnixTimestampFromDate } from '@utils/date';
import styles from './QuestEndDateInfo.module.scss';

export type QuestEndDateInfoColor = 'dark' | 'light';

export interface QuestEndDateInfoProps {
  questEndDate: Date | string;
  variant?: TypographyVariant;
  color?: QuestEndDateInfoColor;
}

const QuestEndDateInfo = ({ questEndDate, variant, color }: QuestEndDateInfoProps) => {
  return (
    <TimeRemaining unixTimestamp={getUnixTimestampFromDate(new Date(questEndDate))}>
      {({ displayRemainingDays, displayRemainingHours, displayRemainingMinutes }) => {
        return (
          <Typography
            color={color === 'dark' ? 'black' : 'primary'}
            className={styles.questEndDateInfo}
            variant={variant}
          >
            <ClockIcon className={clsx(styles.clockIcon, color === 'dark' && styles.darkClockIcon)} />
            {displayRemainingDays}d {displayRemainingHours}h {displayRemainingMinutes}m
          </Typography>
        );
      }}
    </TimeRemaining>
  );
};

export default QuestEndDateInfo;

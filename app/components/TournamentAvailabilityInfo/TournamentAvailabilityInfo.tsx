import clsx from 'clsx';
import { Tournament } from '@api/TournamentApi';
import useTournamentStatus from '@hooks/useTournamentStatus';
import TimeRemaining from '@components/TimeRemaining';
import Typography from '@components/Typography';
import styles from './TournamentAvailabilityInfo.module.scss';

export interface TournamentAvailabilityInfoProps {
  className?: string;
  tournament: Tournament;
}

const TournamentAvailabilityInfo = ({ className, tournament }: TournamentAvailabilityInfoProps) => {
  const tournamentStatus = useTournamentStatus(tournament);

  if (!tournamentStatus) {
    return null;
  }

  const statusTitle = (status: string) => {
    return {
      upcoming: 'Open ⏱︎',
      live: 'live',
      finished: 'finished',
    }[status];
  };

  const statusBadgeClassName = clsx({
    [styles.upcomingStatusBadge]: tournamentStatus === 'upcoming',
    [styles.liveStatusBadge]: tournamentStatus === 'live',
    [styles.finishedStatusBadge]: tournamentStatus === 'finished',
  });

  return (
    <div className={clsx(styles.tournamentAvailabilityInfo, className)}>

      {tournamentStatus !== 'finished' && (
        <TimeRemaining
          unixTimestamp={tournamentStatus === 'upcoming' ? tournament.startTimestamp : tournament.endTimestamp}
        >
          {({ remainingDays, remainingHours, remainingMinutes }) => {
            return (
              <Typography color='black' variant="h5" className={styles.remainingTime}>
                {tournamentStatus === 'upcoming'
                  ? `⏱︎ ${remainingDays}d ${remainingHours}h ${remainingMinutes}m`
                  : `⏱︎ ${remainingDays}d ${remainingHours}h ${remainingMinutes}m`}
              </Typography>
            );
          }}
        </TimeRemaining>
      )}
            <div className={statusBadgeClassName}>{statusTitle(tournamentStatus)}</div>
    </div>
  );
};

export default TournamentAvailabilityInfo;

import clsx from 'clsx';
import { Tournament } from '@api/TournamentApi';
import TournamentListCard from './TournamentListCard';
import Typography from '@components/Typography';
import styles from './TournamentsList.module.scss';

export interface TournamentsListProps {
  className?: string;
  tournaments: Tournament[];
  onPlayTournamentClick: (tournament: Tournament) => void;
}

/*
    {
      id: '',
      title: 'By Telegram',
      description: 'test description',
      entryPrice: 1,
      staticPrizePool: 1,
      participantsCount: 1,
      imageUrl: '/images/telegram.png',
      startTimestamp: 1000000,
      endTimestamp: 1000000,
      roundDurationInSeconds: 1,
      pool: ['not', 'blum', 'doge'],
    },
*/

const TournamentsList = ({ className, tournaments, onPlayTournamentClick }: TournamentsListProps) => {
  if (!tournaments.length) {
    return (
      <Typography variant="subtitle1" className={styles.noTournamentsMessage}>
        No tournaments found!
      </Typography>
    );
  }

  return (
    <div className={clsx(styles.tournamentsList, className)}>
      {tournaments.map((tournament) => (
        <TournamentListCard key={tournament.id} tournament={tournament} onPlayTournamentClick={onPlayTournamentClick} />
      ))}
    </div>
  );
};

export default TournamentsList;

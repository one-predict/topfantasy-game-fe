import { useNavigate } from '@remix-run/react';
import { Tournament } from '@api/TournamentApi';
import AppSection from '@enums/AppSection';
import useLatestTournamentsQuery from '@hooks/queries/useLatestTournamentsQuery';
import Loader from '@components/Loader';
import TournamentsList from '@components/TournamentsList';
import PageBody from '@components/PageBody';
import styles from './tournaments.module.scss';

export const handle = {
  appSection: AppSection.Tournaments,
};

const TournamentsPage = () => {
  const { data: tournaments } = useLatestTournamentsQuery();

  const navigate = useNavigate();

  const handlePlayTournamentClick = (tournament: Tournament) => {
    navigate(`/tournaments/${tournament.id}`);
  };

  return (
    <PageBody>
      <div className={styles.tournamentsPageTitle}>Tournament</div>
      {tournaments ? (
        <TournamentsList tournaments={tournaments} onPlayTournamentClick={handlePlayTournamentClick} />
      ) : (
        <Loader centered />
      )}
    </PageBody>
  );
};

export default TournamentsPage;

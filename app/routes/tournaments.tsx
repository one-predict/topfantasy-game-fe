import { useNavigate } from '@remix-run/react';
import { Tournament } from '@api/TournamentApi';
import AppSection from '@enums/AppSection';
import useLatestTournamentsQuery from '@hooks/queries/useLatestTournamentsQuery';
import Loader from '@components/Loader';
import TournamentsList from '@components/TournamentsList';
import Page from '@components/Page';

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
    <Page title="Tournaments">
      {tournaments ? (
        <TournamentsList tournaments={tournaments} onPlayTournamentClick={handlePlayTournamentClick} />
      ) : (
        <Loader centered />
      )}
    </Page>
  );
};

export default TournamentsPage;

import { useNavigate } from '@remix-run/react';
import { useState } from 'react';
import { Tournament, TournamentStatus } from '@api/TournamentApi';
import AppSection from '@enums/AppSection';
import useLatestTournamentsQuery from '@hooks/queries/useLatestTournamentsQuery';
import Loader from '@components/Loader';
import TournamentsList from '@components/TournamentsList';
import PageBody from '@components/PageBody';
import ButtonsToggle from '@components/ButtonsToggle';
import styles from './tournaments.module.scss';

export const handle = {
  appSection: AppSection.Tournaments,
  background: {
    image: '/images/tournament-page-background.png',
    position: 'center',
    overlay: true,
  },
};

const TournamentsPage = () => {
  const { data: tournaments } = useLatestTournamentsQuery();

  const navigate = useNavigate();

  const handleViewTournamentDetailsClick = (tournament: Tournament) => {
    navigate(`/tournaments/${tournament.id}`);
  };

  return (
    <PageBody>
      <div className={styles.tournamentsPageTitle}>Tournament</div>
      {tournaments ? (
        <TournamentsList tournaments={tournaments} onViewTournamentDetailsClick={handleViewTournamentDetailsClick} />
      ) : (
        <Loader centered />
      )}
    </PageBody>
  );
};

export default TournamentsPage;

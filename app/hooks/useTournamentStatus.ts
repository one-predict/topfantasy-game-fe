import { useMemo } from 'react';
import dayjs from 'dayjs';
import { Tournament } from '@api/TournamentApi';
import { getDateFromUnixTimestamp } from '@app/utils/date';

type TournamentStatus = 'upcoming' | 'live' | 'finished';

function useTournamentStatus(tournament: Tournament | null): TournamentStatus | null;
function useTournamentStatus(tournament: Tournament): TournamentStatus;
function useTournamentStatus(tournament: Tournament | null): TournamentStatus | null {
  return useMemo<TournamentStatus | null>(() => {
    if (!tournament) {
      return null;
    }

    const tournamentStartDate = getDateFromUnixTimestamp(tournament.startTimestamp);
    const tournamentEndDate = getDateFromUnixTimestamp(tournament.endTimestamp);

    if (dayjs().isAfter(tournamentEndDate)) {
      return 'finished';
    }

    if (dayjs().isBefore(tournamentStartDate)) {
      return 'upcoming';
    }

    return 'live';
  }, [tournament]);
}

export default useTournamentStatus;

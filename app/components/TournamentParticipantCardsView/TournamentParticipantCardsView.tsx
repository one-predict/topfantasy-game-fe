import { TournamentParticipant } from '@api/TournamentApi';
import useFantasyTargetsByIdsQuery from '@hooks/queries/useFantasyTargetsByIdsQuery';
import FantasyCardsGrid from '@components/FantasyCardsGrid';
import Typography from '@components/Typography';
import styles from './TournamentParticipantCardsView.module.scss';

export interface TournamentParticipantCardsViewProps {
  participant: TournamentParticipant;
  fantasyTargetsPoints: Record<string, number>;
}

const TournamentParticipantCardsView = ({ participant, fantasyTargetsPoints }: TournamentParticipantCardsViewProps) => {
  const { data: selectedFantasyTargets } = useFantasyTargetsByIdsQuery(participant.selectedFantasyTargetIds);

  return (
    <div className={styles.tournamentParticipantCardsView}>
      <Typography variant="h2">{participant.username} Cards:</Typography>
      <FantasyCardsGrid
        className={styles.fantasyCardsGrid}
        fantasyTargets={selectedFantasyTargets}
        targetsFantasyPoints={fantasyTargetsPoints}
        isCardSelected
      />
    </div>
  );
};

export default TournamentParticipantCardsView;

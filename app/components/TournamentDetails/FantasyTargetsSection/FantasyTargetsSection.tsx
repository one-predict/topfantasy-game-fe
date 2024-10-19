import { Tournament } from "@api/TournamentApi";
import useFantasyTargetsByIdsQuery from "@hooks/queries/useFantasyTargetsByIdsQuery";
import Loader from "@components/Loader";
import Typography from "@components/Typography";
import FantasyCardsGrid from "@components/FantasyCardsGrid";
import SectionContainer from "@components/TournamentDetails/SectionContainer";

export interface FantasyTargetsSectionProps {
  tournament: Tournament;
  fantasyTargetIds: string[] | null;
}

const FantasyTargetsSection = ({ tournament, fantasyTargetIds }: FantasyTargetsSectionProps) => {
  const { data: selectedFantasyTargets } = useFantasyTargetsByIdsQuery(fantasyTargetIds || []);

  const renderSectionContent = () => {
    if (!selectedFantasyTargets) {
      return <Loader size="small" centered />;
    }

    if (!selectedFantasyTargets.length) {
      return (
        <Typography centered color="gray" variant="h4">
          No Cards Selected!
        </Typography>
      );
    }

    return (
      <FantasyCardsGrid
        fantasyTargets={selectedFantasyTargets}
        targetsFantasyPoints={tournament.availableFantasyTargetsPoints}
      />
    );
  };

  return (
    <SectionContainer title="Your Cards">
      {renderSectionContent()}
    </SectionContainer>
  );
};

export default FantasyTargetsSection;

import {useCallback, useState} from "react";
import { Tournament } from "@api/TournamentApi";
import { FantasyProject } from "@api/FantasyProjectApi";
import useFantasyProjectsByIdsQuery from "@hooks/queries/useFantasyProjectsByIdsQuery";
import Typography from "@components/Typography";
import FantasyCardsPicker from "@components/FantasyCardsPicker";
import Loader from "@components/Loader";

export interface TournamentFantasyCardsPickerProps {
  tournament: Tournament;
  onConfirmProjects: (selectedProjectIds: string[]) => void;
  isConfirmInProgress?: boolean;
}

const MAX_SELECTED_CARDS = 6;
const MAX_STARTS = 20

const TournamentFantasyCardsPicker = ({
  tournament,
  onConfirmProjects,
  isConfirmInProgress,
}: TournamentFantasyCardsPickerProps) => {
  const { data: availableFantasyProjects } = useFantasyProjectsByIdsQuery(tournament.availableProjectIds);

  const [selectedProjectIds, setSelectedProjectIds] = useState<string[]>([]);

  const handleCardSelect = useCallback((project: FantasyProject) => {
    setSelectedProjectIds((previousSelectedProjectIds) => {
      return [...previousSelectedProjectIds, project.id];
    });
  }, [setSelectedProjectIds]);

  const handleCardDeselect = useCallback((project: FantasyProject) => {
    setSelectedProjectIds((previousSelectedProjectIds) => {
      return previousSelectedProjectIds.filter((projectId) => projectId !== project.id);
    });
  }, [setSelectedProjectIds]);

  const handleConfirmClick = useCallback(() => {
    onConfirmProjects(selectedProjectIds);
  }, [onConfirmProjects, selectedProjectIds]);

  return (
    <div>
      {availableFantasyProjects ? (
        <FantasyCardsPicker
          maxSelectedCards={MAX_SELECTED_CARDS}
          maxStars={MAX_STARTS}
          availableProjects={availableFantasyProjects}
          selectedProjectIds={selectedProjectIds}
          onCardSelect={handleCardSelect}
          onCardDeselect={handleCardDeselect}
          onConfirmClick={handleConfirmClick}
          isLoading={isConfirmInProgress}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default TournamentFantasyCardsPicker;

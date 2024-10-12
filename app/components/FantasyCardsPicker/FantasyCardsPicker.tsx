import { useCallback, useMemo } from "react";
import { FantasyProject } from "@api/FantasyProjectApi";
import useKeyBy from "@hooks/useKeyBy";
import useSumBy from "@hooks/useSumBy";
import FantasyCardsGrid from "@components/FantasyCardsGrid";
import Typography from "@components/Typography";
import Button from "@components/Button";
import styles from './FantasyCardsPicker.module.scss';

export interface FantasyCardsPickerProps {
  maxSelectedCards: number;
  maxStars: number;
  availableProjects: FantasyProject[];
  selectedProjectIds: string[];
  onCardSelect?: (project: FantasyProject) => void;
  onCardDeselect?: (project: FantasyProject) => void;
  onConfirmClick?: () => void;
  isLoading?: boolean;
}

const FantasyCardsPicker = ({
  maxStars,
  maxSelectedCards,
  availableProjects,
  selectedProjectIds,
  onCardSelect,
  onCardDeselect,
  onConfirmClick,
  isLoading,
}: FantasyCardsPickerProps) => {
  const availableProjectsPool = useKeyBy(availableProjects, 'id');

  const selectedProjects = useMemo(() => {
    return selectedProjectIds.map((id) => availableProjectsPool[id]);
  }, [selectedProjectIds, availableProjectsPool]);

  const selectedProjectsPool = useKeyBy(selectedProjects, 'id');
  const selectedProjectsStars = useSumBy(selectedProjects, 'stars');
  const selectedProjectsCount = selectedProjects.length;
  const availableStars = Math.max(0, maxStars - selectedProjectsStars);

  const checkCardSelected = useCallback((project: FantasyProject) => {
    return !!selectedProjectsPool[project.id];
  }, [selectedProjectsPool]);

  const checkCardUnavailable = useCallback((project: FantasyProject) => {
    return selectedProjectsCount >= maxSelectedCards || availableStars < project.stars;
  }, [availableStars, maxSelectedCards, selectedProjectsCount]);

  return (
    <div className={styles.fantasyCardsPickerContainer}>
      <Typography variant="subtitle2">
        Select max {maxSelectedCards} cards you want to add to your portfolio
      </Typography>
      <FantasyCardsGrid
        projects={availableProjects}
        onCardSelect={onCardSelect}
        onCardDeselect={onCardDeselect}
        isCardSelected={checkCardSelected}
        isCardUnavailable={checkCardUnavailable}
      />
      {(maxSelectedCards === selectedProjectIds.length || availableStars === 0) && (
        <Button loading={isLoading} onClick={onConfirmClick} className={styles.confirmButton}>
          Confirm
        </Button>
      )}
    </div>
  );
};

export default FantasyCardsPicker;

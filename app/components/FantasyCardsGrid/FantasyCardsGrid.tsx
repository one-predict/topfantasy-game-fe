import clsx from 'clsx';
import { FantasyProject } from '@api/FantasyProjectApi';
import FantasyCard from '@components/FantasyCard';
import styles from './FantasyCardsGrid.module.scss';

export interface FantasyCardsGridProps {
  className?: string;
  projects: FantasyProject[];
  onCardSelect?: (project: FantasyProject) => void;
  onCardDeselect?: (project: FantasyProject) => void;
  isCardSelected?: (project: FantasyProject) => boolean;
  isCardUnavailable?: (project: FantasyProject) => boolean;
  projectsFantasyPoints?: Record<string, number>;
}

const FantasyCardsGrid = ({
  className,
  projects,
  onCardDeselect,
  onCardSelect,
  isCardSelected,
  isCardUnavailable,
  projectsFantasyPoints,
}: FantasyCardsGridProps) => {
  return (
    <div className={clsx(styles.fantasyCardsGrid, className)}>
      {projects.map((project) => {
        const selected = !!isCardSelected?.(project);

        return (
          <FantasyCard
            key={project.id}
            project={project}
            onClick={selected ? onCardDeselect : onCardSelect}
            selected={selected}
            available={!isCardUnavailable?.(project)}
            fantasyPoints={projectsFantasyPoints?.[project.id]}
          />
        );
      })}
    </div>
  );
};

export default FantasyCardsGrid;

import { FantasyProject } from '@api/FantasyProjectApi';
import styles from './CardsShortPreview.module.scss';
import { useMemo } from 'react';
import Typography from '@components/Typography';

export interface CardsShortPreviewProps {
  projects: FantasyProject[];
  maxProjectsToDisplay?: number;
}

const DEFAULT_MAX_PROJECTS_TO_DISPLAY = 4;

const CardsShortPreview = ({
  projects,
  maxProjectsToDisplay = DEFAULT_MAX_PROJECTS_TO_DISPLAY,
}: CardsShortPreviewProps) => {
  const limitedProjects = useMemo(() => {
    return projects.slice(0, maxProjectsToDisplay!);
  }, [projects, maxProjectsToDisplay]);

  return (
    <div className={styles.cardsPreviewContainer}>
      {limitedProjects.map((project) => {
        return <img key={project.id} className={styles.cardPreviewImage} src={project.imageUrl} />;
      })}
      {limitedProjects.length !== projects.length && (
        <div className={styles.moreInfo}>
          <Typography variant="h3" color="black">
            +{projects.length - limitedProjects.length}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default CardsShortPreview;

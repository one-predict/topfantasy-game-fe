import clsx from 'clsx';
import { FantasyProject } from "@api/FantasyProjectApi";
import Typography from "@components/Typography";
import StarsDisplay from "@components/StarsDisplay";
import FantasyPointsDisplay from "@components/FantasyPointsDisplay";
import styles from './FantasyCard.module.scss';

export interface FantasyCardProps {
  project: FantasyProject;
  selected?: boolean;
  available?: boolean;
  fantasyPoints?: number;
  onClick?: (project: FantasyProject) => void;
}

const FantasyCard = ({ project, selected, available, fantasyPoints, onClick }: FantasyCardProps) => {
  const cardComposedClassName = clsx(styles.fantasyCard, {
    [styles.selectedFantasyCard]: !!selected,
    [styles.notAvailableFantasyCard]: !available && !selected,
  });

  const handleCardClick = () => {
    if (available || selected) {
      onClick?.(project);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={cardComposedClassName}
    >
      <img className={styles.fantasyCardImage} src={project.imageUrl} alt={project.name} />
      <StarsDisplay
        containerClassName={styles.starsDisplay}
        starIconClassName={styles.starIcon}
        starsCount={project.stars}
      />
      <Typography
        className={styles.socialName}
        color={selected ? 'black' : 'primary'}
        variant="subtitle2"
      >
        {project.socialName}
      </Typography>
      {fantasyPoints !== undefined && (
        <FantasyPointsDisplay variant="h3" points={fantasyPoints} />
      )}
    </div>
  );
};

export default FantasyCard;

import { Quest } from '@api/QuestApi';
import QuestListItem from './QuestListItem';
import Typography from '@components/Typography';
import styles from './QuestsList.module.scss';

export interface QuestsListProps {
  quests: Quest[];
  onViewQuest: (quest: Quest) => void;
  noQuestsMessage?: string;
}

const DEFAULT_NO_QUESTS_MESSAGE = 'No Quests Here...';

const QuestsList = ({ quests, onViewQuest, noQuestsMessage = DEFAULT_NO_QUESTS_MESSAGE }: QuestsListProps) => {
  return (
    <div className={styles.questsList}>
      {quests.length === 0 && (
        <Typography variant="h6" alignment="center">
          {noQuestsMessage}
        </Typography>
      )}
      {quests.map((quest) => (
        <QuestListItem key={quest.id} quest={quest} onView={onViewQuest} />
      ))}
    </div>
  );
};

export default QuestsList;

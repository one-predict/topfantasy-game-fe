import { memo } from 'react';
import { Quest } from '@api/QuestApi';
import Typography from '@components/Typography';
import QuestRewards from '@components/QuestRewards';
import QuestInfoTag from './QuestInfoTag';
import ChevronIcon from '@assets/icons/chevron.svg?react';
import styles from './QuestListItem.module.scss';

export interface QuestListItem {
  quest: Quest;
  onView: (quest: Quest) => void;
}

const QuestListItem = memo(({ quest, onView }: QuestListItem) => {
  return (
    <div className={styles.questListItem} onClick={() => onView(quest)}>
      <img className={styles.questImage} src={quest.imageUrl || ''} alt={`${quest.title} Image`} />
      <div className={styles.questListItemContent}>
        <Typography className={styles.questListItemTitle} variant="h5">
          {quest.title}
        </Typography>
        <QuestRewards rewards={quest.rewards} />
      </div>
      <ChevronIcon className={styles.chevronIcon} />
      <QuestInfoTag className={styles.questInfoTag} quest={quest} />
    </div>
  );
});

export default QuestListItem;

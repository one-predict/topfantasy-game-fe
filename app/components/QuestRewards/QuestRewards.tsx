import { QuestReward } from '@types/QuestReward';
import QuestRewardType from '@enums/QuestRewardType';
import QuestCoinsReward from './QuestCoinsReward';
import styles from './QuestRewards.module.scss';

export interface QuestRewards {
  rewards: QuestReward[];
}

const QuestRewards = ({ rewards }: QuestRewards) => {
  return (
    <div className={styles.rewardsContainer}>
      {rewards.map((reward) => (
        <div key={reward.type}>
          {reward.type === QuestRewardType.Coins && <QuestCoinsReward coins={reward.coins} />}
        </div>
      ))}
    </div>
  );
};

export default QuestRewards;

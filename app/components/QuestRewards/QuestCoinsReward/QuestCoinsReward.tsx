import CoinsDisplay from '@components/CoinsDisplay';

export interface CoinsRewardProps {
  coins: number;
}

const QuestCoinsReward = ({ coins }: CoinsRewardProps) => {
  return (
    <div>
      <CoinsDisplay variant="h6" coins={coins} />
    </div>
  );
};

export default QuestCoinsReward;

import { useState } from 'react';
import { Quest, QuestProgress } from '@api/QuestApi';
import AppSection from '@enums/AppSection';
import useQuestsQuery from '@hooks/queries/useQuestsQuery';
import useVerifyQuestMutation from '@hooks/mutations/useVerifyQuestMutation';
import useClaimQuestRewardsMutation from '@hooks/mutations/useClaimQuestRewardsMutation';
import useStartQuestMutation from '@hooks/mutations/useStartQuestMutation';
import Page from '@components/Page';
import Loader from '@components/Loader';
import QuestsList from '@components/QuestsList';
import QuestDetailsPopup from '@components/QuestDetailsPopup';

export const handle = {
  appSection: AppSection.Rewards,
};

const RewardsPage = () => {
  const [questToViewDetails, setQuestToViewDetails] = useState<Quest | null>(null);

  const { data: quests } = useQuestsQuery();

  const { mutateAsync: verifyQuest, status: questVerificationStatus } = useVerifyQuestMutation();
  const { mutateAsync: claimQuestRewards, status: claimQuestRewardsStatus } = useClaimQuestRewardsMutation();
  const { mutateAsync: startQuest } = useStartQuestMutation();

  const showQuestViewDetailsPopup = (quest: Quest) => setQuestToViewDetails(quest);
  const hideQuestViewDetailsPopup = () => setQuestToViewDetails(null);

  const updateQuestToViewDetailsProgress = (questId: string, updatedQuestProgress: QuestProgress) => {
    setQuestToViewDetails((previousQuest) => {
      if (!previousQuest) {
        return null;
      }

      return previousQuest.id === questId ? { ...previousQuest, progressState: updatedQuestProgress } : previousQuest;
    });
  };

  const handleVerifyQuest = async (quest: Quest) => {
    const updatedQuestProgress = await verifyQuest(quest.id);

    updateQuestToViewDetailsProgress(quest.id, updatedQuestProgress);
  };

  const handleClaimQuestRewards = async (quest: Quest) => {
    await claimQuestRewards(quest.id);

    setQuestToViewDetails(null);
  };

  const handleStartQuest = async (quest: Quest) => {
    if (quest.progressState) {
      return;
    }

    const updatedQuestProgress = await startQuest(quest.id);

    updateQuestToViewDetailsProgress(quest.id, updatedQuestProgress);
  };

  return (
    <Page title="Rewards">
      {quests ? (
        <QuestsList quests={quests} noQuestsMessage="No tasks available..." onViewQuest={showQuestViewDetailsPopup} />
      ) : (
        <Loader centered />
      )}
      <QuestDetailsPopup
        isOpen={!!questToViewDetails}
        quest={questToViewDetails}
        onVerify={handleVerifyQuest}
        onClaimReward={handleClaimQuestRewards}
        onStart={handleStartQuest}
        onClose={hideQuestViewDetailsPopup}
        isVerificationInProgress={questVerificationStatus === 'pending'}
        isRewardClaimingInProgress={claimQuestRewardsStatus === 'pending'}
      />
    </Page>
  );
};

export default RewardsPage;

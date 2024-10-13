import { TonConnectButton, useTonWallet } from '@tonconnect/ui-react';
import { useCallback, useState } from 'react';
import { Tournament } from '@api/TournamentApi';
import { FantasyProject } from '@api/FantasyProjectApi';
import TournamentPaymentCurrency from '@enums/TournamentPaymentCurrency';
import useFantasyProjectsByIdsQuery from '@hooks/queries/useFantasyProjectsByIdsQuery';
import FantasyCardsPicker from '@components/FantasyCardsPicker';
import Loader from '@components/Loader';
import styles from './TournamentFantasyCardsPicker.module.scss';

export interface TournamentFantasyCardsPickerProps {
  tournament: Tournament;
  onConfirmProjects: (selectedProjectIds: string[]) => void;
  isConfirmInProgress?: boolean;
}

const MAX_SELECTED_CARDS = 6;
const MAX_STARTS = 20;

const TournamentFantasyCardsPicker = ({
  tournament,
  onConfirmProjects,
  isConfirmInProgress,
}: TournamentFantasyCardsPickerProps) => {
  const wallet = useTonWallet();

  const { data: availableFantasyProjects } = useFantasyProjectsByIdsQuery(tournament.availableProjectIds);

  const [selectedProjectIds, setSelectedProjectIds] = useState<string[]>([]);

  const handleCardSelect = useCallback(
    (project: FantasyProject) => {
      setSelectedProjectIds((previousSelectedProjectIds) => {
        return [...previousSelectedProjectIds, project.id];
      });
    },
    [setSelectedProjectIds],
  );

  const handleCardDeselect = useCallback(
    (project: FantasyProject) => {
      setSelectedProjectIds((previousSelectedProjectIds) => {
        return previousSelectedProjectIds.filter((projectId) => projectId !== project.id);
      });
    },
    [setSelectedProjectIds],
  );

  const handleConfirmClick = useCallback(() => {
    onConfirmProjects(selectedProjectIds);
  }, [onConfirmProjects, selectedProjectIds]);

  const renderTonConnectButtonAction = () => {
    return <TonConnectButton className={styles.tonConnectButton} />;
  };

  const shouldConnectTonWallet =
    tournament.paymentCurrency === TournamentPaymentCurrency.Ton && !wallet?.account.address;

  return (
    <div>
      {availableFantasyProjects ? (
        <>
          <FantasyCardsPicker
            maxSelectedCards={MAX_SELECTED_CARDS}
            maxStars={MAX_STARTS}
            availableProjects={availableFantasyProjects}
            selectedProjectIds={selectedProjectIds}
            onCardSelect={handleCardSelect}
            onCardDeselect={handleCardDeselect}
            onConfirmClick={handleConfirmClick}
            isLoading={isConfirmInProgress}
            renderAction={shouldConnectTonWallet ? renderTonConnectButtonAction : undefined}
          />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default TournamentFantasyCardsPicker;

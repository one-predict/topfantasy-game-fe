import { TonConnectButton, useTonWallet } from '@tonconnect/ui-react';
import { ReactNode, useCallback, useState } from 'react';
import { Tournament } from '@api/TournamentApi';
import { FantasyTarget } from '@api/FantasyTargetApi';
import TournamentPaymentCurrency from '@enums/TournamentPaymentCurrency';
import useFantasyTargetsByIdsQuery from '@hooks/queries/useFantasyTargetsByIdsQuery';
import FantasyCardsPicker from '@components/FantasyCardsPicker';
import Loader from '@components/Loader';
import styles from './TournamentFantasyCardsPicker.module.scss';

export interface TournamentFantasyCardsPickerProps {
  tournament: Tournament;
  onConfirmFantasyTargets: (selectedFantasyTargetIds: string[]) => void;
  isConfirmInProgress?: boolean;
}

const MAX_CARDS_TO_SELECT = 5;
const MAX_STARTS = 20;

const TournamentFantasyCardsPicker = ({
  tournament,
  onConfirmFantasyTargets,
  isConfirmInProgress,
}: TournamentFantasyCardsPickerProps) => {
  const wallet = useTonWallet();

  const { data: availableFantasyTargets } = useFantasyTargetsByIdsQuery(tournament.availableFantasyTargetIds);

  const [selectedFantasyTargetIds, setSelectedFantasyTargetIds] = useState<string[]>([]);

  const handleCardSelect = useCallback(
    (target: FantasyTarget) => {
      setSelectedFantasyTargetIds((previousSelectedFantasyTargetIds) => {
        return [...previousSelectedFantasyTargetIds, target.id];
      });
    },
    [setSelectedFantasyTargetIds],
  );

  const handleCardDeselect = useCallback(
    (target: FantasyTarget) => {
      setSelectedFantasyTargetIds((previousSelectedFantasyTargetIds) => {
        return previousSelectedFantasyTargetIds.filter((targetId) => targetId !== target.id);
      });
    },
    [setSelectedFantasyTargetIds],
  );

  const handleConfirmClick = useCallback(() => {
    onConfirmFantasyTargets(selectedFantasyTargetIds);
  }, [onConfirmFantasyTargets, selectedFantasyTargetIds]);

  const renderTonConnectButtonAction = () => {
    return <TonConnectButton className={styles.tonConnectButton} />;
  };

  const shouldConnectTonWallet =
    tournament.paymentCurrency === TournamentPaymentCurrency.Ton && !wallet?.account.address;

  const wrapConfirmButton = (button: ReactNode) => {
    return shouldConnectTonWallet ? renderTonConnectButtonAction() : button;
  };

  return (
    <div className={styles.picker}>
      {availableFantasyTargets ? (
        <FantasyCardsPicker
          maxSelectedCards={MAX_CARDS_TO_SELECT}
          maxStars={MAX_STARTS}
          availableFantasyTargets={availableFantasyTargets}
          selectedFantasyTargetIds={selectedFantasyTargetIds}
          onCardSelect={handleCardSelect}
          onCardDeselect={handleCardDeselect}
          onConfirmClick={handleConfirmClick}
          isLoading={isConfirmInProgress}
          wrapConfirmButton={wrapConfirmButton}
        />
      ) : (
        <Loader size="large" centered />
      )}
    </div>
  );
};

export default TournamentFantasyCardsPicker;

import { useCallback, useMemo, useState } from 'react';
import _ from 'lodash';
import { useNavigate, useParams } from '@remix-run/react';
import { GameCard } from '@api/GameCardApi';
import { Portfolio, PortfolioSelectedToken } from '@api/PortfolioApi';
import AppSection from '@enums/AppSection';
import useOfferIdsFromSeries from '@hooks/useOfferIdsFromSeries';
import useTournamentByIdQuery from '@hooks/queries/useTournamentByIdQuery';
import useTournamentParticipationRankQuery from '@hooks/queries/useTournamentParticipationRankQuery';
import useTournamentParticipationQuery from '@hooks/queries/useTournamentParticipationQuery';
import useTournamentLeaderboardQuery from '@hooks/queries/useTournamentLeaderboardQuery';
import useTournamentStatus from '@hooks/useTournamentStatus';
import useSession from '@hooks/useSession';
import useMyInventoryQuery from '@hooks/queries/useMyInventoryQuery';
import useMyTournamentDeckQuery from '@hooks/queries/useMyTournamentDeckQuery';
import useGameCardsByIdsQuery from '@hooks/queries/useGameCardsByIdsQuery';
import useUpdateTournamentDeckMutation from '@hooks/mutations/useUpdateTournamentDeckMutation';
import useTokensOffersSeriesQuery from '@hooks/queries/useTokensOffersSeriesQuery';
import useMyPortfoliosQuery from '@hooks/queries/useMyPortfoliosQuery';
import useBackButton from '@hooks/useBackButton';
import useJoinTournamentMutation from '@hooks/mutations/useJoinTournamentMutation';
import useCreatePortfolioMutation from '@hooks/mutations/useCreatePortfolioMutation';
import useApplyCardsToPortfolioMutation from '@hooks/mutations/useApplyCardsToPortfolioMutation';
import PageBody from '@components/PageBody';
import Typography from '@components/Typography';
import Loader from '@components/Loader';
import ColoredPoints from '@components/ColoredPoints';
import LabeledContent from '@components/LabeledContent';
import TournamentDetails from '@components/TournamentDetails';
import DeckConfiguration from '@components/DeckConfiguration';
import PortfoliosGame from '@components/PortfoliosGame';
import FixedSlideView from '@components/FixedSlideView';
import GameCardDetailsPopup from '@components/GameCardDetailsPopup';
import PortfolioCardsStackConfiguration from '@components/PortfolioCardsStackConfiguration';
import styles from './tournament.module.scss';

export const handle = {
  background: {
    image: '/images/tournament-page-background.png',
    position: 'center',
    overlay: true,
  },
  appSection: AppSection.Tournaments,
};

const TournamentPage = () => {
  const navigate = useNavigate();

  const { id: tournamentId } = useParams<{ id: string }>();

  const [showDeckConfiguration, setShowDeckConfiguration] = useState(false);
  const [showPortfolios, setShowPortfolios] = useState(false);
  const [portfolioToApplyCards, setPortfolioToApplyCards] = useState<Portfolio | null>(null);
  const [cardToObserve, setCardToObserve] = useState<GameCard | null>(null);

  const currentUser = useSession();

  const { data: tournament } = useTournamentByIdQuery(tournamentId || '');
  const { data: tournamentParticipation } = useTournamentParticipationQuery(tournament?.id || '');
  const { data: tournamentParticipationRank } = useTournamentParticipationRankQuery(tournament?.id || '');
  const { data: tournamentLeaderboard } = useTournamentLeaderboardQuery(tournament?.id || '');
  const { data: myInventory } = useMyInventoryQuery();
  const { data: tournamentDeck } = useMyTournamentDeckQuery(tournamentId || '');
  const { data: myCards } = useGameCardsByIdsQuery(myInventory?.purchasedCardIds || []);

  const myCardsPool = useMemo(() => (myCards ? _.keyBy(myCards, 'id') : undefined), [myCards]);

  const tournamentStatus = useTournamentStatus(tournament ?? null);

  const { data: offersSeries } = useTokensOffersSeriesQuery(tournamentStatus === 'live' ? tournamentId : undefined);

  const tournamentOfferIds = useOfferIdsFromSeries(offersSeries);

  const { data: portfolios } = useMyPortfoliosQuery(tournamentOfferIds);

  const { mutateAsync: joinTournament, status: joinTournamentMutationStatus } = useJoinTournamentMutation();
  const { mutateAsync: updateCardsDeck, status: updateCardsDeckStatus } = useUpdateTournamentDeckMutation();
  const { mutateAsync: createPortfolio, status: createPortfolioStatus } = useCreatePortfolioMutation();
  const { mutateAsync: applyCardsToPortfolio, status: applyCardsToPortfolioStatus } =
    useApplyCardsToPortfolioMutation();

  const canJoinTournament =
    tournament?.isTonConnected ||
    (tournamentStatus === 'upcoming' && !!currentUser && currentUser.coinsBalance > tournament?.entryPrice);

  useBackButton(
    true,
    () => {
      if (showDeckConfiguration) {
        setShowDeckConfiguration(false);
        setCardToObserve(null);

        return;
      }

      if (portfolioToApplyCards) {
        setPortfolioToApplyCards(null);
        setCardToObserve(null);

        return;
      }

      if (showPortfolios) {
        setShowPortfolios(false);

        return;
      }

      navigate('/tournaments');
    },
    [showDeckConfiguration, showPortfolios, portfolioToApplyCards],
  );

  const handleJoinTournamentButtonClick = useCallback(
    async (walletAddress?: string) => {
      if (!tournament) {
        return;
      }

      await joinTournament({ tournamentId: tournament.id, walletAddress: walletAddress || '' });
    },
    [joinTournament, tournament],
  );

  const handleConfigureDeckButtonClick = useCallback(() => {
    setShowDeckConfiguration(true);
  }, [setShowDeckConfiguration]);

  const handlePortfoliosButtonClick = useCallback(() => {
    setShowPortfolios(true);
  }, [setShowPortfolios]);

  const handleObserveCard = useCallback(
    (card: GameCard) => {
      setCardToObserve(card);
    },
    [setCardToObserve],
  );

  const handleSaveDeckChanges = useCallback(
    async (cardsStack: Record<string, number>) => {
      if (!tournamentDeck) {
        return;
      }

      await updateCardsDeck({ id: tournamentDeck.id, cardsStack });
    },
    [tournamentDeck, updateCardsDeck],
  );

  const handleApplyCardsToPortfolio = useCallback(
    async (cardsStack: Record<string, number>) => {
      if (!portfolioToApplyCards) {
        return;
      }

      await applyCardsToPortfolio({ id: portfolioToApplyCards.id, cardsStack });

      setPortfolioToApplyCards(null);
    },
    [portfolioToApplyCards, applyCardsToPortfolio],
  );

  const handlePortfolioSubmit = useCallback(
    async (offerId: string, selectedTokens: PortfolioSelectedToken[]) => {
      await createPortfolio({ offerId, selectedTokens });
    },
    [createPortfolio],
  );

  const renderParticipationContent = () => {
    if (!tournament || tournamentParticipation === undefined || tournamentParticipationRank === undefined) {
      return null;
    }

    if (tournamentParticipation === null) {
      return <Typography>—</Typography>;
    }

    return (
      <>
        <Typography variant="h1">{tournamentParticipationRank}</Typography>
        <ColoredPoints points={tournamentParticipation.points} />
      </>
    );
  };

  return (
    <PageBody>
      <div className={styles.tournamentParticipationInfoContainer}>
        <LabeledContent title="Rank">{renderParticipationContent()}</LabeledContent>
      </div>
      {tournament && tournamentParticipation !== undefined ? (
        <TournamentDetails
          tournament={tournament}
          tournamentLeaderboard={tournamentLeaderboard}
          tournamentParticipation={tournamentParticipation}
          tournamentDeck={tournamentDeck}
          tournamentOffersSeries={offersSeries}
          portfolios={portfolios}
          myInventory={myInventory}
          joinTournamentMutationStatus={joinTournamentMutationStatus}
          currentUser={currentUser}
          canJoinTournament={canJoinTournament}
          isTournamentJoiningInProgress={joinTournamentMutationStatus === 'pending'}
          onJoinTournamentButtonClick={handleJoinTournamentButtonClick}
          onConfigureDeckButtonClick={handleConfigureDeckButtonClick}
          onPortfoliosButtonClick={handlePortfoliosButtonClick}
        />
      ) : (
        <Loader centered />
      )}
      <FixedSlideView visible={showPortfolios || showDeckConfiguration}>
        {showDeckConfiguration && (
          <DeckConfiguration
            className={styles.deckConfiguration}
            myDeck={tournamentDeck}
            myCardsPool={myCardsPool}
            availableSlots={myInventory?.availableCardSlots}
            onSaveChanges={handleSaveDeckChanges}
            onObserveCard={handleObserveCard}
            isSaveInProgress={updateCardsDeckStatus === 'pending'}
          />
        )}
        {showPortfolios && (
          <>
            <LabeledContent className={styles.portfoliosTournamentDescription} row title="Tournament:">
              <Typography variant="h6">{tournament?.title}</Typography>
            </LabeledContent>
            <PortfoliosGame
              className={styles.portfoliosGame}
              offersSeries={offersSeries ?? null}
              portfolios={portfolios ?? null}
              onPortfolioSubmit={handlePortfolioSubmit}
              isPortfolioSubmitInProgress={createPortfolioStatus === 'pending'}
              onEditPortfolioCards={(portfolio) => setPortfolioToApplyCards(portfolio)}
            />
          </>
        )}
      </FixedSlideView>
      <FixedSlideView visible={!!portfolioToApplyCards}>
        {portfolioToApplyCards && (
          <PortfolioCardsStackConfiguration
            portfolio={portfolioToApplyCards}
            deck={tournamentDeck}
            tournament={tournament}
            cardsPool={myCardsPool}
            availableSlots={myInventory?.availablePortfolioCardSlots}
            onObserveCard={handleObserveCard}
            onSaveChanges={handleApplyCardsToPortfolio}
            isSaveInProgress={applyCardsToPortfolioStatus === 'pending'}
          />
        )}
      </FixedSlideView>
      <GameCardDetailsPopup card={cardToObserve} onClose={() => setCardToObserve(null)} />
    </PageBody>
  );
};

export default TournamentPage;

import AppSection from '@enums/AppSection';
import PageBody from '@components/PageBody';
import FantasyCardsGrid from "@components/FantasyCardsGrid";
import FantasyCardsPicker from "@components/FantasyCardsPicker";
import {useState} from "react";
import {FantasyCard} from "@api/FantasyProjectApi";

export const handle = {
  appSection: AppSection.Home,
};

const HomePage = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleCardClick = (card: FantasyCard) => {
    setSelected((previous) => {
      return previous.includes(card.id)
        ? previous.filter((cardId) => cardId !== card.id)
        : [...previous, card.id];
    });
  };

  return (
    <PageBody>
      <FantasyCardsPicker
        maxSelectedCards={3}
        maxStars={20}
        selectedProjectIds={selected}
        onCardClick={handleCardClick}
        availableProjects={[{
          description: 'test',
          id: '1',
          stars: 5,
          name: 'test',
          socialName: '@abrakadabra',
          imageUrl: 'https://financefeeds.com/wp-content/uploads/2024/07/Hamster-Kombat.png',
        }, {
          description: 'test',
          id: '2',
          stars: 2,
          name: 'test',
          socialName: '@abrakadabra',
          imageUrl: 'https://financefeeds.com/wp-content/uploads/2024/07/Hamster-Kombat.png',
        }, {
          description: 'test',
          id: '3',
          stars: 4,
          name: 'test',
          socialName: '@abrakadabra',
          imageUrl: 'https://financefeeds.com/wp-content/uploads/2024/07/Hamster-Kombat.png',
        }, {
          description: 'test',
          id: '4',
          stars: 7,
          name: 'test',
          socialName: '@abrakadabra',
          imageUrl: 'https://financefeeds.com/wp-content/uploads/2024/07/Hamster-Kombat.png',
        }]}
      />
    </PageBody>
  );
};

export default HomePage;

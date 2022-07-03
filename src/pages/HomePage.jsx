import { useState } from 'react';
import { useEffect } from 'react';
import CardsList from '../components/CardList/CardsList';
import { useAuthCtx } from '../store/authContext';
import { baseUrl, myFetchAuth } from '../utils';

function HomePage() {
  const ctx = useAuthCtx();
  const token = ctx.token;
  const [cardArr, setCardArr] = useState([]);

  async function getCards() {
    const cardData = await myFetchAuth(`${baseUrl}/v1/content/skills`, token);
    console.log('cardData ===', cardData);
    if (Array.isArray(cardData)) {
      setCardArr(cardData);
      return;
    }
  }
  useEffect(() => {
    getCards();
  }, []);
  return (
    <div>
      <CardsList data={cardArr} />
    </div>
  );
}

export default HomePage;

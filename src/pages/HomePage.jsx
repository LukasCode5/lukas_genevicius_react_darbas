import { useEffect } from 'react';
import { useAuthCtx } from '../store/authContext';
import { baseUrl, myFetchAuth } from '../utils';

function HomePage() {
  const ctx = useAuthCtx();
  const token = localStorage.getItem('userToken');

  async function getCards() {
    const cardData = await myFetchAuth(`${baseUrl}/v1/content/skills`, token);
    console.log('cardData ===', cardData);
  }
  useEffect(() => {
    getCards();
  }, []);
  return <div></div>;
}

export default HomePage;

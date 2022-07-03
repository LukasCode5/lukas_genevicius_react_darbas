import Card from '../Card/Card';
import css from './CardList.module.css';

function CardsList({ data }) {
  return (
    <div className={css.cardContainer}>
      {data.map((cardObj) => (
        <Card title={cardObj.title} description={cardObj.description} />
      ))}
    </div>
  );
}

export default CardsList;

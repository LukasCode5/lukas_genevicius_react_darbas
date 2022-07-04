import Card from '../Card/Card';
import Container from '../UI/Container/Container';
import css from './CardList.module.css';

function CardsList({ data }) {
  return (
    <div className={css.cardList}>
      <Container>
        <div className={css.cardListGroup}>
          <h1>Įgudžių Sąrašas</h1>

          <div
            className={`${css.cardContainer} ${
              Array.isArray(data) && data.length > 0 ? css.grid : ''
            }`}
          >
            {Array.isArray(data) && data.length > 0 ? (
              data.map((cardObj) => (
                <Card key={cardObj.id} title={cardObj.title} description={cardObj.description} />
              ))
            ) : (
              <div className={css.cardNotification}>
                <h3>Nėra įrašų</h3>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default CardsList;

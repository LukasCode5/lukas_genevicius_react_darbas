import Card from '../Card/Card';
import Container from '../UI/Container/Container';
import css from './CardList.module.css';

function CardsList({ data }) {
  return (
    <div className={css.cardList}>
      <Container>
        <div className={css.cardListGroup}>
          <h1>Įgudžių Sąrašas</h1>

          <div className={`${css.cardContainer}`}>
            <div className={`${Array.isArray(data) && data.length > 0 ? css.grid : css.noCards}`}>
              {Array.isArray(data) && data.length > 0 ? (
                data.map((cardObj) => (
                  <Card key={cardObj.id} title={cardObj.title} description={cardObj.description} />
                ))
              ) : (
                <div className={css.cardNotification}>
                  <h3 className={css.noCards}>Nėra įrašų</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default CardsList;

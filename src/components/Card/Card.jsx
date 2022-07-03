import css from './Card.module.css';

function Card({ title, description }) {
  return (
    <div className={css.card}>
      <h3 className={css.title}>{title}</h3>
      <p className={css.description}>{description}</p>
    </div>
  );
}

export default Card;

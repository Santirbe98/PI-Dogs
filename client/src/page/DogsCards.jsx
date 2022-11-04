import { Link } from "react-router-dom";
import s from "./styles/DogsCards.module.css";

export const DogsCards = (props) => {
  const { name, temperament, image, id, temperaments, minWeight, maxWeight } =
    props;
  return (
    <div className={s.card}>
      <br />
      <img src={image} alt={name} className={s.resize} />
      <h4>{temperaments ? temperaments : temperament}</h4>
      <h3>Weight: </h3>
      <p>
        {minWeight} - {maxWeight} Kg
      </p>
      <h3>
        <Link to={`/dogs/${id}`}>{name}</Link>
      </h3>
    </div>
  );
};

import { Link } from "react-router-dom";
import s from "./styles/DogsCards.module.css";

export const DogsCards = (props) => {
  const { name, temperament, image, id, temperaments, minWeight, maxWeight } =
    props;
  return (
    <div className={s.card}>
      <img src={image} alt={name} className={s.resize} />
      <h4>
        <Link to={`/dogs/${id}`}>{name}</Link>
      </h4>
      <h5>{temperaments ? temperaments : temperament}</h5>
      <h5>Weight: </h5>
      <p>
        {minWeight} - {maxWeight} Kg
      </p>
    </div>
  );
};

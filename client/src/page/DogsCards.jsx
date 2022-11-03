import { Link } from "react-router-dom";
import s from "./styles/DogsCards.module.css";

export const DogsCards = (props) => {
  const { name, temperament, image, id, temperaments } = props;
  return (
    <div className={s.card}>
      <img src={image} alt={name} className={s.resize} />
      <br />
      <h4>{temperaments ? temperaments : temperament}</h4>
      <h3>
        <Link to={`/dogs/${id}`}>{name}</Link>
      </h3>
    </div>
  );
};

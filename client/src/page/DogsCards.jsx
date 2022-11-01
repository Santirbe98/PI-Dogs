import { Link } from "react-router-dom";
import s from "./styles/DogsCards.module.css";

export const DogsCards = (props) => {
  const { name, temperament, image, id } = props;
  return (
    <div>
      <Link to={`/dogs/${id}`}>{name}</Link>
      <h3>{temperament}</h3>
      <img src={image} alt={name} className={s.resize} />
    </div>
  );
};
